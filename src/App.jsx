import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import { SuperAdminRoutes } from "./Routes/SuperAdminRoutes";
import Login from "./Components/Other/Login/Login";
import ErrorPage from "./Components/Other/ErrorPage/ErrorPage";
import SuperAdminLayout from "./layouts/SuperAdminLayout";
import SuperAdminProtected from "./Components/Other/ProtectedRoutes/SuperAdminProtected";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/login" element={<Login />} />

          <Route element={
            <SuperAdminProtected>
              <SuperAdminLayout />
            </SuperAdminProtected>
          }>
            {SuperAdminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ))}
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
