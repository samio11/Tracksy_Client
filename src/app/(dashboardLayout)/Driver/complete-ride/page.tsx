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
  DollarSign,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { driverCompleteRide } from "@/services/user/user.service";

export default function DriverCompletedRidesPage() {
  const [rides, setRides] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNum = 1) => {
    try {
      setLoading(true);
      const result = await driverCompleteRide({
        page: pageNum.toString(),
        limit: "5",
      });
      setRides(result.rides);
      setMeta(result.meta);
      const total = result.rides.reduce(
        (sum: number, r: any) => sum + (r.fare || 0),
        0
      );
      setTotalIncome(total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🚗 Completed Rides
      </h1>

      {/* Income Card */}
      <Card className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <DollarSign className="w-6 h-6" /> Total Income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-semibold">${totalIncome.toFixed(2)}</p>
          <p className="text-sm opacity-80 mt-1">From all completed rides</p>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      ) : rides.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No completed rides yet.
        </p>
      ) : (
        <>
          {/* Rides Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Ride History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Distance (km)</TableHead>
                    <TableHead>Duration (min)</TableHead>
                    <TableHead>Fare ($)</TableHead>
                    <TableHead>Promo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Completed At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rides.map((ride, i) => (
                    <TableRow key={ride._id}>
                      <TableCell>{i + 1 + (page - 1) * 5}</TableCell>
                      <TableCell>{ride.distance.toFixed(2)}</TableCell>
                      <TableCell>{ride.duration.toFixed(1)}</TableCell>
                      <TableCell>${ride.fare.toFixed(2)}</TableCell>
                      <TableCell>
                        {ride.promoCode ? (
                          <Badge
                            variant="outline"
                            className="text-emerald-600 border-emerald-600"
                          >
                            {ride.promoCode}
                          </Badge>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-600">Completed</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(ride.updatedAt).toLocaleString("en-BD", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </Button>
                <p className="text-sm text-gray-500">
                  Page {meta.page || page} of {meta.totalPage || 1}
                </p>
                <Button
                  variant="outline"
                  disabled={meta.page >= meta.totalPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-1"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
