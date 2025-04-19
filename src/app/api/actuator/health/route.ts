import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ status: "UP" }, { status: 200 });
};
