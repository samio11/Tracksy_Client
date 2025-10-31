"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerAsDriver } from "@/services/auth/auth.service";
import SIngleImageUploader from "@/components/ui/SIngleImageUploader";
import { toast } from "sonner";

export default function DriverRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    model: "",
    year: "",
    maxCapacity: "",
    type: "",
    licenseNumber: "",
    status: "available",
    rating: 0,
    acceptedRide: 0,
    location: { lat: 23.8103, lang: 90.4125 },
  });

  const [personPhoto, setPersonPhoto] = useState<File | null>(null);
  const [carPhoto, setCarPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("data", JSON.stringify(formData));

    // Must follow sequence: [0] person, [1] car
    if (personPhoto) data.append("files", personPhoto);
    if (carPhoto) data.append("files", carPhoto);

    try {
      const res = await registerAsDriver(data);
      toast.success(res?.message || "Driver Registered Successfully!");
      router.push("/login");
    } catch (err) {
      toast.error("Driver Registration Failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Driver Partner
          </h1>
          <p className="text-gray-600">
            Join our platform and start earning with your vehicle
          </p>
        </div> */}

        <Card className="w-full shadow-2xl border-0 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6">
            <CardTitle className="text-2xl font-bold text-white text-center">
              Driver Registration
            </CardTitle>
          </div>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <Input
                      name="phone"
                      placeholder="Enter phone number"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Create password"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Vehicle Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Car Model
                    </label>
                    <Input
                      name="model"
                      placeholder="e.g., Toyota Camry"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Car Year
                    </label>
                    <Input
                      name="year"
                      placeholder="e.g., 2023"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Max Capacity
                    </label>
                    <Input
                      name="maxCapacity"
                      placeholder="Number of passengers"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Vehicle Type
                    </label>
                    <Input
                      name="type"
                      placeholder="e.g., Car, Bike, SUV"
                      onChange={handleChange}
                      required
                      className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* License Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  License Information
                </h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    License Number
                  </label>
                  <Input
                    name="licenseNumber"
                    placeholder="Enter driver's license number"
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Upload Photos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 block">
                      Your Photo
                    </label>
                    <SIngleImageUploader
                      onChange={(file: File) => setPersonPhoto(file)}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition-colors min-h-[120px]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700 block">
                      Car Photo
                    </label>
                    <SIngleImageUploader
                      onChange={(file: File) => setCarPhoto(file)}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-emerald-500 transition-colors min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold text-base rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                    Registering Driver...
                  </div>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
