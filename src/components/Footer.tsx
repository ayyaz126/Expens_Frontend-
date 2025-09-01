import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  Building2,
} from "lucide-react";
import Logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 shadow-2xl border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <img
                src={Logo}
                alt="Expense Tracker Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-indigo-400 shadow-md"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Expense Tracker
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your ultimate financial companion. Track expenses, analyze
              spending, and achieve your money goals with our intuitive
              platform.
            </p>
            <div className="flex space-x-3 pt-1">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 bg-gray-700/70 rounded-full hover:bg-indigo-500 transition-all duration-200 hover:shadow-md hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-lg font-semibold text-white border-b-2 border-indigo-500/60 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-gray-300">
              {[
                { name: "Home", href: "/" },
                { name: "Features", href: "/features" },
                { name: "Pricing", href: "/pricing" },
                { name: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="flex items-center group text-sm hover:text-indigo-300 transition-colors duration-150"
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h4 className="text-lg font-semibold text-white border-b-2 border-indigo-500/60 pb-2 inline-block">
              Contact Us
            </h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start space-x-3">
                <Phone className="flex-shrink-0 w-4 h-4 text-indigo-300 mt-1" />
                <span className="text-sm">+92 321 1234567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="flex-shrink-0 w-4 h-4 text-indigo-300 mt-1" />
                <span className="text-sm">support@expensetracker.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Building2 className="flex-shrink-0 w-4 h-4 text-indigo-300 mt-1" />
                <address className="text-sm not-italic">
                  Financial Street, Karachi, Pakistan
                </address>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h4 className="text-lg font-semibold text-white border-b-2 border-indigo-500/60 pb-2 inline-block">
              Newsletter
            </h4>
            <p className="text-gray-300 text-sm">
              Subscribe to get updates on new features and financial tips.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-white placeholder-gray-400 text-sm transition-all duration-200"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-lg font-medium text-sm hover:shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-14 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Expense Tracker. All rights
            reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-3 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-gray-300 transition-colors duration-150">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-300 transition-colors duration-150">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-gray-300 transition-colors duration-150">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}