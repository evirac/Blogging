import React from "react";
import { ChevronDown, Search, User } from "lucide-react";
import "../sass/Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="flex items-center space-x-4"></div>

      <div className=" flex items-center space-x-4">
        <div className="relative">
          <button
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md text-gray-600"
            disabled
          >
            <span>Afterglow</span>
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="relative">
          <span className="mr-2 text-gray-600">Scenario</span>
          <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-md text-gray-600">
            <span>Default</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="text-gray-600" size={24} />
          </div>
          <div>
            <p className="font-medium">Robert Fox</p>
            <p className="text-sm text-gray-600">Finance Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
