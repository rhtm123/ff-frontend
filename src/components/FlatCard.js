import React from "react";
import Link from "next/link";
export default function FlatCard() {
  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">2A 501</h2>
        <div className="card-actions justify-end">
          <Link href="/flatview">
            <button className="btn btn-primary">Open</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
