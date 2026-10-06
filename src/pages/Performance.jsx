import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";

import { demoEmployees, demoPerformance } from "../data";

export default function Performance() {
  const employees =
    JSON.parse(
      localStorage.getItem("ems_employees")
    ) || demoEmployees;

  const [reviews, setReviews] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "ems_performance"
          )
        ) || demoPerformance
      );
    });

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState({
      employeeName:
        employees[0]?.name || "",
      rating: 4,
      comments: "",
    });

  useEffect(() => {
    localStorage.setItem(
      "ems_performance",
      JSON.stringify(reviews)
    );
  }, [reviews]);

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

  function addReview() {
    if (!form.employeeName) {
      return;
    }

    const newReview = {
      id:
        reviews.length > 0
          ? Math.max(
              ...reviews.map(
                (review) =>
                  review.id
              )
            ) + 1
          : 1,

      employeeName:
        form.employeeName,

      rating: Number(
        form.rating
      ),

      comments:
        form.comments,

      date: new Date()
        .toISOString()
        .slice(0, 10),
    };

    setReviews((prev) => [
      ...prev,
      newReview,
    ]);

    setOpen(false);

    setForm({
      employeeName:
        employees[0]?.name || "",
      rating: 4,
      comments: "",
    });
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
            Performance
          </Typography>

          <Typography className="page-subtitle">
            Review and track employee performance.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Review
        </Button>
      </Box>

      {/* REVIEWS */}

      <Stack spacing={2}>
        {reviews.map((review) => (
          <Card
            key={review.id}
            className="dashboard-card"
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    {review.employeeName}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >
                    {review.date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems:
                      "center",
                    gap: 1,
                  }}
                >
                  <StarIcon
                    sx={{
                      color: "#800020",
                    }}
                  />

                  <Typography fontWeight={700}>
                    {review.rating}/5
                  </Typography>
                </Box>
              </Box>

              <Rating
                value={Number(
                  review.rating
                )}
                readOnly
                sx={{
                  mt: 1,
                  "& .MuiRating-iconFilled":
                    {
                      color: "#800020",
                    },
                }}
              />

              {review.comments && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={1}
                >
                  {review.comments}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* ADD REVIEW */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Add Performance Review
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
            SelectProps={{
              native: true,
            }}
          >
            {employees.map(
              (employee) => (
                <option
                  key={employee.id}
                  value={employee.name}
                >
                  {employee.name}
                </option>
              )
            )}
          </TextField>

          <Box mt={2}>
            <Typography
              variant="body2"
              color="text.secondary"
              mb={1}
            >
              Rating
            </Typography>

            <Rating
              value={Number(
                form.rating
              )}
              onChange={(_, value) =>
                setForm((prev) => ({
                  ...prev,
                  rating:
                    value || 1,
                }))
              }
              sx={{
                "& .MuiRating-iconFilled":
                  {
                    color: "#800020",
                  },
              }}
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comments"
            name="comments"
            value={form.comments}
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
            onClick={addReview}
          >
            Save Review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}