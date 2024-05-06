import axios from "axios";
import { useState } from "react";
import { IFacultyList } from "./FacultyList";

interface SubjectFormProps {
  selectedFaculty: IFacultyList | null;
  setFaculty: React.Dispatch<React.SetStateAction<IFacultyList[]>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubjectForm({
  selectedFaculty,
  setFaculty,
  setShowModal,
}: SubjectFormProps) {
  const [subjectID, setSubjectID] = useState<string>("");
  const [subjectName, setSubjectName] = useState<string>("");
  const [errors, setErrors] = useState<{ SubjectID?: string; SubjectName?: string }>({});

  console.log("selected faculty",selectedFaculty);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (selectedFaculty) {
        if (!subjectID || !subjectName) {
          setErrors({
            SubjectID: !subjectID ? "Subject ID is required" : "",
            SubjectName: !subjectName ? "Subject Name is required" : "",
          });
          return;
        }

        const response = await axios.patch(
          `http://localhost:8088/admin/add-subject/faculty/${selectedFaculty._id}`,
          { Subjects: [{ SubjectID: subjectID, SubjectName: subjectName }] }
        );
        console.log("add faculty res", response.data);
        setFaculty((prevFaculty: IFacultyList[]) =>
          prevFaculty.map((f: IFacultyList) =>
            f._id === selectedFaculty._id ? response.data : f
          )
        );
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="mb-4">
          <label htmlFor="SubjectID" className="block text-gray-700 font-bold mb-2">
            Subject ID:
          </label>
          <input
            type="text"
            id="SubjectID"
            value={subjectID}
            onChange={(e) => setSubjectID(e.target.value)}
            className={`w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.SubjectID ? "border-red-500" : ""
            }`}
          />
          {errors.SubjectID && (
            <span className="text-red-500 text-sm">{errors.SubjectID}</span>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="SubjectName" className="block text-gray-700 font-bold mb-2">
            Subject Name:
          </label>
          <input
            type="text"
            id="SubjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className={`w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
              errors.SubjectName ? "border-red-500" : ""
            }`}
          />
          {errors.SubjectName && (
            <span className="text-red-500 text-sm">{errors.SubjectName}</span>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Add Subject
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
