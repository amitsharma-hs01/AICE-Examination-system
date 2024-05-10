import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { Navigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StudentRegForm {
  userID: string;
  userName: string;
  userEmail: string;
  userBranch: string;
  userNumber: string;
  userPassword: string;
  confirmPassword: string;
}

export default function StudentReg() {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState<StudentRegForm>({
    userID: "",
    userName: "",
    userEmail: "",
    userBranch: "",
    userNumber: "",
    userPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<Record<keyof StudentRegForm, string>>({
    userID: "",
    userName: "",
    userEmail: "",
    userBranch: "",
    userNumber: "",
    userPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Partial<typeof errors> = {};

    Object.keys(formData).forEach((key) => {
      const fieldName = key as keyof StudentRegForm;
      if (!formData[fieldName]) {
        newErrors[fieldName] = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
        isValid = false;
      } else {
        newErrors[fieldName] = "";
      }
    });

    if (formData.userPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors as typeof errors);
    return isValid;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      axios
        .post("http://localhost:8088/user/register", formData)
        .then((response) => {
          toast.success("Registration Successfull"); // Display success toast
          setRegistered(true);
        })
        .catch((error: AxiosError) => {
          if (error.response) {
            const errorRes = error.response.data as { message: string };
            handleBackendErrors(errorRes);
          } else {
            alert("Something went wrong");
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const handleBackendErrors = (errorRes: { message: string }) => {
    const { message } = errorRes;
    switch (message) {
      case "Email already exists":
        setErrors({ ...errors, userEmail: "Email already exists" });
        break;
      case "Password MisMacth":
        setErrors({ ...errors, confirmPassword: "Passwords do not match" });
        break;
      default:
        alert("An error occurred");
        break;
    }
  };

  if (registered) {
    return <Navigate to="/student/login" />;
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <form
        onSubmit={onSubmit}
        className="max-w-sm mx-auto mt-8 bg-white rounded-lg shadow-md p-6"
      >
        <div className="mb-4">
          <label htmlFor="userID" className="block text-gray-700 font-bold mb-2">
            User ID
          </label>
          <input
            type="text"
            id="userID"
            value={formData.userID}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userID ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userID && <span className="text-red-500">{errors.userID}</span>}
        </div>
        
<div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 font-bold mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            value={formData.userName}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userName && <span className="text-red-500">{errors.userName}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 font-bold mb-2">
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userEmail ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userEmail && <span className="text-red-500">{errors.userEmail}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="userBranch" className="block text-gray-700 font-bold mb-2">
            User Branch
          </label>
          <select
            id="userBranch"
            value={formData.userBranch}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userBranch ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select a branch</option>
            <option value="Computer Science and Engineering">
              Computer Science and Engineering
            </option>
            <option value="Electronics and Communication Engineering">
              Electronics and Communication Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
          </select>
          {errors.userBranch && <span className="text-red-500">{errors.userBranch}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="userNumber" className="block text-gray-700 font-bold mb-2">
            Mobile Number
          </label>
          <input
            type="text"
            id="userNumber"
            value={formData.userNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userNumber && <span className="text-red-500">{errors.userNumber}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="userPassword" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.userPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.userPassword && <span className="text-red-500">{errors.userPassword}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
        </div>
        <button
          type="submit"
          className={`w-full p-2 mt-4 bg-blue-500 text-white rounded ${
            loading ? "cursor-wait" : "hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
        <div className="flex justify-between mt-4 text-sm">
          <Link to="/student/login" className="text-blue-500">
            Existing User? Login
          </Link>
        </div>
      </form>
    </div>
  );
}












