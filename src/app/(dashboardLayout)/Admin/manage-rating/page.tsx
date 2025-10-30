"use client";

import { useEffect, useState } from "react";
import { getAllRating } from "@/services/rating/rating.service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  Star,
  MessageSquare,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Shield,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
}

interface IRating {
  _id: string;
  ride: string;
  from: IUser;
  to: IUser;
  score: number;
  comment: string;
  createdAt: string;
}

export default function ManageRating() {
  const [ratings, setRatings] = useState<IRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scoreFilter, setScoreFilter] = useState<number | null>(null);

  const fetchRatings = async () => {
    setLoading(true);
    try {
      const result = await getAllRating();
      const data = result?.data?.data || [];
      setRatings(data);
      setTotalPages(result?.data?.meta?.totalPage || 1);
    } catch (err) {
      toast.error("Failed to load ratings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [page]);

  const filteredRatings = ratings
    .filter(
      (r) =>
        r.from.name.toLowerCase().includes(search.toLowerCase()) ||
        r.to.name.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => scoreFilter === null || r.score === scoreFilter);

  const getScoreColor = (score: number) => {
    if (score >= 4) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 3) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 4) return "💚";
    if (score >= 3) return "💛";
    return "❤️";
  };

  const stats = {
    total: ratings.length,
    average:
      ratings.length > 0
        ? (
            ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length
          ).toFixed(1)
        : "0.0",
    excellent: ratings.filter((r) => r.score >= 4).length,
    poor: ratings.filter((r) => r.score <= 2).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ride Ratings
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Manage and monitor all ride ratings and feedback from our community
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Ratings
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.total}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Score
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.average}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-600 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Excellent Ratings
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.excellent}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Poor Ratings
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.poor}
                  </p>
                </div>
                <div className="p-3 bg-red-100 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Enhanced Header */}
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white pb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Star className="w-8 h-8 text-yellow-300 fill-current" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold">
                    Rating Management
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-lg">
                    Monitor ride experiences and user feedback
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 min-w-[280px]">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/80 w-5 h-5" />
                  <Input
                    placeholder="Search ratings, users, or comments..."
                    className="pl-12 pr-4 py-3 bg-white/20 border-white/30 text-white placeholder-white/70 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={scoreFilter === null ? "default" : "outline"}
                    className={cn(
                      "border-2 rounded-xl transition-all duration-200",
                      scoreFilter === null
                        ? "bg-white text-blue-600 border-white shadow-lg"
                        : "bg-transparent text-white border-white/30 hover:bg-white/20"
                    )}
                    onClick={() => setScoreFilter(null)}
                  >
                    All
                  </Button>
                  {[5, 4, 3, 2, 1].map((score) => (
                    <Button
                      key={score}
                      variant={scoreFilter === score ? "default" : "outline"}
                      className={cn(
                        "border-2 rounded-xl transition-all duration-200",
                        scoreFilter === score
                          ? "bg-white text-blue-600 border-white shadow-lg"
                          : "bg-transparent text-white border-white/30 hover:bg-white/20"
                      )}
                      onClick={() =>
                        setScoreFilter(scoreFilter === score ? null : score)
                      }
                    >
                      {score} ⭐
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="relative">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                  <Star className="w-6 h-6 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  Loading ratings...
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/80 hover:bg-gray-50/80">
                        <TableHead className="pl-8 pr-4 py-5 text-sm font-semibold text-gray-700">
                          Rider & Driver
                        </TableHead>
                        <TableHead className="px-4 py-5 text-sm font-semibold text-gray-700 text-center">
                          Rating
                        </TableHead>
                        <TableHead className="px-4 py-5 text-sm font-semibold text-gray-700">
                          Feedback
                        </TableHead>
                        <TableHead className="px-4 py-5 text-sm font-semibold text-gray-700 text-right">
                          Date
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredRatings.length > 0 ? (
                        filteredRatings.map((rating) => (
                          <TableRow
                            key={rating._id}
                            className="group hover:bg-blue-50/50 transition-all duration-300 border-b border-gray-100 last:border-b-0"
                          >
                            {/* Users Column */}
                            <TableCell className="pl-8 pr-4 py-6">
                              <div className="flex items-center space-x-6">
                                {/* Rider */}
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                  <div className="relative">
                                    <Avatar className="h-12 w-12 border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                      <AvatarImage src={rating.from.avatar} />
                                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                        {rating.from.name
                                          ?.charAt(0)
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                                      <Users className="w-3 h-3" />
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-gray-900 truncate">
                                      {rating.from.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                      {rating.from.email}
                                    </p>
                                  </div>
                                </div>

                                {/* Arrow */}
                                <div className="text-gray-300">
                                  <ChevronRight className="w-5 h-5" />
                                </div>

                                {/* Driver */}
                                <div className="flex items-center space-x-3 min-w-0 flex-1">
                                  <div className="relative">
                                    <Avatar className="h-12 w-12 border-2 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                      <AvatarImage src={rating.to.avatar} />
                                      <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold">
                                        {rating.to.name
                                          ?.charAt(0)
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1 border-2 border-white">
                                      <Shield className="w-3 h-3" />
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="font-semibold text-gray-900 truncate">
                                      {rating.to.name}
                                    </p>
                                    <p className="text-sm text-gray-500 truncate">
                                      {rating.to.email}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            {/* Rating Column */}
                            <TableCell className="px-4 py-6 text-center">
                              <div className="flex flex-col items-center space-y-2">
                                <Badge
                                  className={cn(
                                    "px-4 py-2 rounded-2xl border-2 font-bold text-lg shadow-lg transition-all duration-300 group-hover:scale-105",
                                    getScoreColor(rating.score)
                                  )}
                                >
                                  <span className="mr-1">
                                    {getScoreIcon(rating.score)}
                                  </span>
                                  {rating.score}.0
                                </Badge>
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={cn(
                                        "w-4 h-4 transition-colors duration-300",
                                        i < rating.score
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      )}
                                    />
                                  ))}
                                </div>
                              </div>
                            </TableCell>

                            {/* Comment Column */}
                            <TableCell className="px-4 py-6">
                              <div className="max-w-md">
                                <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-2xl group-hover:bg-white transition-colors duration-300 border border-gray-200">
                                  <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                  <p className="text-gray-700 leading-relaxed">
                                    {rating.comment || (
                                      <span className="text-gray-400 italic">
                                        No comment provided
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </TableCell>

                            {/* Date Column */}
                            <TableCell className="px-4 py-6 text-right">
                              <div className="flex flex-col items-end space-y-2">
                                <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-xl group-hover:bg-white transition-colors duration-300">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-medium">
                                    {new Date(
                                      rating.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {new Date(
                                    rating.createdAt
                                  ).toLocaleTimeString()}
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="px-4 py-16 text-center"
                          >
                            <div className="flex flex-col items-center space-y-4">
                              <div className="p-4 bg-gray-100 rounded-2xl">
                                <Search className="w-12 h-12 text-gray-400" />
                              </div>
                              <div>
                                <p className="text-xl font-semibold text-gray-900 mb-2">
                                  No ratings found
                                </p>
                                <p className="text-gray-600 max-w-md">
                                  {search || scoreFilter !== null
                                    ? "Try adjusting your search or filter criteria to find what you're looking for."
                                    : "No ratings have been submitted yet. Check back later!"}
                                </p>
                              </div>
                              {(search || scoreFilter !== null) && (
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setSearch("");
                                    setScoreFilter(null);
                                  }}
                                  className="rounded-xl"
                                >
                                  Clear filters
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Enhanced Pagination */}
                {filteredRatings.length > 0 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 border-t border-gray-200 bg-gray-50/50">
                    <p className="text-gray-600 mb-4 sm:mb-0">
                      Showing{" "}
                      <span className="font-semibold">
                        {filteredRatings.length}
                      </span>{" "}
                      of <span className="font-semibold">{ratings.length}</span>{" "}
                      ratings
                    </p>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="flex items-center space-x-2 rounded-xl border-gray-300 disabled:opacity-50 transition-all duration-200 hover:bg-white"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </Button>

                      <div className="flex items-center space-x-1 mx-4">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const pageNum = i + 1;
                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  page === pageNum ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setPage(pageNum)}
                                className={cn(
                                  "w-10 h-10 rounded-xl transition-all duration-200",
                                  page === pageNum
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "border-gray-300 hover:bg-white"
                                )}
                              >
                                {pageNum}
                              </Button>
                            );
                          }
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="flex items-center space-x-2 rounded-xl border-gray-300 disabled:opacity-50 transition-all duration-200 hover:bg-white"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
