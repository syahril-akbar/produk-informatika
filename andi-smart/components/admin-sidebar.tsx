"use client"

import type React from "react"
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"
import {
  Dashboard,
  People,
  BarChart,
  Settings,
  Database, // Import the Database icon
} from "@mui/icons-material"
import { useRouter } from "next/router"
import Link from "next/link"

interface Props {
  open: boolean
  onClose: () => void
}

const AdminSidebar: React.FC<Props> = ({ open, onClose }) => {
  const theme = useTheme()
  const router = useRouter()
  const { pathname } = router

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Dashboard,
      current: pathname === "/admin",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: People,
      current: pathname === "/admin/users",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
      current: pathname === "/admin/analytics",
    },
    {
      name: "Data Profil",
      href: "/admin/tampilan",
      icon: Database,
      current: pathname === "/admin/tampilan",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname === "/admin/settings",
    },
  ]

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 240,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Link href={item.href} key={item.name} passHref>
            <ListItem button selected={item.current} onClick={onClose}>
              <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  )
}

export default AdminSidebar
