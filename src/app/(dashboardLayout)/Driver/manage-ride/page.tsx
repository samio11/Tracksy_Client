"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Car, MapPin, User, Calendar, Navigation } from "lucide-react";
import {
  driverAcceptRide,
  driverStartRide,
  driverCompleteRide,
} from "@/services/ride/ride.service";
import { toast } from "sonner";

interface IRide {
  _id: string;
  from: string;
  to: string;
  fare: number;
  rideStatus: "requested" | "accepted" | "started" | "completed" | "cancelled";
  rider?: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function ManageRidePage() {
  const [rides, setRides] = useState<IRide[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch rides
  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND}/ride/get-all`
        );
        const result = await res.json();

        const filtered = result?.data?.data?.filter(
          (r: IRide) =>
            r.rideStatus === "requested" ||
            r.rideStatus === "accepted" ||
            r.rideStatus === "started"
        );

        setRides(filtered);
      } catch (err) {
        toast.error("Failed to load rides");
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // Handle ride action
  const handleAction = async (ride: IRide) => {
    try {
      setActionLoading(ride._id);
      let result;

      if (ride.rideStatus === "requested") {
        result = await driverAcceptRide({ rideId: ride._id });
      } else if (ride.rideStatus === "accepted") {
        result = await driverStartRide({ rideId: ride._id });
      } else if (ride.rideStatus === "started") {
        result = await driverCompleteRide({ rideId: ride._id });
      }

      if (result?.success) {
        toast.success(
          ride.rideStatus === "requested"
            ? "Ride accepted successfully!"
            : ride.rideStatus === "accepted"
            ? "Ride started successfully!"
            : "Ride completed successfully!"
        );

        setRides((prev) =>
          prev.map((r) =>
            r._id === ride._id
              ? { ...r, rideStatus: result.data?.rideStatus }
              : r
          )
        );
      } else {
        toast.error(result?.message || "Something went wrong");
      }
    } catch (err: any) {
      toast.error(err.message || "Error performing ride action");
    } finally {
      setActionLoading(null);
    }
  };

  const getNextActionLabel = (status: string) => {
    switch (status) {
      case "requested":
        return "Accept Ride";
      case "accepted":
        return "Start Ride";
      case "started":
        return "Complete Ride";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "requested":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "accepted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "started":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getActionButtonVariant = (status: string) => {
    switch (status) {
      case "requested":
        return "default";
      case "accepted":
        return "secondary";
      case "started":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Ride Management
          </h1>
          <p className="text-slate-600">
            Manage and track all your active rides in real-time
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Active Rides
                  </p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">
                    {rides.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Car className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Pending Acceptance
                  </p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">
                    {rides.filter((r) => r.rideStatus === "requested").length}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 rounded-xl">
                  <User className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {rides.filter((r) => r.rideStatus === "started").length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-xl">
                  <Navigation className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Rides Table */}
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <CardTitle className="flex items-center gap-3 text-xl">
              <Car className="h-6 w-6" />
              Active Rides
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="animate-spin h-12 w-12 text-slate-400 mb-4" />
                <p className="text-slate-600">Loading rides...</p>
              </div>
            ) : rides.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Car className="h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  No active rides
                </h3>
                <p className="text-slate-500 max-w-sm">
                  When new ride requests come in, they will appear here for you
                  to manage.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50/80">
                    <TableRow className="border-b border-slate-200">
                      <TableHead className="text-slate-700 font-semibold py-4">
                        Rider Details
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Route
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Fare
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Requested
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold">
                        Status
                      </TableHead>
                      <TableHead className="text-slate-700 font-semibold text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rides.map((ride) => (
                      <TableRow
                        key={ride._id}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-slate-900">
                                {ride.rider?.name || "Unknown Rider"}
                              </p>
                              <p className="text-sm text-slate-500">
                                {ride.rider?.email || "No email"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm font-medium text-slate-700">
                                {ride.from}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-medium text-slate-700">
                                {ride.to}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-bold text-lg text-slate-800">
                            ৳{ride.fare}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-slate-600">
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">
                              {formatDate(ride.createdAt)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`${getStatusColor(
                              ride.rideStatus
                            )} border font-medium capitalize px-3 py-1 rounded-full`}
                          >
                            {ride.rideStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {ride.rideStatus !== "completed" && (
                            <Button
                              onClick={() => handleAction(ride)}
                              disabled={actionLoading === ride._id}
                              variant={getActionButtonVariant(ride.rideStatus)}
                              className="rounded-full px-6 font-medium transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
                              size="sm"
                            >
                              {actionLoading === ride._id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                getNextActionLabel(ride.rideStatus)
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            All ride actions are processed in real-time. Please handle ride
            requests promptly.
          </p>
        </div>
      </div>
    </div>
  );
}
