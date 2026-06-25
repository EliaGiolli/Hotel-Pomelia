"use client";

import Image from "next/image";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import KingBedIcon from "@mui/icons-material/KingBed";
import HikingIcon from "@mui/icons-material/Hiking";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RecyclingIcon from "@mui/icons-material/Recycling";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { highlights, generations, benefitPillars } from "@/features/home/constants/homeData";

const highlightIconMap: Record<string, React.ReactNode> = {
  bed:        <KingBedIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
  restaurant: <RestaurantIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
  hiking:     <HikingIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
  solar:      <SolarPowerIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
};

const pillarIconMap: Record<string, React.ReactNode> = {
  solar:      <SolarPowerIcon sx={{ fontSize: 28, color: "#F4C430" }} aria-hidden="true" />,
  recycling:  <RecyclingIcon sx={{ fontSize: 28, color: "#F4C430" }} aria-hidden="true" />,
  water:      <WaterDropIcon sx={{ fontSize: 28, color: "#F4C430" }} aria-hidden="true" />,
  accessible: <AccessibleIcon sx={{ fontSize: 28, color: "#F4C430" }} aria-hidden="true" />,
};

// ─────────────────────────────────────────────────────────────────────────────

function HomeHero() {
  return (
    <Box
      component="section"
      aria-label="Benvenuto all'Hotel Pomelia, boutique hotel ecosostenibile a Ragusa"
      sx={{
        position: "relative",
        height: { xs: "90vh", md: "100vh" },
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#0d1117",
      }}
    >
      <Image
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop&q=80"
        alt="Vista del giardino dell'Hotel Pomelia con il paesaggio degli Iblei ragusani sullo sfondo"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: "cover", opacity: 0.55 }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center", color: "#FFFFFF" }}>
        <Chip
          icon={<VerifiedIcon sx={{ fontSize: 16, color: "#00A896 !important" }} aria-hidden="true" />}
          label="Società Benefit · Turismo Responsabile"
          sx={{
            mb: 3,
            backgroundColor: "rgba(0,168,150,0.2)",
            color: "#33C1B2",
            border: "1px solid rgba(0,168,150,0.5)",
            fontWeight: 600,
            backdropFilter: "blur(4px)",
          }}
        />
        <Typography
          component="h1"
          variant="h1"
          sx={{ fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" }, mb: 2, textShadow: "0 2px 16px rgba(0,0,0,0.5)", color: "#FFFFFF" }}
        >
          Hotel Pomelia
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 300, mb: 1.5, color: "rgba(255,255,255,0.9)", maxWidth: 640, mx: "auto", lineHeight: 1.6 }}
        >
          Dove la Sicilia incontra il futuro del turismo responsabile.
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 4, fontStyle: "italic" }}>
          Ragusa Ibla · Tre generazioni · 100% energia rinnovabile
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Button
            component={NextLink}
            href="/prenota"
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            aria-label="Richiedi subito la tua prenotazione"
            sx={{ px: 4, py: 1.5, fontSize: "1rem" }}
          >
            Prenota il tuo soggiorno
          </Button>
          <Button
            component={NextLink}
            href="/camere"
            variant="outlined"
            size="large"
            aria-label="Scopri le nostre camere e suite"
            sx={{ px: 4, py: 1.5, fontSize: "1rem", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.6)", "&:hover": { borderColor: "#F4C430", color: "#F4C430" } }}
          >
            Scopri le camere
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HomeValueProposition() {
  return (
    <Box component="section" aria-labelledby="value-prop-heading" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FAF7F0" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8, maxWidth: 700, mx: "auto" }}>
          <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}>
            Il nostro impegno
          </Typography>
          <Typography id="value-prop-heading" variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Non solo un hotel. Un manifesto.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9, fontSize: "1.05rem" }}>
            Dal 1958, la famiglia Pomelia accoglie viaggiatori che cercano autenticità nel cuore
            degli Iblei ragusani. Oggi, come{" "}
            <strong>Società Benefit certificata</strong>, ogni scelta — dall&apos;energia alle
            lenzuola, dalla tavola al territorio — è guidata da un principio semplice:
            il lusso vero non danneggia ciò che lo rende possibile.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {highlights.map((item) => (
            <Grid key={item.href} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.25s, box-shadow 0.25s",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: "0 12px 40px rgba(0,0,0,0.12)" },
                }}
              >
                <CardMedia sx={{ position: "relative", height: 200 }}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width:600px) 100vw, (max-width:960px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 1.5 }}>{highlightIconMap[item.iconKey] ?? null}</Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Button
                    component={NextLink}
                    href={item.href}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ p: 0, color: "#00A896", fontWeight: 600 }}
                    aria-label={`Scopri di più: ${item.title}`}
                  >
                    Scopri di più
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HomeHistory() {
  return (
    <Box component="section" aria-labelledby="storia-heading" sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FFFFFF" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8, maxWidth: 640, mx: "auto" }}>
          <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}>
            Dal 1958
          </Typography>
          <Typography id="storia-heading" variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
            Tre generazioni, un&apos;unica storia
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.9 }}>
            Hotel Pomelia non è nata come impresa. È nata come gesto di accoglienza.
            Ogni generazione ha aggiunto uno strato di consapevolezza senza togliere nulla
            all&apos;essenziale: le persone al centro.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {generations.map((gen, i) => (
            <Grid key={gen.year} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  height: "100%",
                  borderLeft: "3px solid",
                  borderColor: i === 2 ? "#00A896" : "#F4C430",
                  backgroundColor: "#FAF7F0",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: i === 2 ? "#00A896" : "#D4A820", fontWeight: 700, letterSpacing: "0.12em" }}
                >
                  {gen.year}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5, mb: 0.5 }}>
                  {gen.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "#00A896", fontWeight: 600, display: "block", mb: 2 }}>
                  {gen.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                  {gen.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HomeManifesto() {
  return (
    <Box
      component="section"
      aria-labelledby="benefit-heading"
      sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#1A1A2E", color: "#FFFFFF" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: 16, color: "#00A896 !important" }} aria-hidden="true" />}
              label="Società Benefit certificata"
              sx={{ mb: 3, backgroundColor: "rgba(0,168,150,0.15)", color: "#33C1B2", border: "1px solid rgba(0,168,150,0.4)", fontWeight: 600 }}
            />
            <Typography id="benefit-heading" variant="h2" sx={{ mb: 3, color: "#FFFFFF", fontSize: { xs: "1.8rem", md: "2.4rem" } }}>
              Il lusso responsabile non è un compromesso
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.9, mb: 3 }}>
              Dal 2021 siamo una <strong style={{ color: "#F4C430" }}>Società Benefit</strong>:
              uno statuto che vincola legalmente ogni decisione aziendale all&apos;impatto
              su persone, comunità e ambiente. Non è marketing. È il nostro bilancio
              di impatto depositato ogni anno.
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.9, mb: 4 }}>
              Il 2% di ogni prenotazione diretta va alla rimboschimento della
              Valle dell&apos;Ippari, il corridoio naturale che collega gli Iblei al mare.
              Perché la Sicilia che proteggi è la stessa che vieni a vedere.
            </Typography>
            <Button
              component={NextLink}
              href="/sostenibilita"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              aria-label="Leggi il nostro manifesto di sostenibilità"
              sx={{ color: "#F4C430", borderColor: "#F4C430", "&:hover": { backgroundColor: "rgba(244,196,48,0.08)" } }}
            >
              Leggi il manifesto
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={2}>
              {benefitPillars.map((p) => (
                <Grid key={p.label} size={{ xs: 12, sm: 6 }}>
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: 2,
                      border: "1px solid rgba(255,255,255,0.08)",
                      height: "100%",
                    }}
                  >
                    <Box sx={{ mb: 1.5 }}>{pillarIconMap[p.iconKey] ?? null}</Box>
                    <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700, mb: 0.5 }}>
                      {p.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
                      {p.detail}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function HomeBookingCTA() {
  return (
    <Box
      component="section"
      aria-labelledby="cta-heading"
      sx={{ py: { xs: 8, md: 10 }, background: "linear-gradient(135deg, #FAF7F0 0%, #F0EBE0 100%)", textAlign: "center" }}
    >
      <Container maxWidth="md">
        <Divider sx={{ mb: 6, borderColor: "rgba(0,0,0,0.08)" }} />
        <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}>
          Prenota direttamente con noi
        </Typography>
        <Typography id="cta-heading" variant="h3" sx={{ mt: 1, mb: 2, fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
          Il tuo rifugio siciliano ti aspetta
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.8 }}>
          Prenota direttamente con noi — senza intermediari — e ricevi la migliore
          tariffa garantita, con colazione biologica inclusa.
        </Typography>
        <Button
          component={NextLink}
          href="/prenota"
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowForwardIcon />}
          aria-label="Compila il modulo di richiesta di prenotazione"
          sx={{ px: 5, py: 1.75, fontSize: "1rem" }}
        >
          Richiedi disponibilità
        </Button>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function HomeContent() {
  return (
    <>
      <HomeHero />
      <HomeValueProposition />
      <HomeHistory />
      <HomeManifesto />
      <HomeBookingCTA />
    </>
  );
}
