import React from "react";
import Link from "next/link";
export default function FlatCard({flat}) {
  return (
    <Link href={"/flatview/"+flat._id}>
    <div className="card bg-base-300">
      <div className="card-body p-4 ">
        <h2 className="text-xl font-bold text-center">{flat?.wingId.name} {flat?.name}</h2>
      </div>
    </div>
    </Link>
  );
}
