import React from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PaymentsIcon from "@mui/icons-material/Payments";
import BusinessIcon from "@mui/icons-material/Business";

import { demoEmployees, demoLeaves, money } from "../data";

export default function Dashboard() {
  const employees =
    JSON.parse(
      localStorage.getItem("ems_employees")
    ) || demoEmployees;

  const leaves =
    JSON.parse(
      localStorage.getItem("ems_leaves")
    ) || demoLeaves;

  const activeEmployees =
    employees.filter(
      (employee) =>
        employee.status === "Active"
    ).length;

  const pendingLeaves =
    leaves.filter(
      (leave) =>
        leave.status === "Pending"
    ).length;

  const departments = new Set(
    employees.map(
      (employee) =>
        employee.department
    )
  ).size;

  const totalPayroll =
    employees.reduce(
      (total, employee) =>
        total + Number(employee.salary || 0),
      0
    );

  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      icon: <PeopleIcon />,
      color: "#1E3A8A",
      background: "#E8EEFF",
    },

    {
      title: "Active Employees",
      value: activeEmployees,
      icon: <PeopleIcon />,
      color: "#15803D",
      background: "#E9F8EF",
    },

    {
      title: "Pending Leaves",
      value: pendingLeaves,
      icon: <EventNoteIcon />,
      color: "#800020",
      background: "#F9E9EE",
    },

    {
      title: "Departments",
      value: departments,
      icon: <BusinessIcon />,
      color: "#1E3A8A",
      background: "#E8EEFF",
    },
  ];

  return (
    <>
      {/* PAGE HEADER */}

      <Box mb={4}>
        <Typography className="page-title">
          Welcome to WorkSphere 👋
        </Typography>

        <Typography className="page-subtitle">
          Here's what's happening across your
          workforce today.
        </Typography>
      </Box>

      {/* STAT CARDS */}

      <Grid
        container
        spacing={3}
        mb={3}
      >
        {stats.map((stat) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={stat.title}
          >
            <Card className="stat-card">
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mb={1}
                    >
                      {stat.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={700}
                    >
                      {stat.value}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: stat.color,
                      backgroundColor:
                        stat.background,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* LOWER CARDS */}

      <Grid
        container
        spacing={3}
      >
        {/* PAYROLL */}

        <Grid
          item
          xs={12}
          md={6}
        >
          <Card className="dashboard-card">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E8EEFF",
                    color: "#1E3A8A",
                  }}
                >
                  <PaymentsIcon />
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Monthly Payroll
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total employee salary
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h4"
                fontWeight={800}
                color="#1E3A8A"
              >
                {money(totalPayroll)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* WORKFORCE */}

        <Grid
          item
          xs={12}
          md={6}
        >
          <Card className="dashboard-card">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 45,
                    height: 45,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F9E9EE",
                    color: "#800020",
                  }}
                >
                  <PeopleIcon />
                </Box>

                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    Workforce Overview
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Current active workforce
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h4"
                fontWeight={800}
                color="#800020"
              >
                {activeEmployees}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                active employees
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}