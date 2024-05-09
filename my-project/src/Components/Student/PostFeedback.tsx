import axios from "axios";
import { useState } from "react";
import useFeedback from "./useFeedback";
import StudentNav from "./StudentNav";
import { AxiosOkRes } from "../../Types/FormDataTypes";

interface Feedback {
  facultyName: string;
  feedback: string;
  facultyId: string;
}

function PostFeedback() {
  const [faculty] = useFeedback();
  const [formData, setFormData] = useState<Feedback>({
    facultyName: "",
    feedback: "",
    facultyId: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.facultyName) {
      errors.facultyName = "Faculty name is required";
    }
    if (!formData.feedback) {
      errors.feedback = "Feedback message is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const selectedFaculty = faculty?.find((fac) => fac.facultyName === formData.facultyName);
    if (!selectedFaculty) {
      setErrors({ ...errors, facultyName: "Invalid faculty selected" });
      return;
    }
  
    try {
      const response: AxiosOkRes = await axios.post(
        "http://localhost:8088/user/post/feedback",
        {
          ...formData,
          facultyId: selectedFaculty.facultyId // Include facultyId in the request data
        }
      );
      console.log(response.data);
      alert(response.data.message);
      setFormData({ facultyName: "", feedback: "", facultyId: "" });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <StudentNav />
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-b from-gray-200 to-gray-200">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
          <div className="py-4 px-8">
            <div className="mb-4">
              <h2 className="text-center text-3xl font-bold text-gray-800">
                Submit Feedback
              </h2>
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="faculty"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Faculty
                </label>
                <select
                  id="facultyName"
                  name="facultyName"
                  value={formData.facultyName}
                  onChange={handleInputChange}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.facultyName ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Select a faculty member</option>
                  {faculty &&
                    faculty.map((option, index) => (
                      <option key={index} value={option.facultyName}>
                        {option.facultyName}
                      </option>
                    ))}
                </select>
                {errors.facultyName && (
                  <p className="text-red-500 mt-2">{errors.facultyName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleInputChange}
                  className={`border border-gray-400 rounded w-full py-2 px-3 ${
                    errors.feedback ? "border-red-500" : ""
                  }`}
                />
                {errors.feedback && (
                  <p className="text-red-500 mt-2">{errors.feedback}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostFeedback;
