// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const {token, login, logout} = useAuth();


  return (
    <div className="navbar bg-base-200" style={{ borderBottom:"1.4px solid #a4a4a4" }}>
      <div className="flex-1">
         
        <Link href={token?"/dashboard":"/"} className="btn btn-ghost normal-case text-xl">FlatFolio</Link>
        
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {!token && <li>
            <Link href="/login">Login</Link>
          </li>}

          {token && <li>
            <button onClick={logout}>Logout</button>
          </li>}

        </ul>
      </div>
    </div>
  );
};
export default Navbar;

