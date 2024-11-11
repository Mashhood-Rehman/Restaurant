import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const Sidebar = () => {
  return (
    <div className="w-full h-auto lg:w-1/6 lg:h-[80vh] md:w-1/4 md:mt-6 lg:mt-[5%] border-2 border-blue-700 bg-gray-100 shadow-md">
      <div className="p-6">
        <img src="logoo.jpeg" alt="Nacho Daddy" className="w-36 mx-auto mb-2" />
     
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md duration-200 ease-in-out">
              <span className="mr-2"><Icon icon="solar:user-outline" width="21" height="21" /></span> Users
            </Link>
          </li>
          <li>
            <Link to="/items" className="rounded-md duration-200 ease-in-out flex items-center p-2 text-gray-700 hover:bg-gray-200">
              <span className="mr-2"><Icon icon="solar:box-bold-duotone" width="21" height="21" /></span> Items
            </Link>
          </li>
          <li>
            <Link to="/done" className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded">
              <span className="mr-2">✅</span> Done
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
  