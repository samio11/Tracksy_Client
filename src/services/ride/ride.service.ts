import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createRide = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/ride/create`, {
      method: "POST",
      headers: {
        Authorization: `${(await cookies()).get("accessToken")?.value}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
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
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverCancelRide = async (payload: FieldValues) => {
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
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const driverGetAllRide = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/ride/get-all`, {
      method: "GET",
    });
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
