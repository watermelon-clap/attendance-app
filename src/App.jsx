import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css"
import LoginPage
  from "./pages/LoginPage";

import UserDashboard
  from "./pages/UserDashboard";

import AttendanceHistory
  from "./pages/AttendanceHistory";

import Broadcasts
  from "./pages/Broadcasts";

import AdminDashboard
  from "./pages/admin/AdminDashboard";

import ManageUsers
  from "./pages/admin/ManageUsers";

import PrivateRoute
  from "./routes/PrivateRoute";

import AdminRoute
  from "./routes/AdminRoute";

import AttendanceEntry
from "./pages/admin/AttendanceEntry";

import BroadcastManager
from "./pages/admin/BroadcastManager";

import SignupPage
from "./pages/SignupPage";

import HomeRedirect
from "./pages/HomeRedirect";

import Profile
from "./pages/Profile";

import AttendanceManager
from "./pages/admin/AttendanceManager";

import UnauthorizedPage
from "./pages/UnauthorizedPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomeRedirect />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/attendance-history"
          element={
            <PrivateRoute>
              <AttendanceHistory />
            </PrivateRoute>
          }
        />

        <Route
          path="/broadcasts"
          element={
            <PrivateRoute>
              <Broadcasts />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <AdminRoute>
            <AttendanceEntry />
            </AdminRoute>
          }
          />

        <Route
          path="/admin/broadcasts"
          element={
            <AdminRoute>
            <BroadcastManager />
            </AdminRoute>
          }
          />


          <Route
            path="/admin/attendance-manager"
            element={
              <AdminRoute>
                <AttendanceManager />
              </AdminRoute>
            }
          />

      </Routes>
    </BrowserRouter>
  );
}