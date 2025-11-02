# Docker Setup - E-Commerce Backend

## Cấu hình

File `docker-compose.yml` này sẽ khởi động:
- **PostgreSQL Database** - Port 5432
- **pgAdmin** - Port 5050 (Web UI để quản lý database)

Backend sẽ chạy trên **localhost** và kết nối đến database container.

## Thông tin đăng nhập

### PostgreSQL Database
- **Host:** localhost
- **Port:** 5432
- **Database:** mern_ecommerce_store
- **Username:** postgres
- **Password:** 12345678

### pgAdmin (Web Interface)
- **URL:** http://localhost:5050
- **Email:** admin@admin.com
- **Password:** admin123

## Hướng dẫn sử dụng

### 1. Khởi động Database và pgAdmin

```bash
# Khởi động containers
docker-compose up -d

# Kiểm tra trạng thái containers
docker-compose ps

# Xem logs
docker-compose logs -f
```

### 2. Cấu hình pgAdmin (Lần đầu tiên)

1. Truy cập http://localhost:5050
2. Đăng nhập với:
   - Email: `admin@admin.com`
   - Password: `admin123`
3. Thêm server mới:
   - Right click "Servers" → "Register" → "Server"
   - **General Tab:**
     - Name: `Ecommerce DB`
   - **Connection Tab:**
     - Host name/address: `postgres` (tên service trong docker-compose)
     - Port: `5432`
     - Username: `postgres`
     - Password: `12345678`
   - Click "Save"

### 3. Chạy Backend trên Localhost

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Hoặc chạy production
npm start
```

### 4. Chạy Migrations (nếu có)

```bash
# Chạy migrations
npx sequelize-cli db:migrate

# Rollback migration
npx sequelize-cli db:migrate:undo

# Chạy seeders
npx sequelize-cli db:seed:all
```

### 5. Dừng và Xóa Containers

```bash
# Dừng containers
docker-compose stop

# Dừng và xóa containers (giữ lại data)
docker-compose down

# Dừng, xóa containers và xóa volumes (XÓA HẾT DATA)
docker-compose down -v
```

## Các lệnh Docker hữu ích

```bash
# Xem logs của một service cụ thể
docker-compose logs -f postgres
docker-compose logs -f pgadmin

# Restart một service
docker-compose restart postgres

# Truy cập vào container PostgreSQL
docker exec -it ecommerce_postgres psql -U postgres -d mern_ecommerce_store

# Backup database
docker exec ecommerce_postgres pg_dump -U postgres mern_ecommerce_store > backup.sql

# Restore database
docker exec -i ecommerce_postgres psql -U postgres mern_ecommerce_store < backup.sql
```

## Lưu ý quan trọng

1. **Data Persistence:** Data được lưu trong Docker volumes (`postgres_data` và `pgadmin_data`), nên sẽ không bị mất khi restart container
2. **Kết nối từ Backend:** Sử dụng `localhost:5432` vì backend chạy ngoài container
3. **Kết nối từ pgAdmin:** Sử dụng `postgres` (tên service) vì pgAdmin chạy trong cùng network
4. **Security:** Đổi password mặc định trong production environment

## Troubleshooting

### Port đã được sử dụng
Nếu port 5432 hoặc 5050 đã được sử dụng, bạn có thể thay đổi trong `docker-compose.yml`:
```yaml
ports:
  - "5433:5432"  # Thay đổi port bên trái
```

### Container không khởi động
```bash
# Xem logs chi tiết
docker-compose logs

# Restart từ đầu
docker-compose down -v
docker-compose up -d
```

### Không kết nối được database từ backend
1. Kiểm tra container đang chạy: `docker-compose ps`
2. Kiểm tra logs: `docker-compose logs postgres`
3. Test kết nối: `psql -h localhost -U postgres -d mern_ecommerce_store`
