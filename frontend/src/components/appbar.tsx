import { useState } from 'react';
import { Link } from "react-router-dom";
import { Avatar } from "./blogCard";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "lucide-react";

export const Appbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isGuest = localStorage.getItem("guest") === "true";
  
  const handleSignOut = () => {
    localStorage.removeItem("token");
     localStorage.removeItem("guest");
    navigate('/');
  };

  return (
    <div className="border-b flex justify-between px-10 py-2">
      <div className="flex flex-col justify-center cursor-pointer">
        <Link to={"/blogs"}>Medium</Link>
      </div>

      <div className="relative flex items-center">
        {!isGuest && (
          <Link to={"/publish"}>
            <button
              type="button"
              className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center">
              New
            </button>
          </Link>
        )}

        {isGuest ? (
          <div className="flex gap-2">
            <Link to="/signin">
              <button className="text-green-700 hover:text-green-800 font-medium text-sm px-4 py-2 rounded-full border border-green-700 hover:bg-green-50">
                Sign in
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2">
                Get started
              </button>
            </Link>
          </div>
        ) : (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none rounded-full hover:shadow-md transition-shadow duration-200 group"
          >
            <Avatar name="sahil" size="big" />
          </button>
        )}

        {isOpen && !isGuest && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
            <button
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Sign out
            </button>
          </div>
        )}

        {isGuest && (
          <div className="ml-4">
            <UserIcon className="h-8 w-8 text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Appbar;