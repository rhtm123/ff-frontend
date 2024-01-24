// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Submenu = () => {


  return (
    <div className="px-8 py-2">

    <ul className="menu menu-horizontal rounded-box bg-base-200">
      <li>
        <Link href="/penalties">
              Penalties
        </Link>
      </li>
      <li>
         <Link href="/complaints">
              Complaints
            </Link>
      </li>
    </ul>

    </div>
  );
};
export default Submenu;

