import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  CheckCircle,
  EventBusy,
  PersonOff,
} from "@mui/icons-material";

import { demoEmployees } from "../data";

function getToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function Attendance() {
  const employees =
    JSON.parse(
      localStorage.getItem("ems_employees")
    ) || demoEmployees;

  const [attendance, setAttendance] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "ems_attendance"
          )
        ) || []
      );
    });

  useEffect(() => {
    localStorage.setItem(
      "ems_attendance",
      JSON.stringify(attendance)
    );
  }, [attendance]);

  const today = getToday();

  function markAttendance(
    employee,
    status
  ) {
    const existing = attendance.find(
      (record) =>
        record.employeeId === employee.id &&
        record.date === today
    );

    const record = {
      employeeId: employee.id,
      employeeName: employee.name,
      date: today,
      status,
      checkIn:
        status === "Present"
          ? new Date().toLocaleTimeString()
          : "",
    };

    if (existing) {
      setAttendance((prev) =>
        prev.map((item) =>
          item.employeeId ===
            employee.id &&
          item.date === today
            ? record
            : item
        )
      );
    } else {
      setAttendance((prev) => [
        ...prev,
        record,
      ]);
    }
  }

  function getStatus(employeeId) {
    const record = attendance.find(
      (item) =>
        item.employeeId ===
          employeeId &&
        item.date === today
    );

    return record;
  }

  return (
    <>
      <Box mb={3}>
        <Typography className="page-title">
          Attendance
        </Typography>

        <Typography className="page-subtitle">
          Track daily employee attendance.
        </Typography>
      </Box>

      <Card className="table-container">
        <CardContent>
          <Stack spacing={1}>
            {employees.map((employee) => {
              const record =
                getStatus(employee.id);

              return (
                <Box
                  key={employee.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    flexWrap: "wrap",
                    gap: 2,
                    p: 2,
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
                      {employee.department}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {record ? (
                      <Chip
                        icon={
                          record.status ===
                          "Present" ? (
                            <CheckCircle />
                          ) : record.status ===
                            "Leave" ? (
                            <EventBusy />
                          ) : (
                            <PersonOff />
                          )
                        }
                        label={
                          record.status
                        }
                        sx={{
                          backgroundColor:
                            record.status ===
                            "Present"
                              ? "#E9F8EF"
                              : record.status ===
                                "Leave"
                              ? "#F9E9EE"
                              : "#FEECEC",

                          color:
                            record.status ===
                            "Present"
                              ? "#15803D"
                              : record.status ===
                                "Leave"
                              ? "#800020"
                              : "#B91C1C",
                        }}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Not marked
                      </Typography>
                    )}

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        markAttendance(
                          employee,
                          "Present"
                        )
                      }
                      startIcon={
                        <CheckCircle />
                      }
                    >
                      Present
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        markAttendance(
                          employee,
                          "Leave"
                        )
                      }
                    >
                      Leave
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() =>
                        markAttendance(
                          employee,
                          "Absent"
                        )
                      }
                    >
                      Absent
                    </Button>
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </CardContent>
      </Card>

      <Alert
        severity="info"
        icon={<AccessTime />}
        sx={{ mt: 2 }}
      >
        Today's attendance date:{" "}
        <strong>{today}</strong>
      </Alert>
    </>
  );
}