"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

const navLinks = [
  { label: "Camere", href: "/camere" },
  { label: "Ristorazione", href: "/ristorazione" },
  { label: "Esperienze", href: "/esperienze" },
  { label: "Sostenibilità", href: "/sostenibilita" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#1A1A2E",
          boxShadow: "0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <Toolbar sx={{ maxWidth: "lg", width: "100%", mx: "auto", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <LocalFloristIcon sx={{ color: "#F4C430", fontSize: 26 }} aria-hidden="true" />
            <Typography
              variant="h6"
              component="span"
              sx={{
                color: "#FFFFFF",
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              Hotel Pomelia
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box component="nav" sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                sx={{
                  color: pathname === link.href ? "#F4C430" : "rgba(255,255,255,0.85)",
                  "&:hover": { color: "#F4C430", backgroundColor: "rgba(244,196,48,0.08)" },
                  fontWeight: pathname === link.href ? 700 : 500,
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/prenota"
              variant="contained"
              color="secondary"
              aria-label="Prenota il tuo soggiorno"
              sx={{ ml: 2 }}
            >
              Prenota ora
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            aria-label="Apri menu di navigazione"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { md: "none" }, color: "#FFFFFF" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280, backgroundColor: "#1A1A2E" } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            aria-label="Chiudi menu"
            onClick={() => setDrawerOpen(false)}
            sx={{ color: "#FFFFFF" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 3,
                  color: pathname === link.href ? "#F4C430" : "rgba(255,255,255,0.85)",
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: pathname === link.href ? 700 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ px: 3, pt: 2 }}>
            <Button
              component={Link}
              href="/prenota"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => setDrawerOpen(false)}
            >
              Prenota ora
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
