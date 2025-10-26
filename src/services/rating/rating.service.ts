"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
export const createRating = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/rating/create`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `${(await cookies())?.get("accessToken")?.value}`,
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

export const getAllRating = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/rating/get-all`,
      {
        method: "GET",
        headers: {
          Authorization: `${(await cookies()).get("accessToken")?.value}`,
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
