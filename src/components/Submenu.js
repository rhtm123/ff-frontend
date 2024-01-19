// components/Navbar.tsx
import React from "react";
import Link from "next/link";

const Submenu = () => {


  return (
    <div>
        <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
            <li>
                <Link href="/penalty">Penalty</Link>
            </li>
        </ul>
    </div>
  );
};
export default Submenu;

