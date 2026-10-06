import React, {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  Box,
  Button,
  Card,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  const { user, login } = useAuth();

  const [email, setEmail] =
    useState("admin@company.com");

  const [password, setPassword] =
    useState("admin123");

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const result = login(
      email,
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/");
  }

  return (
    <Box className="login-container">
      <Card className="login-card">

        {/* BRAND */}

        <Box
          textAlign="center"
          mb={4}
        >
          <Typography className="login-logo">
            Work<span>Sphere</span>
          </Typography>

          <Typography className="login-tagline">
            Smart Workforce Management
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          mb={1}
        >
          Welcome back
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Sign in to access your workspace
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Email address"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            margin="normal"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.4,
              fontSize: "15px",
            }}
          >
            Sign in to WorkSphere
          </Button>
        </Box>

        {/* DEMO ACCOUNTS */}

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "#F5F6FA",
            border:
              "1px solid #E5E7EB",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            display="block"
            mb={1}
          >
            Demo Accounts
          </Typography>

          <Typography
            variant="caption"
            display="block"
          >
            <strong>Admin:</strong>{" "}
            admin@company.com
          </Typography>

          <Typography
            variant="caption"
            display="block"
          >
            <strong>HR:</strong>{" "}
            hr@company.com
          </Typography>

          <Typography
            variant="caption"
            display="block"
          >
            <strong>Employee:</strong>{" "}
            rahul@worksphere.com
          </Typography>

          <Typography
            variant="caption"
            display="block"
            color="#800020"
            mt={1}
          >
            Password: admin123
          </Typography>
        </Box>

      </Card>
    </Box>
  );
}