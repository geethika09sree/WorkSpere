import React, { useEffect, useState } from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Delete,
  Edit,
  Search,
  Visibility,
} from "@mui/icons-material";

import { demoEmployees, money } from "../data";

const emptyEmployee = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  salary: "",
  joiningDate: "",
  status: "Active",
};

export default function Employees() {
  const [employees, setEmployees] = useState(
    () => {
      return (
        JSON.parse(
          localStorage.getItem("ems_employees")
        ) || demoEmployees
      );
    }
  );

  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [viewOpen, setViewOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [selectedEmployee, setSelectedEmployee] =
    useState(null);

  const [form, setForm] =
    useState(emptyEmployee);

  useEffect(() => {
    localStorage.setItem(
      "ems_employees",
      JSON.stringify(employees)
    );
  }, [employees]);

  function openAdd() {
    setEditingId(null);
    setForm(emptyEmployee);
    setDialogOpen(true);
  }

  function openEdit(employee) {
    setEditingId(employee.id);
    setForm(employee);
    setDialogOpen(true);
  }

  function openView(employee) {
    setSelectedEmployee(employee);
    setViewOpen(true);
  }

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

  function handleSave() {
    if (!form.name || !form.email) {
      return;
    }

    if (editingId) {
      setEmployees((prev) =>
        prev.map((employee) =>
          employee.id === editingId
            ? {
                ...form,
                id: editingId,
                salary: Number(
                  form.salary || 0
                ),
              }
            : employee
        )
      );
    } else {
      const ids = employees.map(
        (employee) => employee.id
      );

      const newId =
        ids.length > 0
          ? Math.max(...ids) + 1
          : 1;

      setEmployees((prev) => [
        ...prev,
        {
          ...form,
          id: newId,
          salary: Number(
            form.salary || 0
          ),
        },
      ]);
    }

    setDialogOpen(false);
  }

  function handleDelete(id) {
    if (
      window.confirm(
        "Are you sure you want to delete this employee?"
      )
    ) {
      setEmployees((prev) =>
        prev.filter(
          (employee) =>
            employee.id !== id
        )
      );
    }
  }

  const filteredEmployees =
    employees.filter((employee) => {
      const query =
        search.toLowerCase();

      return (
        employee.name
          .toLowerCase()
          .includes(query) ||
        employee.email
          .toLowerCase()
          .includes(query) ||
        employee.department
          .toLowerCase()
          .includes(query) ||
        employee.designation
          .toLowerCase()
          .includes(query)
      );
    });

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
            Employees
          </Typography>

          <Typography className="page-subtitle">
            Manage your workforce and employee
            information.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openAdd}
        >
          Add Employee
        </Button>
      </Box>

      {/* SEARCH */}

      <Card className="table-container">
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search employees..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search
                    sx={{
                      color: "#1E3A8A",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
            }}
          />

          {/* EMPLOYEE LIST */}

          <Stack spacing={1}>
            {filteredEmployees.map(
              (employee) => (
                <Box
                  key={employee.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    p: 2,
                    borderRadius: 2,
                    border:
                      "1px solid #E5E7EB",

                    "&:hover": {
                      backgroundColor:
                        "#FAFBFF",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius:
                          "50%",
                        background:
                          "linear-gradient(135deg, #1E3A8A, #800020)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        fontWeight: 700,
                      }}
                    >
                      {employee.name
                        .charAt(0)
                        .toUpperCase()}
                    </Box>

                    <Box>
                      <Typography
                        fontWeight={700}
                      >
                        {employee.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {
                          employee.designation
                        }
                        {" • "}
                        {
                          employee.department
                        }
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {
                          employee.email
                        }
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <IconButton
                      onClick={() =>
                        openView(employee)
                      }
                      sx={{
                        color: "#1E3A8A",
                      }}
                    >
                      <Visibility />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        openEdit(employee)
                      }
                      sx={{
                        color: "#800020",
                      }}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleDelete(
                          employee.id
                        )
                      }
                      sx={{
                        color: "#B91C1C",
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              )
            )}

            {filteredEmployees.length ===
              0 && (
              <Alert severity="info">
                No employees found.
              </Alert>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* ADD / EDIT DIALOG */}

      <Dialog
        open={dialogOpen}
        onClose={() =>
          setDialogOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingId
            ? "Edit Employee"
            : "Add Employee"}
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Designation"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Salary"
            name="salary"
            type="number"
            value={form.salary}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Joining Date"
            name="joiningDate"
            type="date"
            value={form.joiningDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Active">
              Active
            </MenuItem>

            <MenuItem value="Inactive">
              Inactive
            </MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() =>
              setDialogOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {editingId
              ? "Save Changes"
              : "Add Employee"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIEW DIALOG */}

      <Dialog
        open={viewOpen}
        onClose={() =>
          setViewOpen(false)
        }
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Employee Details
        </DialogTitle>

        <DialogContent>
          {selectedEmployee && (
            <Stack spacing={2} mt={1}>
              <Typography>
                <strong>Name:</strong>{" "}
                {selectedEmployee.name}
              </Typography>

              <Typography>
                <strong>Email:</strong>{" "}
                {selectedEmployee.email}
              </Typography>

              <Typography>
                <strong>Phone:</strong>{" "}
                {selectedEmployee.phone}
              </Typography>

              <Typography>
                <strong>Department:</strong>{" "}
                {
                  selectedEmployee.department
                }
              </Typography>

              <Typography>
                <strong>Designation:</strong>{" "}
                {
                  selectedEmployee.designation
                }
              </Typography>

              <Typography>
                <strong>Salary:</strong>{" "}
                {money(
                  selectedEmployee.salary
                )}
              </Typography>

              <Typography>
                <strong>Joining Date:</strong>{" "}
                {
                  selectedEmployee.joiningDate
                }
              </Typography>

              <Typography>
                <strong>Status:</strong>{" "}
                {selectedEmployee.status}
              </Typography>
            </Stack>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="contained"
            onClick={() =>
              setViewOpen(false)
            }
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}