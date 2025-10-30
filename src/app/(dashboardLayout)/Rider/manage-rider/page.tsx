"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Eye, MapPin, Clock, XCircle, Trash2 } from "lucide-react";
import {
  // service functions (adapt import path if yours differ)
  driverGetAllRide, // earlier service used to fetch rides (returns populated rider in some endpoints)
  getARiderInfo, // service to get a single ride detail: /ride/get/:id
} from "@/services/ride/ride.service";
import { riderCancelRide } from "@/services/ride/ride.service"; // uses POST /ride/cancel-ride (server-side function you provided)
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner"; // optional; remove if not using

// Interfaces according to your provided responses
interface IRideHistoryItem {
  _id?: string;
  status: string;
  time: string;
}

interface IRideShort {
  _id: string;
  rider: any; // sometimes populated object, sometimes id string
  startRide: { lat: number; lang: number; _id?: string };
  endRide: { lat: number; lang: number; _id?: string };
  distance?: number;
  duration?: number;
  fare?: number;
  rideStatus: string;
  promoCode?: string;
  rideHistory?: IRideHistoryItem[];
  createdAt: string;
  driver?: string;
}

export default function ManageRidePage() {
  const [rides, setRides] = useState<IRideShort[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRide, setSelectedRide] = useState<IRideShort | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch all rides (GET /ride/get-ride-info)
  const fetchRides = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await driverGetAllRide(); // expects response shape like your example with res.data.data
      const data = res?.data?.data ?? res?.data ?? [];
      setRides(data);
    } catch (err: any) {
      console.error("Failed to fetch rides:", err);
      setError(err?.message || "Failed to fetch rides");
    } finally {
      setLoading(false);
    }
  };

  // Fetch single ride details and open dialog
  const openRideDetails = async (rideId: string) => {
    setDetailLoading(true);
    try {
      const res = await getARiderInfo(rideId); // your service: GET /ride/get/:id
      const ride = res?.data ?? null;
      setSelectedRide(ride);
    } catch (err) {
      console.error("Failed to fetch ride detail:", err);
      toast?.error?.("Failed to load ride details");
    } finally {
      setDetailLoading(false);
    }
  };

  // Cancel ride: call POST /ride/cancel-ride with { rideId }
  const handleCancelRide = async (rideId: string) => {
    if (!confirm("Are you sure you want to cancel this ride?")) return;

    setActionLoadingId(rideId);
    try {
      // riderCancelRide is server-side in your code, we call it as an imported function
      const payload = { rideId };
      const res = await riderCancelRide(payload);
      if (res?.success) {
        toast?.success?.("Ride cancelled");
        // refresh list and selected detail (if currently open)
        await fetchRides();
        if (selectedRide?._id === rideId) {
          // refresh selected ride info
          await openRideDetails(rideId);
        }
      } else {
        throw new Error(res?.message || "Failed to cancel ride");
      }
    } catch (err: any) {
      console.error("Cancel ride failed:", err);
      toast?.error?.(err?.message || "Failed to cancel ride");
    } finally {
      setActionLoadingId(null);
    }
  };

  useEffect(() => {
    fetchRides();
  }, []);

  return (
    <div className="p-6">
      <Card className="rounded-2xl border shadow-sm">
        <CardHeader className="flex items-center justify-between border-b">
          <CardTitle className="text-lg font-semibold">Manage Rides</CardTitle>
          <div>
            <Button variant="ghost" onClick={fetchRides} className="mr-2">
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">{error}</div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead>Rider</TableHead>
                      <TableHead>Fare</TableHead>
                      <TableHead>Distance (km)</TableHead>
                      <TableHead>Duration (min)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {rides.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No rides found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      rides.map((ride) => {
                        // rider may be populated object or string id
                        const riderObj =
                          typeof ride.rider === "object" ? ride.rider : null;
                        const riderName =
                          riderObj?.name ??
                          (typeof ride.rider === "string"
                            ? ride.rider
                            : "Unknown");
                        const riderEmail = riderObj?.email ?? null;
                        return (
                          <TableRow
                            key={ride._id}
                            className="hover:bg-blue-50 transition"
                          >
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={riderObj?.avatar} />
                                  <AvatarFallback>
                                    {(riderName && riderName[0]) ?? "U"}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{riderName}</div>
                                  {riderEmail && (
                                    <div className="text-xs text-gray-500">
                                      {riderEmail}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              ৳ {ride.fare?.toFixed(2) ?? "—"}
                            </TableCell>
                            <TableCell>
                              {(ride.distance ?? 0).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {(ride.duration ?? 0).toFixed(1)}
                            </TableCell>

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
                              {new Date(ride.createdAt).toLocaleString()}
                            </TableCell>

                            <TableCell className="flex justify-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openRideDetails(ride._id)}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    View
                                  </Button>
                                </DialogTrigger>

                                <DialogContent className="max-w-xl">
                                  <DialogHeader>
                                    <DialogTitle>Ride Details</DialogTitle>
                                  </DialogHeader>

                                  {detailLoading &&
                                  selectedRide?._id === ride._id ? (
                                    <div className="flex items-center justify-center py-8">
                                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                                    </div>
                                  ) : selectedRide &&
                                    selectedRide._id === ride._id ? (
                                    <div className="space-y-3 text-sm">
                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <div>
                                          <div className="font-medium">
                                            Start
                                          </div>
                                          <div className="text-xs text-gray-600">
                                            {selectedRide.startRide.lat},{" "}
                                            {selectedRide.startRide.lang}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-500" />
                                        <div>
                                          <div className="font-medium">End</div>
                                          <div className="text-xs text-gray-600">
                                            {selectedRide.endRide.lat},{" "}
                                            {selectedRide.endRide.lang}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2 pt-2">
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Distance
                                          </div>
                                          <div className="font-medium">
                                            {(
                                              selectedRide.distance ?? 0
                                            ).toFixed(2)}{" "}
                                            km
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Duration
                                          </div>
                                          <div className="font-medium">
                                            {(
                                              selectedRide.duration ?? 0
                                            ).toFixed(1)}{" "}
                                            min
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Fare
                                          </div>
                                          <div className="font-medium">
                                            ৳{" "}
                                            {(selectedRide.fare ?? 0).toFixed(
                                              2
                                            )}
                                          </div>
                                        </div>
                                        <div>
                                          <div className="text-xs text-gray-500">
                                            Status
                                          </div>
                                          <div>
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
                                          </div>
                                        </div>
                                      </div>

                                      <div className="pt-3">
                                        <div className="flex items-center gap-2">
                                          <Clock className="w-4 h-4 text-blue-600" />
                                          <h4 className="font-medium">
                                            Ride History
                                          </h4>
                                        </div>
                                        <div className="pl-3 mt-2 space-y-1 border-l-2 border-blue-100">
                                          {selectedRide.rideHistory?.map(
                                            (h) => (
                                              <div
                                                key={
                                                  h._id ??
                                                  `${h.status}-${h.time}`
                                                }
                                                className="text-sm text-gray-700"
                                              >
                                                <div className="font-medium">
                                                  {h.status}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                  {new Date(
                                                    h.time
                                                  ).toLocaleString()}
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      </div>

                                      {/* Action row: Cancel when status is requested */}
                                      <div className="pt-4 flex justify-end gap-2">
                                        {selectedRide.rideStatus ===
                                        "requested" ? (
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <Button
                                                size="sm"
                                                variant="destructive"
                                                disabled={
                                                  actionLoadingId === ride._id
                                                }
                                              >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Cancel Ride
                                              </Button>
                                            </AlertDialogTrigger>

                                            <AlertDialogContent>
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                  Confirm Cancel Ride
                                                </AlertDialogTitle>
                                              </AlertDialogHeader>
                                              <AlertDialogDescription>
                                                Cancelling will mark the ride as
                                                cancelled. This action cannot be
                                                undone.
                                              </AlertDialogDescription>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                  Close
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                  onClick={async () => {
                                                    await handleCancelRide(
                                                      ride._id
                                                    );
                                                  }}
                                                  className="bg-red-600"
                                                >
                                                  Confirm Cancel
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        ) : (
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            disabled
                                          >
                                            <XCircle className="w-4 h-4 mr-1" />
                                            Cannot Cancel
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-center py-8 text-gray-500">
                                      No details loaded.
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>

                              {/* quick cancel (optional second control, only enabled when requested) */}
                              {ride.rideStatus === "requested" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-500 text-red-600"
                                  onClick={() => handleCancelRide(ride._id)}
                                  disabled={actionLoadingId === ride._id}
                                >
                                  {actionLoadingId === ride._id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-4 h-4 mr-1" />
                                  )}
                                  Cancel
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
