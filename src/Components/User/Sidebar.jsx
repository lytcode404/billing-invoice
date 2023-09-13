import { auth } from "@/db/firebase";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Sidebar = ({ displayName, sideNavActive, setSideNavActive }) => {
  const [isPagesMenuOpen, setPagesMenuOpen] = useState(true);
  const [isAutomationMenuOpen, setAutomationMenuOpen] = useState(true);
  const automations = [];
  const togglePagesMenu = () => {
    setPagesMenuOpen(!isPagesMenuOpen);
  };

  const toggleAutomationsMenu = () => {
    setAutomationMenuOpen(!isAutomationMenuOpen);
  };
  return (
    <>
      {/* <!-- Desktop sidebar --> */}
      <aside className="max-sm:hidden z-20 overflow-y-auto text-white bg-[#025a486c] shadow-xl border-[#025a4893] border-r-2 h-screen">
        <div className="py-4 -500 ">
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <Link
                className="inline-flex items-center w-full text-sm font-semibold -800 transition-colors duration-150 hover:-800 dark2hover:-200 dark2-100"
                href="/"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span
                  className="ml-4"
                 
                >
                  Dashboard
                </span>
              </Link>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:-800 dark2hover:-200"
                href="/send-invoices"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <span className="ml-4">Send Invoices</span>
              </Link>
            </li>
            
            
            <li className="relative px-6 py-3">
              <button
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:-800 dark2hover:-200"
                onClick={togglePagesMenu}
                aria-haspopup="true"
              >
                <span className="inline-flex items-center">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                  </svg>
                  <span className="ml-4">{displayName}</span>
                </span>
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {isPagesMenuOpen && (
                <ul
                  className="p-2 bg-[#247e6c59] mt-2 space-y-2 overflow-hidden text-sm font-medium  rounded-md shadow-inner  dark2-400 dark2bg-gray-900"
                  aria-label="submenu"
                >
                  <li className="px-2 py-1 transition-colors duration-150 hover:-800 dark2hover:-200">
                    <Link
                      className="w-full cursor-pointer"
                      href={`/profile`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="px-2 py-1 transition-colors duration-150 hover:-800 dark2hover:-200">
                    <Link
                      className="w-full cursor-pointer"
                      href={`/user-settings`}
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="cursor-pointer px-2 py-1 transition-colors duration-150 hover:-800 dark2hover:-200">
                    <div onClick={()=>auth.signOut()} className="w-full">
                      Logout
                    </div>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <div className="px-6 my-6">
            <Link href={`/create-invoice`} className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-[#247e6c59] border border-transparent rounded-lg active:bg-[#247e6c59] hover:bg-[#247e6c59] focus:outline-none focus:shadow-outline-purple capitalize">
              Create Invoice
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
