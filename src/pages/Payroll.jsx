import React from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import PaymentsIcon from "@mui/icons-material/Payments";

import { demoEmployees, money } from "../data";

export default function Payroll() {
  const employees =
    JSON.parse(
      localStorage.getItem("ems_employees")
    ) || demoEmployees;

  const totalPayroll =
    employees.reduce(
      (total, employee) =>
        total +
        Number(employee.salary || 0),
      0
    );

  const averageSalary =
    employees.length > 0
      ? totalPayroll / employees.length
      : 0;

  return (
    <>
      <Box mb={3}>
        <Typography className="page-title">
          Payroll
        </Typography>

        <Typography className="page-subtitle">
          View employee salary information and
          payroll overview.
        </Typography>
      </Box>

      {/* SUMMARY */}

      <Grid
        container
        spacing={3}
        mb={3}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <Card className="stat-card">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: 2,
                    backgroundColor:
                      "#E8EEFF",
                    color: "#1E3A8A",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                  }}
                >
                  <PaymentsIcon />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Total Monthly Payroll
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={800}
                    color="#1E3A8A"
                  >
                    {money(
                      totalPayroll
                    )}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
        >
          <Card className="stat-card">
            <CardContent>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Average Employee Salary
              </Typography>

              <Typography
                variant="h4"
                fontWeight={800}
                color="#800020"
                mt={1}
              >
                {money(
                  averageSalary
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* EMPLOYEE SALARIES */}

      <Card className="table-container">
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2}
          >
            Employee Salary Overview
          </Typography>

          {employees.map(
            (employee) => (
              <Box
                key={employee.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems:
                    "center",
                  py: 2,
                  borderBottom:
                    "1px solid #E5E7EB",
                }}
              >
                <Box>
                  <Typography fontWeight={700}>
                    {employee.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {
                      employee.designation
                    }
                  </Typography>
                </Box>

                <Typography
                  fontWeight={700}
                  color="#1E3A8A"
                >
                  {money(
                    employee.salary
                  )}
                </Typography>
              </Box>
            )
          )}
        </CardContent>
      </Card>
    </>
  );
}