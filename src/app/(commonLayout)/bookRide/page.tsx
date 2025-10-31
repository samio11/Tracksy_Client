"use client";
import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  DollarSign,
  Car,
  Users,
  Sparkles,
  ArrowRight,
  MapPinned,
  Tag,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPicker } from "@/components/Leaflet/MapPicker";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { createRide } from "@/services/ride/ride.service";

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface RideData {
  startRide: Location | null;
  endRide: Location | null;
}

export default function BookRide() {
  const { user } = useUser();
  const [mapMode, setMapMode] = useState<"start" | "end">("start");
  const [rideData, setRideData] = useState<RideData>({
    startRide: null,
    endRide: null,
  });
  const [distance, setDistance] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);

  // Reverse geocoding function
  const getAddress = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    } catch (error) {
      return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    }
  };

  // Calculate distance and price
  useEffect(() => {
    const calculateDistance = async () => {
      if (!rideData.startRide || !rideData.endRide) {
        setDistance(null);
        return;
      }

      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${rideData.startRide.lng},${rideData.startRide.lat};${rideData.endRide.lng},${rideData.endRide.lat}?overview=false`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          const distanceInKm = data.routes[0].distance / 1000;
          setDistance(distanceInKm);
        }
      } catch (error) {
        console.error("Error calculating distance:", error);
      }
    };

    calculateDistance();
  }, [rideData.startRide, rideData.endRide]);

  const handleStartRideChange = async (location: Location) => {
    const address = await getAddress(location.lat, location.lng);
    setRideData((prev) => ({
      ...prev,
      startRide: { ...location, address },
    }));
    toast.success("Pickup location set!", {
      description: address,
    });
  };

  const handleEndRideChange = async (location: Location) => {
    const address = await getAddress(location.lat, location.lng);
    setRideData((prev) => ({
      ...prev,
      endRide: { ...location, address },
    }));
    toast.success("Destination set!", {
      description: address,
    });
  };

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
    // Remove promo application when user starts typing again
    if (isPromoApplied) {
      setIsPromoApplied(false);
    }
  };

  const handleBookRide = async () => {
    const toastId = toast.loading("Ride Creating...");
    if (!rideData.startRide || !rideData.endRide) {
      toast.error("Missing locations", {
        description: "Please set both pickup and destination locations",
      });
      return;
    }

    // Format the data as specified
    const bookingData = {
      startRide: {
        lat: rideData.startRide.lat,
        lang: rideData.startRide.lng,
      },
      endRide: {
        lat: rideData.endRide.lat,
        lang: rideData.endRide.lng,
      },
      rider: user?.id,
      ...(promoCode && { promoCode }), // Only include promoCode if it exists
    };

    try {
      const res = await createRide(bookingData);
      console.log(res);
      if (res?.success) {
        toast.success("Ride Created Done!!!", { id: toastId });
        // Reset form
        setPromoCode("");
        setIsPromoApplied(false);
      } else {
        toast.error("Ride created failed", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 -z-10" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse -z-10" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              Book Your Ride
            </Badge>
            <h1 className="text-5xl lg:text-6xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              Where Would You Like to Go?
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Set your pickup and destination locations on the map to book your
              ride
            </p>
          </div>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Map and Location Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Map Mode Selector */}
              <Card className="border-2 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPinned className="h-5 w-5 text-blue-600" />
                    Select Location on Map
                  </CardTitle>
                  <CardDescription>
                    Click on the map to set your pickup and destination points
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Tabs
                    value={mapMode}
                    onValueChange={(value) =>
                      setMapMode(value as "start" | "end")
                    }
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="start" className="gap-2">
                        <MapPin className="h-4 w-4" />
                        Pickup Location
                      </TabsTrigger>
                      <TabsTrigger value="end" className="gap-2">
                        <Navigation className="h-4 w-4" />
                        Destination
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Mode Indicator */}
                  <div
                    className={`p-3 rounded-lg border-2 ${
                      mapMode === "start"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-purple-50 border-purple-200"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {mapMode === "start"
                        ? "🔵 Setting Pickup Location"
                        : "🟣 Setting Destination"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Click anywhere on the map to set your{" "}
                      {mapMode === "start" ? "pickup point" : "destination"}
                    </p>
                  </div>

                  <MapPicker
                    startRide={rideData.startRide}
                    endRide={rideData.endRide}
                    onStartRideChange={handleStartRideChange}
                    onEndRideChange={handleEndRideChange}
                    mode={mapMode}
                  />
                </CardContent>
              </Card>

              {/* Location Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                        <MapPin className="text-white" size={24} />
                      </div>
                      <div>
                        <CardTitle>Pickup Location</CardTitle>
                        <CardDescription>
                          Where should we pick you up?
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rideData.startRide ? (
                      <>
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">
                            Address
                          </p>
                          <p className="text-sm">
                            {rideData.startRide.address}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-slate-50 rounded">
                            <p className="text-xs text-muted-foreground">
                              Latitude
                            </p>
                            <p className="text-sm">
                              {rideData.startRide.lat.toFixed(4)}
                            </p>
                          </div>
                          <div className="p-2 bg-slate-50 rounded">
                            <p className="text-xs text-muted-foreground">
                              Longitude
                            </p>
                            <p className="text-sm">
                              {rideData.startRide.lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <MapPin className="mx-auto mb-2 h-8 w-8 opacity-50" />
                        <p className="text-sm">
                          Click on the map to set pickup location
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-200 transition-colors">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-orange-600 flex items-center justify-center shadow-lg">
                        <Navigation className="text-white" size={24} />
                      </div>
                      <div>
                        <CardTitle>Destination</CardTitle>
                        <CardDescription>
                          Where are you heading?
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rideData.endRide ? (
                      <>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">
                            Address
                          </p>
                          <p className="text-sm">{rideData.endRide.address}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2 bg-slate-50 rounded">
                            <p className="text-xs text-muted-foreground">
                              Latitude
                            </p>
                            <p className="text-sm">
                              {rideData.endRide.lat.toFixed(4)}
                            </p>
                          </div>
                          <div className="p-2 bg-slate-50 rounded">
                            <p className="text-xs text-muted-foreground">
                              Longitude
                            </p>
                            <p className="text-sm">
                              {rideData.endRide.lng.toFixed(4)}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Navigation className="mx-auto mb-2 h-8 w-8 opacity-50" />
                        <p className="text-sm">
                          Click on the map to set destination
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="space-y-6">
              {/* Coupon Section */}
              <Card className="border-2 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Tag className="h-5 w-5 text-green-600" />
                    Apply Promo Code
                  </CardTitle>
                  <CardDescription>
                    Enter your discount code for 15% off
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="promo-code" className="text-sm font-medium">
                      Promo Code
                    </Label>
                    <Input
                      id="promo-code"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={handlePromoCodeChange}
                      className="w-full"
                    />
                  </div>

                  {isPromoApplied && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Promo code applied! 15% discount will be applied to
                          your ride.
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>• Enter your discount OTP code here</p>
                    <p>• 15% discount will be applied to your ride fare</p>
                    <p>• Code validation happens during ride creation</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ride Details */}
              <Card className="border-2 shadow-xl sticky top-24">
                <CardHeader>
                  <CardTitle>Ride Details</CardTitle>
                  <CardDescription>
                    Complete your booking information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Estimate */}
                  {distance && (
                    <>
                      <Separator />
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Distance
                          </span>
                          <span className="font-medium">
                            {distance.toFixed(2)} km
                          </span>
                        </div>
                        {promoCode && (
                          <div className="flex items-center justify-between pt-2 border-t border-blue-100">
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Tag className="h-3 w-3 text-green-600" />
                              Promo Applied
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              15% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <Button
                    onClick={handleBookRide}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                    disabled={!rideData.startRide || !rideData.endRide}
                  >
                    Book Ride Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {promoCode && (
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">
                        Promo code{" "}
                        <span className="font-mono">{promoCode}</span> will be
                        validated during booking
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
