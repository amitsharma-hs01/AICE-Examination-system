import classNames from "classnames";
import { Link } from "react-router-dom";
interface Props {
  subjectID: string;
  subjectName: string;
  duration: number;
  totalQuestions: number;
  marks: number;
  score: number;
  timeTaken: number;
  facultyName: string;
}
export default function ScoreCard({
  subjectID,
  subjectName,
  duration,
  totalQuestions,
  score,
  timeTaken,
}: Props) {
  // const [studentID] = useState(localStorage.getItem("studentid"));
  // const [resultSubmited, setResultSubmited] = useState(false);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;


  // 
  

  
  // if (resultSubmited) {
  //   return <Navigate to="/student/dashboard" />;
  // }

  return (
    <div
      className={classNames(
        "bg-gradient-to-br",
        "from-purple-500",
        "to-pink-500",
        "h-screen"
      )}
    >
      <div
        className={classNames(
          "flex",
          "justify-center",
          "items-center",
          "h-full"
        )}
      >
        <div
          className={classNames(
            "quiz-container",
            "bg-white",
            "p-4",
            "shadow-md",
            "rounded-lg",
            "w-1/3"
          )}
        >
          <h1
            className={classNames(
              "text-2xl",
              "font-bold",
              "text-center",
              "mb-6",
              "text-gray-800"
            )}
          >
            Exam Result
          </h1>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Subject ID: {subjectID}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Subject: {subjectName}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Time: {duration / 60} Minutes
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Total Questions: {totalQuestions}
          </div>
          <div
            className={classNames(
              "text-gray-800",
              "font-medium",
              "text-lg",
              "mb-2"
            )}
          >
            Time Taken: {minutes}:{seconds} Minutes
          </div>
          <div
            className={classNames("text-gray-800", "font-medium", "text-lg")}
          >
            <h2
              className={classNames(
                "text-3xl",
                "font-bold",
                "text-center",
                "mt-8",
                "mb-4"
              )}
            >
              Your score is: {score}
            </h2>
            <div className={classNames("text-center", "my-4")}>
              <Link to={"/student/dashboard"}>
              <button
                className={classNames(
                  "bg-blue-500",
                  "text-white",
                  "py-2",
                  "px-4",
                  "rounded-md",
                  "hover:bg-blue-600"
                )}
              >
                Dashboard
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
