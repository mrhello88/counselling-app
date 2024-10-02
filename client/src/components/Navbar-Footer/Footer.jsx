import React from "react";
// import { Facebook, Twitter, Instagram, GitHub } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Affiliate Program
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Get Help</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Order Status
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Online Shop</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Watch
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Bag
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Shoes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#38bdf8]">
                  Dress
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-[#38bdf8] mr-4">
              Terms of Service
            </a>
            <a href="#" className="hover:text-[#38bdf8]">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
