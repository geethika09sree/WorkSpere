import React from "react";

import {
  Box,
  Card,
  Chip,
  Rating,
  Typography,
} from "@mui/material";

import { useAuth } from "../Context/AuthContext";


export default function MyPerformance() {

  const { user } = useAuth();

  const performance =
    JSON.parse(
      localStorage.getItem("ems_performance")
    ) || [];


  const myReviews =
    performance.filter(
      (review) =>
        String(review.employeeId) ===
          String(user.employeeId) ||
        review.employeeName === user.name ||
        review.email === user.email
    );


  return (
    <Box className="page-container">

      <Typography className="page-title">
        My Performance
      </Typography>

      <Typography className="page-subtitle">
        View performance reviews and feedback
        from HR.
      </Typography>


      {myReviews.length === 0 ? (

        <Card
          sx={{
            p: 5,
            borderRadius: 3,
            textAlign: "center",
          }}
        >

          <Typography
            variant="h6"
            fontWeight={700}
            mb={1}
          >
            No performance reviews yet
          </Typography>

          <Typography color="text.secondary">
            Your HR performance reviews will
            appear here.
          </Typography>

        </Card>

      ) : (

        myReviews
          .slice()
          .reverse()
          .map((review) => (

            <Card
              key={review.id}
              sx={{
                p: 3,
                borderRadius: 3,
                mb: 2,
              }}
            >

              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "flex-start",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >

                <Box>

                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    HR Performance Review
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {review.date}
                  </Typography>

                </Box>


                <Chip
                  label={`${review.rating}/5`}
                  sx={{
                    backgroundColor:
                      "#F9E9EE",
                    color: "#800020",
                    fontWeight: 700,
                  }}
                />

              </Box>


              <Box sx={{ mt: 2 }}>

                <Rating
                  value={Number(
                    review.rating
                  )}
                  readOnly
                />

              </Box>


              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  backgroundColor: "#F8FAFC",
                  borderRadius: 2,
                }}
              >

                <Typography
                  variant="body2"
                  fontWeight={700}
                  mb={0.5}
                >
                  HR Feedback
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {review.comments ||
                    "No comments provided."}
                </Typography>

              </Box>

            </Card>

          ))

      )}

    </Box>
  );
}