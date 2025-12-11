import React from 'react'
import { Link, NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
  const {user,userLogout}=useAuth()

  const handleLogOut=()=>{
     userLogout()
     .then()
     .catch()
  }
  const navlink = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/">All Issues</NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#115E59] text-white shadow-sm">
      <div className="flex w-[90%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu text-black text-[1rem] font-semibold menu-sm dropdown-content bg-green-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {navlink}
            </ul>
          </div>
          <Link to="/" className="text-2xl font-bold text-[#14B8A6]">
            Reportify
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-[1rem] font-semibold">
            {navlink}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="flex gap-2 items-center z-50">
            {
              user ? <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    id="userDisplayName"
                    alt=""
                    src={user?.photoURL}
                  />
                  {/* <ReactTooltip
                      anchorId="userDisplayName"
                      place="left"
                      content={`${user.displayName}`}
                    ></ReactTooltip> */}
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-green-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/" className="justify-between text-black text-[.8rem] font-semibold" > </Link>
                </li>
                <li>
                  <p className="text-black text-[.8rem] font-semibold">User Name: {user?.displayName}</p>
                </li>
                <li>
                  <Link to="/dashboard" className="text-black text-[.8rem] font-semibold" >Dashboard</Link>
                </li>
                <li>
                  <Link onClick={handleLogOut} className="text-black text-[.8rem] font-semibold">Logout</Link>
                </li>
              </ul>
            </div>
            :
              <div>
              <button className="bg-[#14B8A6] px-4 py-1 rounded-lg text-white text-[1.2rem] font-medium">
                <Link to="/login">LogIn</Link>
              </button>
            </div>
            }
          
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;