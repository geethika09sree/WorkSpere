import React from "react";

import {
  Box,
  Card,
  Chip,
  Grid,
  Typography,
} from "@mui/material";

import {
  AccessTime,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

import { useAuth } from "../Context/AuthContext";


export default function MyAttendance() {

  const { user } = useAuth();

  const attendance =
    JSON.parse(
      localStorage.getItem("ems_attendance")
    ) || [];


  const myAttendance =
    attendance.filter(
      (record) =>
        String(record.employeeId) ===
          String(user.employeeId) ||
        record.employeeName === user.name ||
        record.email === user.email
    );


  const presentCount =
    myAttendance.filter(
      (item) => item.status === "Present"
    ).length;


  const absentCount =
    myAttendance.filter(
      (item) => item.status === "Absent"
    ).length;


  const leaveCount =
    myAttendance.filter(
      (item) => item.status === "Leave"
    ).length;


  return (
    <Box className="page-container">

      <Typography className="page-title">
        My Attendance
      </Typography>

      <Typography className="page-subtitle">
        View your attendance records and
        attendance status.
      </Typography>


      {/* SUMMARY */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >

        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >

            <CheckCircle
              sx={{
                color: "#16A34A",
                mb: 1,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={800}
            >
              {presentCount}
            </Typography>

            <Typography color="text.secondary">
              Present
            </Typography>

          </Card>
        </Grid>


        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >

            <Cancel
              sx={{
                color: "#DC2626",
                mb: 1,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={800}
            >
              {absentCount}
            </Typography>

            <Typography color="text.secondary">
              Absent
            </Typography>

          </Card>
        </Grid>


        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >

            <AccessTime
              sx={{
                color: "#800020",
                mb: 1,
              }}
            />

            <Typography
              variant="h4"
              fontWeight={800}
            >
              {leaveCount}
            </Typography>

            <Typography color="text.secondary">
              Leave
            </Typography>

          </Card>
        </Grid>

      </Grid>


      {/* HISTORY */}

      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >

        <Box sx={{ p: 3 }}>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Attendance History
          </Typography>

        </Box>


        {myAttendance.length === 0 ? (

          <Box
            sx={{
              p: 5,
              textAlign: "center",
            }}
          >

            <Typography color="text.secondary">
              No attendance has been marked yet.
            </Typography>

          </Box>

        ) : (

          myAttendance
            .slice()
            .reverse()
            .map((record, index) => (

              <Box
                key={record.id || index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  borderTop:
                    "1px solid #E5E7EB",
                }}
              >

                <Box>

                  <Typography
                    fontWeight={600}
                  >
                    {record.date}
                  </Typography>

                  {record.employeeName && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      {record.employeeName}
                    </Typography>
                  )}

                </Box>


                <Chip
                  label={
                    record.status || "Unknown"
                  }
                  color={
                    record.status ===
                    "Present"
                      ? "success"
                      : record.status ===
                        "Absent"
                      ? "error"
                      : "warning"
                  }
                  size="small"
                />

              </Box>

            ))

        )}

      </Card>

    </Box>
  );
}