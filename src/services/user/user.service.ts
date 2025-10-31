"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface IUserQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export const getAllUser = async (query: IUserQuery) => {
  const token = (await cookies()).get("accessToken")?.value;
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page.toString());
  if (query.limit) params.append("limit", query.limit.toString());
  if (query.searchTerm) params.append("searchTerm", query.searchTerm);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/user/get?${params.toString()}`,
    {
      method: "GET",
      headers: { Authorization: `${token}` },
      cache: "no-store",
    }
  );
  return res.json();
};

export const changeUserVerification = async (
  userId: string,
  isVerify: boolean
) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/user/change-verification`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ userId, isVerify }),
    }
  );

  const result = await res.json();
  if (!res.ok)
    throw new Error(result.message || "Failed to change verification");
  return result;
};

export const adminDeleteUser = async (userId: string) => {
  const token = (await cookies()).get("accessToken")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/user/delete/${userId}`,
    {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    }
  );
  return res.json();
};

export const adminStates = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/admin-states`,
      {
        method: "GET",
        headers: { Authorization: `${token}` },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const getAUser = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/get/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const getAUserRideCount = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/ride-count`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverCompleteRide = async (
  query: Record<string, string> = {}
) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const queryString = new URLSearchParams(query).toString();

    const url = `${process.env.NEXT_PUBLIC_BACKEND}/user/driver-complete-ride${
      queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch driver complete rides: ${res.statusText}`
      );
    }

    const result = await res.json();

    return {
      success: result.success,
      message: result.message,
      rides: result.data?.data || [],
      meta: result.data?.meta || {},
    };
  } catch (err) {
    console.error("Error fetching completed rides:", err);
    throw err;
  }
};

export const updateAUserData = async (id: string, payload: FieldValues) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/update/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverCreateVehicle = async (payload: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/driver/create/vehicle`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json",
        },
        body: payload,
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const adminSendDiscountOTP = async (payload: FieldValues) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/discount`,
      {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverDeleteVehicle = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/user/driver/delete/vehicle/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
