"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Search,
  Users,
  ShieldCheck,
  Trash2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  getAllUser,
  changeUserVerification,
  adminDeleteUser,
} from "@/services/user/user.service";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export default function ManageUserPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [limit] = useState(6);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const result = await getAllUser({
        page,
        limit,
        searchTerm: search || undefined,
      });
      setUsers(result?.data?.data || []);
      setTotalPages(result?.data?.meta?.totalPage || 1);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyToggle = async (id: string, isVerified: boolean) => {
    toast.loading("Updating...");
    try {
      await changeUserVerification(id, !isVerified);
      toast.success(
        `User ${!isVerified ? "verified" : "unverified"} successfully`
      );
      fetchUsers();
    } catch {
      toast.error("Failed to change verification");
    } finally {
      toast.dismiss();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    toast.loading("Deleting user...");
    try {
      await adminDeleteUser(userId);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  return (
    <div className="p-6">
      <Card className="border border-gray-200 shadow-lg rounded-2xl">
        {/* Header */}
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <Users className="text-blue-600" />
            <CardTitle className="text-xl font-semibold text-gray-800">
              Manage Users
            </CardTitle>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by email..."
              className="pl-9 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </CardHeader>

        {/* Body */}
        <CardContent className="p-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-100 text-gray-700">
                      <TableHead>Avatar</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow
                          key={user._id}
                          className={cn(
                            "hover:bg-blue-50 transition-all",
                            user.role === "Admin" && "bg-blue-50/40"
                          )}
                        >
                          <TableCell>
                            <Avatar className="h-10 w-10 border">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>
                                {user.name?.charAt(0).toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">
                            {user.name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone || "—"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "Admin"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.isVerified ? (
                              <Badge
                                variant="outline"
                                className="border-green-500 text-green-600"
                              >
                                Verified
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="border-yellow-500 text-yellow-600"
                              >
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>

                          <TableCell className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className={cn(
                                "flex items-center gap-1 transition-all",
                                user.isVerified
                                  ? "text-red-600 border-red-500 hover:bg-red-50"
                                  : "text-green-600 border-green-500 hover:bg-green-50"
                              )}
                              onClick={() =>
                                handleVerifyToggle(user._id, user.isVerified)
                              }
                            >
                              {user.isVerified ? (
                                <>
                                  <XCircle className="w-4 h-4" /> Unverify
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-4 h-4" /> Verify
                                </>
                              )}
                            </Button>

                            {/* Delete Button with Confirmation */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-500 text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete this user?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. The user will
                                    be permanently removed from the database.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-600 hover:bg-red-700"
                                    onClick={() => handleDeleteUser(user._id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-gray-500"
                        >
                          No users found.
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
