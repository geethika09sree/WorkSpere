import React from "react";

import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import { useAuth } from "./Context/AuthContext";

import Layout from "./components/layout";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/payroll";
import Performance from "./pages/performance";
import Settings from "./pages/Settings";

import MyAttendance from "./pages/MyAttendance";
import MyLeaves from "./pages/MyLeaves";
import MyPerformance from "./pages/MyPerformance";
import MyPayroll from "./pages/MyPayroll";


function Protected({
  children,
  allowedRoles,
}) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Wrong role
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
}


export default function App() {
  return (
    <Routes>

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />


      {/* MAIN APPLICATION */}
      <Route
        path="/"
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >

        {/* DASHBOARD */}
        <Route
          index
          element={<Dashboard />}
        />


        {/* =========================
            HR / ADMIN ROUTES
        ========================== */}

        <Route
          path="employees"
          element={
            <Protected
              allowedRoles={[
                "Admin",
                "HR",
              ]}
            >
              <Employees />
            </Protected>
          }
        />

        <Route
          path="attendance"
          element={
            <Protected
              allowedRoles={[
                "Admin",
                "HR",
              ]}
            >
              <Attendance />
            </Protected>
          }
        />

        <Route
          path="leaves"
          element={
            <Protected
              allowedRoles={[
                "Admin",
                "HR",
              ]}
            >
              <Leaves />
            </Protected>
          }
        />

        <Route
          path="payroll"
          element={
            <Protected
              allowedRoles={[
                "Admin",
                "HR",
              ]}
            >
              <Payroll />
            </Protected>
          }
        />

        <Route
          path="performance"
          element={
            <Protected
              allowedRoles={[
                "Admin",
                "HR",
              ]}
            >
              <Performance />
            </Protected>
          }
        />

        <Route
          path="settings"
          element={
            <Protected
              allowedRoles={[
                "Admin",
                "HR",
              ]}
            >
              <Settings />
            </Protected>
          }
        />


        {/* =========================
            EMPLOYEE ROUTES
        ========================== */}

        <Route
          path="my-attendance"
          element={
            <Protected
              allowedRoles={[
                "Employee",
              ]}
            >
              <MyAttendance />
            </Protected>
          }
        />

        <Route
          path="my-leaves"
          element={
            <Protected
              allowedRoles={[
                "Employee",
              ]}
            >
              <MyLeaves />
            </Protected>
          }
        />

        <Route
          path="my-performance"
          element={
            <Protected
              allowedRoles={[
                "Employee",
              ]}
            >
              <MyPerformance />
            </Protected>
          }
        />

        <Route
          path="my-payroll"
          element={
            <Protected
              allowedRoles={[
                "Employee",
              ]}
            >
              <MyPayroll />
            </Protected>
          }
        />

      </Route>


      {/* UNKNOWN URL */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}