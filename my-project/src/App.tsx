import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminProvider,
  FacultyProvider,
  UserProvider,
} from "./Types/StoresContext";
import PublicRouteConfig from "./Routes/PublicRoutes";
import AdminRoutesConfig from "./Routes/AdminRoutes";
import FacultyRoutesConfig from "./Routes/FacultyRoutes";
import StudentRoutesConfig from "./Routes/StudentRoutes";
import useFaculty from "./Components/Faculty/useFaculty";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <FacultyProvider>
        <AdminProvider>
          <ToastContainer/>
          <BrowserRouter>
            <Routes>
              <Route path="/*" element={<PublicRouteConfig />} />
              <Route path="/admin/*" element={<AdminRoutesConfig />} />
              <Route path="/faculty/*" element={<FacultyRoutesConfig />} />
              <Route path="/student/*" element={<StudentRoutesConfig />} />
              {/* <PublicRouteConfig />
              <AdminRoutesConfig />
              <FacultyRoutesConfig />
              <StudentRoutesConfig /> */}
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </FacultyProvider>
    </UserProvider>
  );
}

export default App;
