"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, Users, Car, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { adminStates } from "@/services/user/user.service";

interface IAdminStats {
  totalRides: number;
  totalIncome: number;
  totalUsers: number;
  totalDrivers: number;
  ridesByDay: { date: string; rides: number }[];
}

// Custom tooltip for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{`Date: ${label}`}</p>
        <p className="text-blue-600 font-medium">
          {`Rides: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const result = await adminStates();
      if (result.success) setStats(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Gradient colors for the bars
  const getGradientColor = (value: number, maxValue: number) => {
    const intensity = value / maxValue;
    return `rgba(59, 130, 246, ${0.3 + intensity * 0.7})`;
  };

  const maxRides = stats?.ridesByDay
    ? Math.max(...stats.ridesByDay.map((day) => day.rides))
    : 0;

  if (loading)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading dashboard data...</p>
        </div>
      </div>
    );

  if (!stats)
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">No data found</p>
          <button
            onClick={fetchStats}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of your platform performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">
              Total Rides
            </CardTitle>
            <Car className="h-5 w-5 text-blue-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalRides}</div>
            <p className="text-xs text-blue-200 mt-1">
              All time completed rides
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">
              Total Income
            </CardTitle>
            <DollarSign className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${stats.totalIncome.toFixed(2)}
            </div>
            <p className="text-xs text-green-200 mt-1">Platform revenue</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">
              Total Users
            </CardTitle>
            <Users className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-purple-200 mt-1">Registered users</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">
              Total Drivers
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalDrivers}</div>
            <p className="text-xs text-orange-200 mt-1">Active drivers</p>
          </CardContent>
        </Card>
      </div>

      {/* Rides per Day Chart */}
      <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Rides Per Day
            <span className="text-sm font-normal text-gray-500 ml-2">
              Last {stats.ridesByDay?.length || 0} days
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {stats.ridesByDay && stats.ridesByDay.length > 0 ? (
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.ridesByDay}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rides" radius={[4, 4, 0, 0]} barSize={40}>
                    {stats.ridesByDay.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getGradientColor(entry.rides, maxRides)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-16">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">
                No ride data available
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Ride data will appear here once rides are completed
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
          <CardHeader>
            <CardTitle className="text-lg">Platform Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600">Average Rides per Day</span>
                <span className="font-bold text-blue-600">
                  {stats.ridesByDay && stats.ridesByDay.length > 0
                    ? Math.round(
                        stats.ridesByDay.reduce(
                          (sum, day) => sum + day.rides,
                          0
                        ) / stats.ridesByDay.length
                      )
                    : 0}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                <span className="text-gray-600">User to Driver Ratio</span>
                <span className="font-bold text-green-600">
                  {stats.totalDrivers > 0
                    ? (stats.totalUsers / stats.totalDrivers).toFixed(1)
                    : 0}
                  :1
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-200">
                <div className="font-medium text-blue-900">View All Users</div>
                <div className="text-sm text-blue-600">
                  Manage user accounts and permissions
                </div>
              </button>
              <button className="w-full text-left p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-200">
                <div className="font-medium text-blue-900">
                  Driver Management
                </div>
                <div className="text-sm text-blue-600">
                  Review and approve driver applications
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
