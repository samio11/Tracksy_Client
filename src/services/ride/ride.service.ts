"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createRide = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/ride/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `${(await cookies()).get("accessToken")?.value}`,
      },
      body: JSON.stringify(payload),
    });
    revalidateTag("ride", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverAcceptRide = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/accept-ride`,
      {
        method: "POST",
        headers: {
          Authorization: `${(await cookies()).get("accessToken")?.value}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("ride", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverStartRide = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/start-ride`,
      {
        method: "POST",
        headers: {
          Authorization: `${(await cookies()).get("accessToken")?.value}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("ride", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverCompleteRide = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/complete-ride`,
      {
        method: "POST",
        headers: {
          Authorization: `${(await cookies()).get("accessToken")?.value}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("ride", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const riderCancelRide = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/cancel-ride`,
      {
        method: "POST",
        headers: {
          Authorization: `${(await cookies()).get("accessToken")?.value}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    revalidateTag("ride", "max");
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverGetAllRide = async () => {
  const token = (await cookies()).get("accessToken")?.value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/get-ride-info`,
      {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
        next: {
          tags: ["ride"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const adminGetAllRide = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();

    if (page) queryParams.append("page", String(page));
    if (limit) queryParams.append("limit", String(limit));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/get-all?${
        queryParams.toString() || ""
      }`,
      {
        method: "GET",
        next: {
          tags: ["ride"],
        },
      }
    );

    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const getARiderInfo = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/get/${id}`,
      {
        method: "GET",
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const riderGetHisRideDetails = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/ride/get/${id}`,
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
