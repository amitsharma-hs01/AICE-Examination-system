import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import useFeedback from "../Student/useFeedback";

type Feedbacks = {
  _id: string;
  feedback: string;
};

interface Faculty {
  facultyName: string;
  facultyEmail: string;
  facultyId:string;
  id:string
}

export default function FacultyFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>([]);
  const [faculty] = useFeedback();
  const [error, setError] = useState("");
  const [selectedFaculty,setSelectedFaculty]=useState<Faculty|undefined>()



  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFaculty) {
      setError("Faculty name is required");
      return;
    }
    axios
      .post(`http://localhost:8088/user/feedback`,{
        facultyId:selectedFaculty.facultyId
      })
      .then((response: AxiosResponse<Feedbacks[]>) => {
        setFeedbacks(response.data);
        setError("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFacultyId = event.target.value;
    
    const selectedFaculty = faculty?.find((fac) =>{
      console.log("fac id",fac.id)
      console.log("selected id",selectedFacultyId)
      return fac.id === selectedFacultyId});
    if (selectedFaculty) {
      setSelectedFaculty(selectedFaculty);
    } else {
      setSelectedFaculty(undefined);
      setError("Faculty name is required");
    }
  };

  useEffect(()=>{
   console.log("selected--->",selectedFaculty)
  },[selectedFaculty])

  return (
    <>
      <AdminNav />
      <div className="flex flex-col justify-center items-center my-10 ">
        <div className="bg-white shadow-md rounded-lg w-full max-w-2xl">
          <div className="py-4 px-8">
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
                  value={selectedFaculty?.id}
                  onChange={handleSelectChange}
                  className={`border border-gray-400 rounded w-full py-2 px-3`}
                >
                  <option value="">Select a faculty member</option>
                  {faculty &&
                    faculty.map((option, index) => (
                      <option key={index} value={option.id}>
                        {option.facultyName}
                      </option>
                    ))}
                </select>
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
                >
                  Get Feedbacks
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 place-items-center py-10  mx-auto ">
        <h1 className="text-2xl">{"Student Feedbacks"}</h1>
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white rounded-lg shadow-lg w-1/2 p-6"
            >
              <p className="text-gray-700 font-medium">{feedback.feedback}</p>
              <p className="text-green-500">-- Student feedback</p>
            </div>
          ))
        ) : (
          <div>No Feedbacks Available</div>
        )}
      </div>
    </>
  );
}
