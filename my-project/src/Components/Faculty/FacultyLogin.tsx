import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { FacultyContext } from "../../Types/StoresContext";
import { ResponseToken } from "../../Types/FormDataTypes";



export default function FacultyLogin() {
  const { facultyToken, login } = useContext(FacultyContext);
  const [facultyEmail, setFacultyEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const handleFacultyEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFacultyEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    axios
      .post("http://localhost:8088/faculty/login", { facultyEmail, password })
      .then((res: AxiosResponse<ResponseToken>) => {
        if (res.data.token) {
          login(res.data.token);
        }
      })
      .catch((error: unknown) => {
        const axiosError = error as AxiosError;
        const responseData:any =
          axiosError?.response?.data ?? { message: "Unknown error occurred" }; 
        setLoginError(responseData.message); 
        console.log(responseData.message); 
      });
  };

  if (facultyToken) {
    return <Navigate to="/faculty/dashboard" />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={onSubmit}
        className="bg-white p-10 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Faculty Login
        </h2>
        {loginError && (
          <p className="text-red-500 mb-4 text-center">{loginError}</p>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="facultyEmail"
          >
            Faculty Email
          </label>
          <input
            value={facultyEmail}
            onChange={handleFacultyEmailChange}
            className="border rounded-lg px-3 py-2 w-full"
            type="email"
            id="facultyEmail"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={handlePasswordChange}
            className="border rounded-lg px-3 py-2 w-full"
            type="password"
            id="password"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 w-full"
        >
          Login
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/faculty/register" className="text-blue-500">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
}
