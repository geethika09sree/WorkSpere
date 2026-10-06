import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  CheckCircle,
  Close,
  EventNote,
} from "@mui/icons-material";

import { demoEmployees, demoLeaves } from "../data";

export default function Leaves() {
  const employees =
    JSON.parse(
      localStorage.getItem("ems_employees")
    ) || demoEmployees;

  const [leaves, setLeaves] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem("ems_leaves")
        ) || demoLeaves
      );
    });

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState({
      employeeName:
        employees[0]?.name || "",
      type: "Casual Leave",
      from: "",
      to: "",
      reason: "",
    });

  useEffect(() => {
    localStorage.setItem(
      "ems_leaves",
      JSON.stringify(leaves)
    );
  }, [leaves]);

  function handleChange(event) {
    const {
      name,
      value,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function applyLeave() {
    if (
      !form.employeeName ||
      !form.from ||
      !form.to
    ) {
      return;
    }

    const newLeave = {
      id:
        leaves.length > 0
          ? Math.max(
              ...leaves.map(
                (leave) => leave.id
              )
            ) + 1
          : 1,

      ...form,

      status: "Pending",
    };

    setLeaves((prev) => [
      ...prev,
      newLeave,
    ]);

    setOpen(false);

    setForm({
      employeeName:
        employees[0]?.name || "",
      type: "Casual Leave",
      from: "",
      to: "",
      reason: "",
    });
  }

  function updateStatus(
    id,
    status
  ) {
    setLeaves((prev) =>
      prev.map((leave) =>
        leave.id === id
          ? {
              ...leave,
              status,
            }
          : leave
      )
    );
  }

  return (
    <>
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography className="page-title">
            Leave Management
          </Typography>

          <Typography className="page-subtitle">
            Apply, review and manage employee
            leave requests.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<EventNote />}
          onClick={() => setOpen(true)}
        >
          Apply Leave
        </Button>
      </Box>

      {/* LEAVE LIST */}

      <Card className="table-container">
        <CardContent>
          <Stack spacing={2}>
            {leaves.map((leave) => (
              <Box
                key={leave.id}
                sx={{
                  p: 2.5,
                  border:
                    "1px solid #E5E7EB",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    gap: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      fontWeight={700}
                    >
                      {leave.employeeName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      mt={0.5}
                    >
                      {leave.type}
                    </Typography>

                    <Typography
                      variant="body2"
                      mt={1}
                    >
                      {leave.from} →{" "}
                      {leave.to}
                    </Typography>

                    {leave.reason && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={1}
                      >
                        Reason:{" "}
                        {leave.reason}
                      </Typography>
                    )}
                  </Box>

                  <Chip
                    label={leave.status}
                    sx={{
                      backgroundColor:
                        leave.status ===
                        "Approved"
                          ? "#E9F8EF"
                          : leave.status ===
                            "Rejected"
                          ? "#FEECEC"
                          : "#F9E9EE",

                      color:
                        leave.status ===
                        "Approved"
                          ? "#15803D"
                          : leave.status ===
                            "Rejected"
                          ? "#B91C1C"
                          : "#800020",

                      fontWeight: 700,
                    }}
                  />
                </Box>

                {leave.status ===
                  "Pending" && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={
                        <CheckCircle />
                      }
                      onClick={() =>
                        updateStatus(
                          leave.id,
                          "Approved"
                        )
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      size="small"
                      variant="outlined"
                      color="secondary"
                      startIcon={
                        <Close />
                      }
                      onClick={() =>
                        updateStatus(
                          leave.id,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </Box>
            ))}

            {leaves.length === 0 && (
              <Alert severity="info">
                No leave requests found.
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* APPLY LEAVE DIALOG */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Apply for Leave
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            select
            label="Employee"
            name="employeeName"
            value={form.employeeName}
            onChange={handleChange}
            margin="normal"
          >
            {employees.map(
              (employee) => (
                <MenuItem
                  key={employee.id}
                  value={employee.name}
                >
                  {employee.name}
                </MenuItem>
              )
            )}
          </TextField>

          <TextField
            fullWidth
            select
            label="Leave Type"
            name="type"
            value={form.type}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Casual Leave">
              Casual Leave
            </MenuItem>

            <MenuItem value="Sick Leave">
              Sick Leave
            </MenuItem>

            <MenuItem value="Annual Leave">
              Annual Leave
            </MenuItem>
          </TextField>

          <TextField
            fullWidth
            type="date"
            label="From"
            name="from"
            value={form.from}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            type="date"
            label="To"
            name="to"
            value={form.to}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={applyLeave}
          >
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}