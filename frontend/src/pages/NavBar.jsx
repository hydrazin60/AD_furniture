import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <nav className="bg-teal-500 p-4 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div
            className="text-white font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            AD FURNITURE
          </div>

          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          <ul className="hidden md:flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-white hover:bg-black hover:text-white p-2 rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:bg-black hover:text-white p-2 rounded"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/services"
                className="text-white hover:bg-black hover:text-white p-2 rounded"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/contract"
                className="text-white hover:bg-black hover:text-white p-2 rounded"
              >
                Contract
              </Link>
            </li>
            <li>
              <Link
                to="/staff/dashboard/:staffIds"
                className="text-white hover:bg-black hover:text-white p-2 rounded"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-white hover:bg-black hover:text-white p-2 rounded"
              >
                Login
              </Link>
            </li>
          </ul>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-16 left-0 w-full bg-teal-500 z-10 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:bg-black hover:text-white p-2 rounded"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:bg-black hover:text-white p-2 rounded"
                  onClick={toggleMobileMenu}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/services"
                  className="text-white hover:bg-black hover:text-white p-2 rounded"
                  onClick={toggleMobileMenu}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contract"
                  className="text-white hover:bg-black hover:text-white p-2 rounded"
                  onClick={toggleMobileMenu}
                >
                  Contract
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="text-white hover:bg-black hover:text-white p-2 rounded"
                >
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-white hover:bg-black hover:text-white p-2 rounded"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
