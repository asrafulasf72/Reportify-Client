import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#115E59] text-white py-10 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">Reportify</h2>
          <p className="mt-3 text-gray-200 text-sm leading-relaxed">
            A smart platform for reporting and managing public infrastructure
            issues. Together, we build better cities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="hover:text-white cursor-pointer">Report an Issue</li>
            <li className="hover:text-white cursor-pointer">Track Status</li>
            <li className="hover:text-white cursor-pointer">Dashboard</li>
            <li className="hover:text-white cursor-pointer">Support</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@reportify.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> +1 234 567 890
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-gray-400/40 pt-5 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Reportify — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
