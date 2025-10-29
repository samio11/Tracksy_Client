"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const login = async (payload: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
      (await cookies()).set("refreshToken", result?.data?.refreshToken);
    }
    return result;
  } catch (err) {
    throw err;
  }
};

export const registerAsRider = async (payload: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/register-rider`,
      {
        method: "POST",
        body: payload,
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const registerAsDriver = async (payload: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/register-driver`,
      {
        method: "POST",
        body: payload,
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const registerAsAdmin = async (payload: FormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/register-admin`,
      {
        method: "POST",
        body: payload,
      }
    );
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};
export const sendForgetOTP = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/send-otp`,
      {
        method: "POST",
        headers: {
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
export const resetPassword = async (payload: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND}/auth/reset-password`,
      {
        method: "POST",
        headers: {
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
export const logout = async () => {
  try {
    (await cookies()).delete("accessToken");
  } catch (err) {
    throw err;
  }
};

export const googleLogin = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/auth/google`, {
      method: "GET",
    });
    const result = await res.json();
    return result;
  } catch (err) {
    throw err;
  }
};

export const getUserData = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decode = null;
    if (accessToken) {
      decode = await jwtDecode(accessToken);
      return decode;
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
};
