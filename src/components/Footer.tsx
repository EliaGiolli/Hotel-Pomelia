import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedIcon from "@mui/icons-material/Verified";

const footerLinks = [
  { label: "Camere", href: "/camere" },
  { label: "Ristorazione", href: "/ristorazione" },
  { label: "Esperienze", href: "/esperienze" },
  { label: "Sostenibilità", href: "/sostenibilita" },
  { label: "Prenota", href: "/prenota" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#1A1A2E", color: "rgba(255,255,255,0.85)", pt: 8, pb: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LocalFloristIcon sx={{ color: "#F4C430" }} aria-hidden="true" />
              <Typography
                variant="h6"
                sx={{ fontFamily: "var(--font-playfair), serif", color: "#FFFFFF" }}
              >
                Hotel Pomelia
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 2, lineHeight: 1.8 }}>
              Tre generazioni di ospitalità autentica nel cuore degli Iblei.
              Gestito da Chiara, Laura e Alessandro con passione per la Sicilia
              e rispetto per il pianeta.
            </Typography>
            {/* Società Benefit badge */}
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: 16, color: "#00A896 !important" }} aria-hidden="true" />}
              label="Società Benefit"
              size="small"
              sx={{
                backgroundColor: "rgba(0,168,150,0.15)",
                color: "#33C1B2",
                border: "1px solid rgba(0,168,150,0.4)",
                fontWeight: 600,
              }}
            />
          </Grid>

          {/* Navigation column */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="overline"
              sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}
            >
              Esplora
            </Typography>
            <Box component="nav" aria-label="Link footer" sx={{ mt: 1 }}>
              {footerLinks.map((link) => (
                <Box key={link.href} sx={{ mb: 0.75 }}>
                  <Link
                    component={NextLink}
                    href={link.href}
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      "&:hover": { color: "#F4C430" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact column */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography
              variant="overline"
              sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}
            >
              Contatti
            </Typography>
            <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <PlaceIcon sx={{ fontSize: 18, color: "#00A896", mt: 0.3, flexShrink: 0 }} aria-hidden="true" />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                  Contrada Pomelia, S.P. 25<br />
                  97100 Ragusa (RG), Sicilia
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <PhoneIcon sx={{ fontSize: 18, color: "#00A896", flexShrink: 0 }} aria-hidden="true" />
                <Link
                  href="tel:+390932000000"
                  sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#F4C430" } }}
                >
                  +39 0932 000 000
                </Link>
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                <EmailIcon sx={{ fontSize: 18, color: "#00A896", flexShrink: 0 }} aria-hidden="true" />
                <Link
                  href="mailto:info@hotelpomelia.it"
                  sx={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem", "&:hover": { color: "#F4C430" } }}
                >
                  info@hotelpomelia.it
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", my: 4 }} />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", gap: 1 }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
            © {new Date().getFullYear()} Hotel Pomelia S.r.l. Società Benefit — P.IVA 00000000000
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
            Tutti i diritti riservati · Privacy Policy · Cookie
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
