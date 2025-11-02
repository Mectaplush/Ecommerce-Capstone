import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Import config.json - Đọc file JSON bằng fs
const configPath = path.join(__dirname, '../config/config.json');
const configFile = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Đọc tất cả model files
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

// Import tất cả models
for (const file of modelFiles) {
  const modelPath = path.join(__dirname, file);
  const { default: model } = await import(modelPath);
  
  if (typeof model === 'function') {
    const initializedModel = model(sequelize, DataTypes);
    db[initializedModel.name] = initializedModel;
  } else {
    console.warn(`⚠️  Model file ${file} không export function hợp lệ`);
  }
}

// Setup associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default sequelize;
export { db, Sequelize };