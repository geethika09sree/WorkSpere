import React, {
  createContext,
  useContext,
  useState,
} from "react";

import { demoEmployees } from "../data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("ems_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(email, password) {
    if (password !== "admin123") {
      return {
        success: false,
        message: "Invalid password.",
      };
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ADMIN
    if (normalizedEmail === "admin@company.com") {
      const adminUser = {
        id: "admin",
        name: "Admin User",
        email: normalizedEmail,
        role: "Admin",
      };

      localStorage.setItem(
        "ems_user",
        JSON.stringify(adminUser)
      );

      setUser(adminUser);

      return { success: true };
    }

    // HR
    if (normalizedEmail === "hr@company.com") {
      const hrUser = {
        id: "hr",
        name: "HR Manager",
        email: normalizedEmail,
        role: "HR",
      };

      localStorage.setItem(
        "ems_user",
        JSON.stringify(hrUser)
      );

      setUser(hrUser);

      return { success: true };
    }

    // EMPLOYEE
    const employee = demoEmployees.find(
      (emp) =>
        emp.email.toLowerCase() === normalizedEmail
    );

    if (employee) {
      const employeeUser = {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: "Employee",
        employeeId: employee.id,
      };

      localStorage.setItem(
        "ems_user",
        JSON.stringify(employeeUser)
      );

      setUser(employeeUser);

      return { success: true };
    }

    return {
      success: false,
      message: "No account found with this email.",
    };
  }

  function logout() {
    localStorage.removeItem("ems_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}