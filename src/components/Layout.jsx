import React, { useState } from "react";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AccessTime as AccessTimeIcon,
  EventNote as EventNoteIcon,
  Payments as PaymentsIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import {
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "../Context/AuthContext";


const drawerWidth = 250;


export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);


  // =====================================================
  // CHECK USER ROLE
  // =====================================================

  const isEmployee = user?.role === "Employee";


  // =====================================================
  // HR / ADMIN MENU
  // =====================================================

  const managementMenu = [
    {
      text: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      text: "Employees",
      path: "/employees",
      icon: <PeopleIcon />,
    },
    {
      text: "Attendance",
      path: "/attendance",
      icon: <AccessTimeIcon />,
    },
    {
      text: "Leaves",
      path: "/leaves",
      icon: <EventNoteIcon />,
    },
    {
      text: "Payroll",
      path: "/payroll",
      icon: <PaymentsIcon />,
    },
    {
      text: "Performance",
      path: "/performance",
      icon: <AssessmentIcon />,
    },
    {
      text: "Settings",
      path: "/settings",
      icon: <SettingsIcon />,
    },
  ];


  // =====================================================
  // EMPLOYEE MENU
  // =====================================================

  const employeeMenu = [
    {
      text: "Dashboard",
      path: "/",
      icon: <DashboardIcon />,
    },
    {
      text: "My Attendance",
      path: "/my-attendance",
      icon: <AccessTimeIcon />,
    },
    {
      text: "My Leaves",
      path: "/my-leaves",
      icon: <EventNoteIcon />,
    },
    {
      text: "My Performance",
      path: "/my-performance",
      icon: <AssessmentIcon />,
    },
    {
      text: "My Payroll",
      path: "/my-payroll",
      icon: <PaymentsIcon />,
    },
  ];


  // =====================================================
  // SELECT CORRECT MENU
  // =====================================================

  const menuItems = isEmployee
    ? employeeMenu
    : managementMenu;


  // =====================================================
  // NAVIGATION
  // =====================================================

  function handleNavigation(path) {
    navigate(path);

    // Close mobile drawer
    setMobileOpen(false);
  }


  // =====================================================
  // LOGOUT
  // =====================================================

  function handleLogout() {
    setAnchorEl(null);

    logout();

    navigate("/login");
  }


  // =====================================================
  // SIDEBAR CONTENT
  // =====================================================

  const drawer = (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
      }}
    >

      {/* =================================================
          LOGO
      ================================================= */}

      <Box
        sx={{
          height: 82,
          minHeight: 82,
          display: "flex",
          alignItems: "center",
          px: 3,
        }}
      >

        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-1px",
            color: "#1E3A8A",
          }}
        >
          Work
          <span
            style={{
              color: "#800020",
            }}
          >
            Sphere
          </span>
        </Typography>

      </Box>


      <Divider />


      {/* =================================================
          ROLE INFORMATION
      ================================================= */}

      <Box
        sx={{
          px: 3,
          py: 2.5,
        }}
      >

        <Typography
          variant="caption"
          sx={{
            color: "#64748B",
            fontSize: 13,
          }}
        >
          Logged in as
        </Typography>


        <Typography
          sx={{
            color: "#1E3A8A",
            fontSize: 20,
            fontWeight: 700,
            mt: 0.3,
          }}
        >
          {user?.role}
        </Typography>

      </Box>


      <Divider />


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <List
        sx={{
          px: 1.5,
          py: 2,
          flexGrow: 1,
        }}
      >

        {menuItems.map((item) => {

          const selected =
            location.pathname === item.path;


          return (
            <ListItemButton
              key={item.text}
              selected={selected}
              onClick={() =>
                handleNavigation(item.path)
              }
              sx={{
                minHeight: 52,
                borderRadius: 2,
                mb: 0.7,
                px: 2,

                color: selected
                  ? "#1E3A8A"
                  : "#172033",

                "&.Mui-selected": {
                  backgroundColor: "#E8EEFF",
                },

                "&.Mui-selected:hover": {
                  backgroundColor: "#DDE6FF",
                },

                "&:hover": {
                  backgroundColor: "#F5F7FB",
                },
              }}
            >

              <ListItemIcon
                sx={{
                  minWidth: 42,

                  color: selected
                    ? "#800020"
                    : "#64748B",
                }}
              >
                {item.icon}
              </ListItemIcon>


              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: selected
                    ? 700
                    : 500,
                }}
              />

            </ListItemButton>
          );

        })}

      </List>


      {/* =================================================
          USER PROFILE AT BOTTOM
      ================================================= */}

      <Box
        sx={{
          borderTop:
            "1px solid #E5E7EB",
          p: 2,
        }}
      >

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 0,
          }}
        >

          <Avatar
            sx={{
              width: 46,
              height: 46,
              flexShrink: 0,
              backgroundColor: "#1E3A8A",
              fontWeight: 700,
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>


          <Box
            sx={{
              minWidth: 0,
            }}
          >

            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "#172033",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name}
            </Typography>


            <Typography
              sx={{
                fontSize: 12,
                color: "#64748B",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email}
            </Typography>

          </Box>

        </Box>

      </Box>

    </Box>
  );


  // =====================================================
  // MAIN LAYOUT
  // =====================================================

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F5F7FB",
      }}
    >

      {/* =================================================
          DESKTOP SIDEBAR
      ================================================= */}

      <Drawer
        variant="permanent"
        open
        sx={{
          display: {
            xs: "none",
            md: "block",
          },

          width: drawerWidth,

          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",

            borderRight:
              "1px solid #E5E7EB",

            backgroundColor: "#ffffff",

            position: "fixed",

            height: "100vh",

            overflowX: "hidden",
          },
        }}
      >
        {drawer}
      </Drawer>


      {/* =================================================
          MOBILE SIDEBAR
      ================================================= */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>


      {/* =================================================
          MAIN AREA
      ================================================= */}

      <Box
        sx={{
          flexGrow: 1,
          minWidth: 0,

          width: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },

          marginLeft: {
            xs: 0,
            md: `${drawerWidth}px`,
          },

          display: "flex",
          flexDirection: "column",
        }}
      >

        {/* =================================================
            TOP BAR
        ================================================= */}

        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backgroundColor: "#ffffff",

            color: "#1E3A8A",

            borderBottom:
              "1px solid #E5E7EB",

            width: "100%",
          }}
        >

          <Toolbar
            sx={{
              minHeight: "82px !important",
              px: {
                xs: 2,
                md: 3,
              },
            }}
          >

            {/* MOBILE MENU BUTTON */}

            <IconButton
              onClick={() =>
                setMobileOpen(true)
              }
              sx={{
                display: {
                  xs: "inline-flex",
                  md: "none",
                },

                mr: 1,

                color: "#1E3A8A",
              }}
            >
              <MenuIcon />
            </IconButton>


            {/* PAGE HEADER */}

            <Typography
              sx={{
                flexGrow: 1,
                fontSize: 18,
                fontWeight: 700,
                color: "#1E3A8A",
              }}
            >
              {isEmployee
                ? "Employee Portal"
                : "WorkSphere"}
            </Typography>


            {/* PROFILE BUTTON */}

            <IconButton
              onClick={(event) =>
                setAnchorEl(
                  event.currentTarget
                )
              }
              sx={{
                p: 0,
              }}
            >

              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  backgroundColor: "#800020",
                  fontWeight: 700,
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>

            </IconButton>


            {/* PROFILE MENU */}

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() =>
                setAnchorEl(null)
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >

              <MenuItem
                onClick={handleLogout}
                sx={{
                  minWidth: 160,
                }}
              >

                <ListItemIcon>
                  <LogoutIcon
                    fontSize="small"
                  />
                </ListItemIcon>

                Logout

              </MenuItem>

            </Menu>

          </Toolbar>

        </AppBar>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,

            width: "100%",

            minWidth: 0,

            minHeight:
              "calc(100vh - 82px)",

            backgroundColor: "#F5F7FB",

            overflowX: "hidden",
          }}
        >

          <Outlet />

        </Box>

      </Box>

    </Box>
  );
}