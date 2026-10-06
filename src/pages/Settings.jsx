import React from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import SettingsIcon from "@mui/icons-material/Settings";

import { useAuth } from "../Context/AuthContext";

export default function Settings() {
  const { user } = useAuth();

  function clearData() {
    const confirmed =
      window.confirm(
        "This will remove all locally stored employee, attendance, leave and performance data. Continue?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "ems_employees"
    );

    localStorage.removeItem(
      "ems_attendance"
    );

    localStorage.removeItem(
      "ems_leaves"
    );

    localStorage.removeItem(
      "ems_performance"
    );

    window.location.reload();
  }

  return (
    <>
      <Box mb={3}>
        <Typography className="page-title">
          Settings
        </Typography>

        <Typography className="page-subtitle">
          Manage your WorkSphere account and
          application data.
        </Typography>
      </Box>

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
                width: 48,
                height: 48,
                borderRadius: 2,
                backgroundColor: "#E8EEFF",
                color: "#1E3A8A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SettingsIcon />
            </Box>

            <Box>
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Account Information
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Your current WorkSphere account
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography mb={1}>
            <strong>Name:</strong>{" "}
            {user?.name}
          </Typography>

          <Typography mb={1}>
            <strong>Email:</strong>{" "}
            {user?.email}
          </Typography>

          <Typography>
            <strong>Role:</strong>{" "}
            {user?.role}
          </Typography>
        </CardContent>
      </Card>

      <Card
        className="dashboard-card"
        sx={{ mt: 3 }}
      >
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={1}
          >
            Local Application Data
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            mb={2}
          >
            WorkSphere currently stores demo data
            in your browser's local storage.
          </Typography>

          <Alert
            severity="warning"
            sx={{ mb: 2 }}
          >
            Clearing data will remove locally
            stored employee, attendance, leave
            and performance records.
          </Alert>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={
              <DeleteSweepIcon />
            }
            onClick={clearData}
          >
            Clear Application Data
          </Button>
        </CardContent>
      </Card>
    </>
  );
}