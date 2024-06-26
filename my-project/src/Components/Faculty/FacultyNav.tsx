import { Link } from "react-router-dom";
import { FacultyContext } from "../../Types/StoresContext";
import { useContext } from "react";
//@ts-ignore
import AICELogo from "../../assets/AICELogo.jpeg"
const FacultyNav = () => {
  const { logout } = useContext(FacultyContext);

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex py-4">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src={AICELogo}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/faculty/dashboard"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/faculty/create-exam"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Add Exams
              </Link>
              <Link
                to="/faculty/results"
                className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium"
              >
                Students Results
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={() => {
                logout();
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
};

export default FacultyNav;
