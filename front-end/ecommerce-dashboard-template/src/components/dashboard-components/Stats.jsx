import React, { useEffect, useState } from "react";
import { formatNumber } from "../../lib/helper";
import { useSelector, useDispatch } from "react-redux";
import { getDashboardStats } from "../../store/slices/adminSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const [revenueChange, setRevenueChange] = useState("");
  const {
    totalUsersCount,
    yesterdayRevenue,
    todayRevenue,
    totalRevenueAllTime,
  } = useSelector((state) => state.admin);

  const stats = [
    {
      title: "Today Revenue",
      value: `$${formatNumber(todayRevenue)}`,
      change: revenueChange,
    },
    {
      title: "Total Users",
      value: totalUsersCount || 0,
      change: null,
    },
    {
      title: "All Time Revenue",
      value: formatNumber(totalRevenueAllTime),
      change: null,
    },
  ];

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  useEffect(() => {
    if(yesterdayRevenue) {
      let change =
        yesterdayRevenue === 0
          ? 100
          : ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;
      const revenueChangeText = `${change >= 0 ? "+" : "-"}${change.toFixed(
        2
      )}% from yesterday`;
      setRevenueChange(revenueChangeText);
    }
  }, [todayRevenue, yesterdayRevenue]);
//[revenueChange]
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          return (
            <div
              key={index}
              className={`bg-white p-4 rounded-xl shadow-md ${
                index !== 0 && "flex gap-2 flex-col"
              }`}
            >
              <div className="text-sm text-gray-500">{stat.title}</div>
              <div
                className={`text-xl font-semibold ${
                  index !== 0 && "text-[30px] overflow-y-hidden"
                }`}
              >
                {stat.value}
              </div>
              {stat.change && (
                <div
                  className={`text-sm ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change} than last period
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Stats;
