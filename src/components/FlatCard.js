import React from "react";
import Link from "next/link";
export default function FlatCard() {
  return (
    <Link href="/flatview">
    <div className="card bg-base-300">
      <div className="card-body p-4 ">
        <h2 className="text-xl font-bold text-center">2A 501</h2>
      </div>
    </div>
    </Link>
  );
}
