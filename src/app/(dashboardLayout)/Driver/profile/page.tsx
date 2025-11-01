"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Mail,
  Phone,
  Star,
  Wallet,
  MapPin,
  Plus,
  Trash2,
  User,
  Calendar,
  Users,
  Navigation,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SIngleImageUploader from "@/components/ui/SIngleImageUploader";
import {
  driverCreateVehicle,
  driverDeleteVehicle,
  getAUser,
} from "@/services/user/user.service";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/context/UserContext";

export default function DriverProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [vehicleImage, setVehicleImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    model: "",
    year: "",
    maxCapacity: "",
    type: "Car",
  });
  const { user: driverData } = useUser();

  useEffect(() => {
    // Guard clause: only fetch if driverData exists
    if (!driverData?.id) {
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getAUser(driverData.id);
        if (res.success) {
          setUser(res.data);
          toast.success("Profile loaded successfully!");
        } else {
          toast.error("Failed to load profile");
        }
      } catch (error) {
        toast.error("Error loading profile");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [driverData?.id]); // Added dependency

  const handleCreateVehicle = async () => {
    if (!vehicleImage) {
      toast.error("Please upload a vehicle image!");
      return;
    }

    if (!form.model || !form.year || !form.maxCapacity) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (!user?._id || !driverData?.id) {
      toast.error("User data not available");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("owner", user._id);
      formData.append("model", form.model);
      formData.append("year", form.year);
      formData.append("maxCapacity", form.maxCapacity);
      formData.append("type", form.type);
      formData.append("vehicleImage", vehicleImage);

      const res = await driverCreateVehicle(formData);
      if (res.success) {
        toast.success("🚗 Vehicle added successfully!");
        setOpen(false);
        setForm({ model: "", year: "", maxCapacity: "", type: "Car" });
        setVehicleImage(null);

        // Refresh user data
        const updatedUser = await getAUser(driverData.id);
        if (updatedUser.success) setUser(updatedUser.data);
      } else {
        toast.error("Failed to add vehicle");
      }
    } catch (error) {
      toast.error("Error adding vehicle");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    toast.custom((t) => (
      <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <Trash2 className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Delete Vehicle</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Are you sure you want to delete this vehicle? This action cannot be
          undone.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={() => toast.dismiss(t)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={async () => {
              toast.dismiss(t);
              if (!driverData?.id) {
                toast.error("User data not available");
                return;
              }
              try {
                const res = await driverDeleteVehicle(id);
                if (res.success) {
                  toast.success("🗑️ Vehicle deleted successfully!");
                  const updatedUser = await getAUser(driverData.id);
                  if (updatedUser.success) setUser(updatedUser.data);
                } else {
                  toast.error("Failed to delete vehicle");
                }
              } catch (error) {
                toast.error("Error deleting vehicle");
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    ));
  };

  // Show loading state if driver data hasn't loaded yet
  if (!driverData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading driver data...</p>
        </div>
      </div>
    );
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 text-gray-400 mx-auto" />
          <p className="text-gray-600 font-medium">Failed to load profile</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const { driverProfile } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
            Driver Profile
          </h1>
          <p className="text-gray-600">
            Manage your driver account and vehicles
          </p>
        </div>

        {/* Profile Card */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white shadow-2xl rounded-3xl border-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <CardContent className="relative p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl border-4 border-white/20 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left space-y-4">
                <div>
                  <h2 className="text-3xl font-bold capitalize mb-2">
                    {user.name}
                  </h2>
                  <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 py-1 text-sm">
                    {user.role}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-blue-200">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-blue-200">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-gray-700 text-sm font-semibold">
                Rating
              </CardTitle>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">
                  {driverProfile.rating}
                </p>
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
              <p className="text-sm text-gray-600 mt-1">Average rating</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-gray-700 text-sm font-semibold">
                Accepted Rides
              </CardTitle>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                {driverProfile.acceptedRide}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Total completed rides
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-gray-700 text-sm font-semibold">
                Total Income
              </CardTitle>
              <div className="p-2 bg-green-100 rounded-lg">
                <Wallet className="w-5 h-5 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">
                ${driverProfile.income.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Lifetime earnings</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicle Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Car className="w-6 h-6 text-blue-600" />
                  </div>
                  Vehicle Details
                </CardTitle>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg rounded-xl">
                      <Plus className="w-4 h-4" /> Add Vehicle
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md rounded-2xl border-0 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-xl">
                        <Car className="w-5 h-5" />
                        Add New Vehicle
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Vehicle Model
                        </Label>
                        <Input
                          placeholder="e.g. Toyota Prius"
                          value={form.model}
                          onChange={(e) =>
                            setForm({ ...form, model: e.target.value })
                          }
                          className="rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">Year</Label>
                          <Input
                            placeholder="e.g. 2019"
                            value={form.year}
                            onChange={(e) =>
                              setForm({ ...form, year: e.target.value })
                            }
                            className="rounded-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Max Capacity
                          </Label>
                          <Input
                            placeholder="e.g. 4"
                            value={form.maxCapacity}
                            onChange={(e) =>
                              setForm({ ...form, maxCapacity: e.target.value })
                            }
                            className="rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Vehicle Type
                        </Label>
                        <Select
                          value={form.type}
                          onValueChange={(value) =>
                            setForm({ ...form, type: value })
                          }
                        >
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Car">Car</SelectItem>
                            <SelectItem value="Truck">Truck</SelectItem>
                            <SelectItem value="Bike">Bike</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Vehicle Image
                        </Label>
                        <SIngleImageUploader onChange={setVehicleImage} />
                      </div>

                      <Button
                        onClick={handleCreateVehicle}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg py-3 font-medium shadow-lg"
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Adding Vehicle...
                          </div>
                        ) : (
                          "Add Vehicle"
                        )}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent>
              {driverProfile?.vehicle ? (
                <div className="space-y-6">
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-1">
                    <img
                      src={driverProfile.vehicle.vehicleImage}
                      alt={driverProfile.vehicle.model}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Model</Label>
                      <p className="font-semibold text-gray-900">
                        {driverProfile.vehicle.model}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Type</Label>
                      <p className="font-semibold text-gray-900">
                        {driverProfile.vehicle.type}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Year</Label>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <p className="font-semibold text-gray-900">
                          {driverProfile.vehicle.year}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-sm text-gray-600">Capacity</Label>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <p className="font-semibold text-gray-900">
                          {driverProfile.vehicle.maxCapacity} people
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2 rounded-lg py-2.5 font-medium shadow-lg"
                    onClick={() =>
                      handleDeleteVehicle(driverProfile.vehicle._id)
                    }
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Vehicle
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <Car className="w-16 h-16 text-gray-300 mx-auto" />
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium">
                      No vehicle added yet
                    </p>
                    <p className="text-sm text-gray-500">
                      Add your first vehicle to start accepting rides
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location & Status Section */}
          <div className="space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  Current Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Latitude</Label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Navigation className="w-4 h-4 text-blue-600 rotate-45" />
                      <p className="font-mono font-semibold text-gray-900">
                        {driverProfile.location.lat}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-600">Longitude</Label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <Navigation className="w-4 h-4 text-green-600 rotate-45" />
                      <p className="font-mono font-semibold text-gray-900">
                        {driverProfile.location.lang}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div>
                    <p className="font-semibold text-gray-900">Driver Status</p>
                    <p className="text-sm text-gray-600">
                      Current availability
                    </p>
                  </div>
                  <Badge
                    className={`capitalize px-4 py-2 text-sm font-medium ${
                      driverProfile.status === "online"
                        ? "bg-green-500 text-white"
                        : driverProfile.status === "busy"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {driverProfile.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Additional Info Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Driver Profile
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your profile is{" "}
                    {driverProfile.status === "online" ? "active" : "inactive"}{" "}
                    and ready to accept rides
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
