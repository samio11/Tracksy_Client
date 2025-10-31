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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  MapPin,
  Clock,
  Car,
  Eye,
  Route,
  SendHorizontal,
} from "lucide-react";
import { adminGetAllRide, getARiderInfo } from "@/services/ride/ride.service";

import { adminSendDiscountOTP } from "@/services/user/user.service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface IRide {
  _id: string;
  rider: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    isVerified: boolean;
  };
  startRide: { lat: number; lang: number };
  endRide: { lat: number; lang: number };
  distance: number;
  duration: number;
  fare: number;
  rideStatus: string;
  createdAt: string;
}

export default function ManageRide() {
  const [rides, setRides] = useState<IRide[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState<any>(null);
  const [sending, setSending] = useState(false);

  // Pagination states
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(3);

  // 🔹 Fetch all rides
  const fetchRides = async () => {
    setLoading(true);
    try {
      const res = await adminGetAllRide({ page, limit });
      setRides(res?.data?.data || []);
      setTotalPages(res?.data?.meta?.totalPage || 1);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch rides");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch single ride details
  const fetchRideDetails = async (id: string) => {
    try {
      const res = await getARiderInfo(id);
      setSelectedRide(res?.data || null);
    } catch {
      toast.error("Failed to fetch ride details");
    }
  };

  // 🔹 Send discount OTP (only for requested rides)
  const handleSendDiscount = async (email: string) => {
    setSending(true);
    try {
      const res = await adminSendDiscountOTP({ email });
      if (res.success) {
        toast.success("Discount OTP sent successfully!");
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error sending discount OTP");
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    fetchRides();
  }, [page]);

  return (
    <div className="p-6">
      <Card className="border border-gray-200 shadow-md rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b bg-gray-50 rounded-t-2xl">
          <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Car className="text-blue-600" /> Manage Rides
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 text-gray-700">
                      <TableHead>Rider</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Distance (km)</TableHead>
                      <TableHead>Duration (min)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rides.length > 0 ? (
                      rides.map((ride) => (
                        <TableRow
                          key={ride._id}
                          className="hover:bg-blue-50 transition-all"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={ride.rider?.avatar} />
                                <AvatarFallback>
                                  {ride.rider?.name?.[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold">
                                  {ride.rider?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {ride.rider?.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>৳ {ride.fare.toFixed(2)}</TableCell>
                          <TableCell>{ride.distance.toFixed(2)}</TableCell>
                          <TableCell>{ride.duration.toFixed(1)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                ride.rideStatus === "completed"
                                  ? "border-green-500 text-green-600"
                                  : ride.rideStatus === "requested"
                                  ? "border-yellow-500 text-yellow-600"
                                  : "border-blue-500 text-blue-600"
                              }
                            >
                              {ride.rideStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(ride.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="space-y-2">
                            {/* 👁 View Ride */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => fetchRideDetails(ride._id)}
                                >
                                  <Eye className="h-4 w-4 mr-1" /> View
                                </Button>
                              </DialogTrigger>

                              {selectedRide &&
                                selectedRide._id === ride._id && (
                                  <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                      <DialogTitle className="flex items-center gap-2">
                                        <Route className="text-blue-600" /> Ride
                                        Details
                                      </DialogTitle>
                                    </DialogHeader>

                                    <div className="space-y-3 text-sm">
                                      <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <p>
                                          <span className="font-semibold">
                                            Start:
                                          </span>{" "}
                                          {selectedRide.startRide.lat},{" "}
                                          {selectedRide.startRide.lang}
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-red-500" />
                                        <p>
                                          <span className="font-semibold">
                                            End:
                                          </span>{" "}
                                          {selectedRide.endRide.lat},{" "}
                                          {selectedRide.endRide.lang}
                                        </p>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2 pt-2">
                                        <p>
                                          <span className="font-semibold">
                                            Distance:
                                          </span>{" "}
                                          {selectedRide.distance.toFixed(2)} km
                                        </p>
                                        <p>
                                          <span className="font-semibold">
                                            Duration:
                                          </span>{" "}
                                          {selectedRide.duration.toFixed(1)} min
                                        </p>
                                        <p>
                                          <span className="font-semibold">
                                            Fare:
                                          </span>{" "}
                                          ৳ {selectedRide.fare.toFixed(2)}
                                        </p>
                                        <p>
                                          <span className="font-semibold">
                                            Status:
                                          </span>{" "}
                                          <Badge
                                            variant="outline"
                                            className={
                                              selectedRide.rideStatus ===
                                              "completed"
                                                ? "border-green-500 text-green-600"
                                                : "border-yellow-500 text-yellow-600"
                                            }
                                          >
                                            {selectedRide.rideStatus}
                                          </Badge>
                                        </p>
                                      </div>

                                      <div className="pt-3">
                                        <h4 className="font-semibold mb-1 flex items-center gap-1">
                                          <Clock className="h-4 w-4 text-blue-600" />{" "}
                                          Ride History
                                        </h4>
                                        <div className="space-y-1 pl-3 border-l-2 border-blue-300">
                                          {selectedRide.rideHistory.map(
                                            (h: any) => (
                                              <p
                                                key={h._id}
                                                className="text-gray-600"
                                              >
                                                <span className="font-medium">
                                                  {h.status}
                                                </span>{" "}
                                                →{" "}
                                                {new Date(
                                                  h.time
                                                ).toLocaleString()}
                                              </p>
                                            )
                                          )}
                                        </div>
                                      </div>

                                      {/* 🚀 Send Discount OTP inside modal */}
                                      {ride.rideStatus === "requested" && (
                                        <div className="pt-4 flex justify-end">
                                          <Button
                                            onClick={() =>
                                              handleSendDiscount(
                                                ride.rider.email
                                              )
                                            }
                                            disabled={sending}
                                            className="bg-blue-600 hover:bg-blue-700 text-white"
                                          >
                                            {sending ? (
                                              <Loader2 className="h-4 w-4 animate-spin mr-1" />
                                            ) : (
                                              <SendHorizontal className="h-4 w-4 mr-1" />
                                            )}
                                            Send Discount OTP
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </DialogContent>
                                )}
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No rides found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>

                <p className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </p>

                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
