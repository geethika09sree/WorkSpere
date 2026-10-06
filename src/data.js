export const demoEmployees = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@worksphere.com",
    phone: "9876543210",
    department: "Engineering",
    designation: "Software Engineer",
    salary: 65000,
    joiningDate: "2024-06-10",
    status: "Active",
  },

  {
    id: 2,
    name: "Priya Reddy",
    email: "priya@worksphere.com",
    phone: "9876543211",
    department: "Human Resources",
    designation: "HR Executive",
    salary: 55000,
    joiningDate: "2023-08-15",
    status: "Active",
  },

  {
    id: 3,
    name: "Arjun Kumar",
    email: "arjun@worksphere.com",
    phone: "9876543212",
    department: "Finance",
    designation: "Accountant",
    salary: 50000,
    joiningDate: "2022-03-20",
    status: "Active",
  },

  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha@worksphere.com",
    phone: "9876543213",
    department: "Marketing",
    designation: "Marketing Executive",
    salary: 48000,
    joiningDate: "2024-01-12",
    status: "Active",
  },
];

export const demoAttendance = [];

export const demoLeaves = [
  {
    id: 1,
    employeeName: "Rahul Sharma",
    type: "Casual Leave",
    from: "2026-10-10",
    to: "2026-10-12",
    reason: "Personal work",
    status: "Pending",
  },
];

export const demoPerformance = [
  {
    id: 1,
    employeeName: "Rahul Sharma",
    rating: 4,
    comments:
      "Good technical performance.",
    date: "2026-09-15",
  },
];

export function money(value) {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(value || 0);
}