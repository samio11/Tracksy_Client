"use server";

import { cookies } from "next/headers";

export const successfulPayment = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payment/success`,
      {
        method: "POST",
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const failPayment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/payment/fail`, {
      method: "POST",
    });
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const cancelPayment = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payment/cancel`,
      {
        method: "POST",
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const getPaymentDataByAdmin = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/payment/get-payment`,
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
