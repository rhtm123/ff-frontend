// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
// import { User } from "@phosphor-icons/react";

const Navbar = () => {
  const { token, logout } = useAuth();

  return (
    <div
      className="navbar bg-base-200"
      style={{ borderBottom: "1.4px solid #a4a4a4" }}
    >
      <div className="flex-1">
        <Link
          href={token ? "/dashboard" : "/"}
          className="btn btn-ghost normal-case text-xl text-primary"
        >
          SocietySathi
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center px-1">
          {token && 
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          }

          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {!token && (
            <li>
              <Link href="/login">
                Login
              </Link>
            </li>
          )}

          {token && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                  {/* <User size={24} /> */}
                  <span>User</span>
                  {/* <img
                    alt="Member Profile"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  /> */}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile" className="justify-between">
                    Profile
                    {/* <span className="badge">New</span> */}
                  </Link>
                </li>
                {/* <li>
                  <a>Settings</a>
                </li> */}
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
