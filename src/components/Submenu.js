// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Submenu = () => {


  return (
    <div className="px-8 py-2 flex gap-2">

        <Link href="/penalties">
        <button className="btn btn-sm">

              Penalties
        </button>

        </Link>
         <Link href="/complaints">
              <button className="btn btn-sm">
              Complaints
              </button>
            </Link>

    </div>
  );
};
export default Submenu;

