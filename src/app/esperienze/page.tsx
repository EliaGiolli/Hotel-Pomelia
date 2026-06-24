import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WavesIcon from "@mui/icons-material/Waves";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";

export const metadata: Metadata = {
  title: "Esperienze & Territorio",
  description:
    "Esperienze autentiche in Sicilia da Hotel Pomelia: trekking negli Iblei, degustazione olio a Chiaramonte Gulfi, escursione Agrigento, spiaggia accessibile barrier-free.",
  openGraph: {
    title: "Esperienze & Territorio — Hotel Pomelia Ragusa",
    description: "Trekking ibleo, olio di oliva DOP, Agrigento e spiaggia barrier-free: la Sicilia autentica da Hotel Pomelia.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&auto=format&fit=crop",
        alt: "Trekking nei paesaggi degli Iblei ragusani",
      },
    ],
  },
};

const experiences = [
  {
    icon: <HikingIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Trekking negli Iblei",
    subtitle: "Natura guidata",
    description:
      "Alessandro vi accompagna lungo sentieri inediti degli altipiani iblei: carrubbeti centenari, cave di pietra abbandonata, panorami sul mare di Donnalucata. Difficoltà bassa-media, adatto a famiglie. Durata 3–4 ore.",
    tags: ["Natura", "Famiglia", "Guidato"],
    difficulty: "Facile–Media",
    duration: "3–4 ore",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Trekking negli altipiani iblei con carrubeti centenari",
  },
  {
    icon: <OilBarrelIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Olio DOP a Chiaramonte Gulfi",
    subtitle: "Degustazione guidata",
    description:
      "Chiaramonte Gulfi, la &quot;Milano del Sud&quot;, è il cuore della produzione di olio Tonda Iblea DOP. Vi portiamo nella migliore frantoio familiare per vedere la molitura, degustare in purezza e acquistare direttamente dal produttore.",
    tags: ["Enogastronomia", "Cultura", "Shopping"],
    difficulty: "Nessuna",
    duration: "Mezza giornata",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Degustazione di olio extravergine Tonda Iblea DOP a Chiaramonte Gulfi",
  },
  {
    icon: <DirectionsCarIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Giornata ad Agrigento",
    subtitle: "Patrimonio UNESCO",
    description:
      "La Valle dei Templi è patrimonio dell&apos;UNESCO e dista 90 km. Vi organizziamo il transfer condiviso in van elettrico, la guida certificata e l&apos;ingresso. Un&apos;esperienza che unisce grandezza greca e Sicilia profonda.",
    tags: ["Cultura", "Patrimonio UNESCO", "Transfer"],
    difficulty: "Nessuna",
    duration: "Giornata intera",
    image: "https://images.unsplash.com/photo-1601465747956-a85bf0b21ce7?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Tempio della Concordia nella Valle dei Templi ad Agrigento",
  },
  {
    icon: <WavesIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Spiaggia Privata Accessibile",
    subtitle: "Barrier-free certificata",
    description:
      "La nostra spiaggia privata sul Mediterraneo è certificata per l&apos;accessibilità totale: pedane, carrozzine anfibie, assistenti formati e ombrelloni regolabili. Il mare è un diritto, non un privilegio.",
    tags: ["Accessibilità", "Mare", "Certificata"],
    difficulty: "Accessibile a tutti",
    duration: "Libero",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Spiaggia accessibile barrier-free con pedane e mare cristallino",
    highlight: true,
  },
];

export default function EsperienzePage() {
  return (
    <Box component="article">
      {/* Header */}
      <Box
        component="header"
        sx={{
          position: "relative",
          height: { xs: 320, md: 420 },
          overflow: "hidden",
          backgroundColor: "#0d1117",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&auto=format&fit=crop&q=75"
          alt="Paesaggio degli altipiani iblei durante un trekking guidato"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.5 }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pb: 6, color: "#FFFFFF" }}>
          <Typography
            variant="overline"
            sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}
          >
            Esperienze & Territorio
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            La Sicilia più autentica, a portata di mano
          </Typography>
        </Container>
      </Box>

      {/* Intro */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#FAF7F0" }}>
        <Container maxWidth="md">
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", lineHeight: 2, color: "text.secondary", textAlign: "center" }}
          >
            Essere ospiti di Hotel Pomelia significa avere accesso a una rete di esperienze che
            vanno al cuore del territorio ibleo: non tour organizzati, ma incontri veri con
            produttori, guide locali e paesaggi che i depliant non fotografano mai.
          </Typography>
        </Container>
      </Box>

      {/* Experiences grid */}
      <Box component="section" aria-labelledby="exp-heading" sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography
            id="exp-heading"
            variant="h2"
            sx={{ mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}
          >
            Cosa ti aspetta
          </Typography>

          <Grid container spacing={4}>
            {experiences.map((exp) => (
              <Grid key={exp.title} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: exp.highlight ? "2px solid #00A896" : "1px solid rgba(0,0,0,0.08)",
                    transition: "box-shadow 0.25s",
                    "&:hover": { boxShadow: "0 8px 32px rgba(0,0,0,0.12)" },
                  }}
                >
                  <Box sx={{ position: "relative", height: 240 }}>
                    <Image
                      src={exp.image}
                      alt={exp.imageAlt}
                      fill
                      sizes="(max-width:900px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                    {exp.highlight && (
                      <Chip
                        icon={<AccessibleIcon sx={{ fontSize: 16, color: "#FFFFFF !important" }} aria-hidden="true" />}
                        label="Accessibile a tutti"
                        size="small"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          backgroundColor: "#00A896",
                          color: "#FFFFFF",
                          fontWeight: 700,
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mb: 2 }}>{exp.icon}</Box>

                    <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700 }}>
                      {exp.subtitle}
                    </Typography>
                    <Typography component="h3" variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {exp.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.85, mb: 2 }}
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                      {exp.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" sx={{ backgroundColor: "#FAF7F0" }} />
                      ))}
                    </Box>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        <strong>Difficoltà:</strong> {exp.difficulty}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        <strong>Durata:</strong> {exp.duration}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Accessibility highlight section */}
      <Box
        component="section"
        aria-labelledby="accessibility-heading"
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#1A1A2E",
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <AccessibleIcon sx={{ fontSize: 48, color: "#00A896", mb: 2 }} aria-hidden="true" />
          <Typography
            id="accessibility-heading"
            variant="h3"
            sx={{ mb: 2, color: "#FFFFFF", fontSize: { xs: "1.5rem", md: "2rem" } }}
          >
            Il turismo è per tutti
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.9, mb: 4 }}>
            Hotel Pomelia è privo di barriere architettoniche in ogni spazio: camere,
            ristorante, giardino, percorsi verso la spiaggia. La nostra spiaggia privata è
            <strong style={{ color: "#F4C430" }}> certificata barrier-free</strong>: pedane mobili,
            carrozzine anfibie da noleggio gratuito e assistenti dedicati rendono il mare
            accessibile a tutti, senza compromessi. La Sicilia è per tutti.
          </Typography>
          <Button
            component={NextLink}
            href="/prenota"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            aria-label="Prenota il tuo soggiorno accessibile"
            sx={{ color: "#1A1A2E" }}
          >
            Prenota il tuo soggiorno
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
