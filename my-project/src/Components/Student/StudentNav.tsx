import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Types/StoresContext";
//@ts-ignore
import AICElogo from "../../assets/AICElogo.jpeg"
export default function StudentNav() {
  const { logout } = useContext(UserContext);

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex py-4">
            <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold text-xl text-gray-800 flex flex-row items-center">
                <div className="h-[50px] w-[50px] overflow-hidden mr-[20px]">
                  <img src={AICElogo}></img>
                </div>
                AICE Examination System
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/student/dashboard"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/student/exams"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Exams
              </Link>
              <Link
                to="/student/results"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Results
              </Link>
              <Link
                to="/student/profile"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={() => {
                logout();
                localStorage.removeItem("studentid");
                localStorage.removeItem("studentbranch");
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
