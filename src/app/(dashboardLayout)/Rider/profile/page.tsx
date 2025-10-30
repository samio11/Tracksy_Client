"use client";

import React, { useEffect, useState } from "react";
import {
  getAUser,
  getAUserRideCount,
  updateAUserData,
} from "@/services/user/user.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader2,
  MapPin,
  Calendar,
  Phone,
  Shield,
  Edit3,
  Star,
  Bike,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { Badge } from "@/components/ui/badge";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  isVerified: boolean;
  createdAt: string;
}

const RiderDashboard = () => {
  const [user1, setUser1] = useState<IUser | null>(null);
  const [rideCount, setRideCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const { user } = useUser();
  const userId = user?.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, rideRes] = await Promise.all([
          getAUser(userId),
          getAUserRideCount(),
        ]);
        setUser1(userRes?.data);
        setRideCount(rideRes?.data?.rideCount || 0);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load rider data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (values: any) => {
    try {
      const res = await updateAUserData(userId, values);
      if (res.success) {
        toast.success("Profile updated successfully!");
        setUser1(res.data);
        setIsEditing(false);
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your rider profile...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Rider Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and track your rides
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Profile Card */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
                <div className="absolute -bottom-16 left-8">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                    <AvatarImage src={user1?.avatar} alt={user1?.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {user1?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <CardContent className="pt-20 px-8 pb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {user1?.name}
                    </h2>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {user?.email}
                    </p>
                  </div>
                  <Badge
                    variant={user1?.isVerified ? "default" : "secondary"}
                    className={`text-sm px-3 py-1 rounded-full ${
                      user1?.isVerified
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    {user1?.isVerified ? (
                      <>
                        <Shield className="w-3 h-3 mr-1" /> Verified
                      </>
                    ) : (
                      "Pending Verification"
                    )}
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-500 rounded-2xl">
                        <Bike className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Rides</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {rideCount}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-purple-500 rounded-2xl">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Member Since</p>
                        <p className="text-lg font-bold text-gray-900">
                          {new Date(user1?.createdAt || "").toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <Label className="text-sm text-gray-600">Phone</Label>
                        <p className="text-gray-900 font-medium">
                          {user1?.phone || "Not provided"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-purple-600" />
                      <div>
                        <Label className="text-sm text-gray-600">
                          Joined Date
                        </Label>
                        <p className="text-gray-900 font-medium">
                          {new Date(
                            user1?.createdAt || ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <Label className="text-sm text-gray-600">Role</Label>
                        <p className="text-gray-900 font-medium capitalize">
                          {user?.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            user1?.isVerified ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        />
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Status</Label>
                        <p
                          className={`font-semibold ${
                            user1?.isVerified
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {user1?.isVerified ? "Active" : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions & Quick Stats */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                      size="lg"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md rounded-2xl border-0 shadow-2xl bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Update Profile
                      </DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6 mt-4"
                    >
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Full Name
                        </Label>
                        <Input
                          defaultValue={user1?.name}
                          {...register("name")}
                          placeholder="Enter your name"
                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          defaultValue={user1?.phone}
                          {...register("phone")}
                          placeholder="Enter phone number"
                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">
                          Avatar URL
                        </Label>
                        <Input
                          defaultValue={user1?.avatar}
                          {...register("avatar")}
                          placeholder="Enter avatar URL"
                          className="rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 rounded-xl border-gray-300"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-xl shadow-lg"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Achievement Card */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Rider Level</h3>
                  <div className="flex justify-center items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {rideCount > 50
                        ? "Expert"
                        : rideCount > 20
                        ? "Intermediate"
                        : "Beginner"}
                    </span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700"
                    >
                      {rideCount} rides
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">
                    {rideCount > 50
                      ? "You are an experienced rider!"
                      : rideCount > 20
                      ? "Keep going, you are doing great!"
                      : "Start your riding journey!"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderDashboard;
