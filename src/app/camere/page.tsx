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
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const metadata: Metadata = {
  title: "Camere & Suite",
  description:
    "Camere e suite dell'Hotel Pomelia a Ragusa: arredi di recupero di artigiani siciliani, lenzuola certificate GOTS in cotone biologico e canapa. Design eco-sostenibile.",
  openGraph: {
    title: "Camere & Suite — Hotel Pomelia Ragusa",
    description: "Arredi artigianali locali e lenzuola biologiche GOTS. Il lusso responsabile della Sicilia.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&auto=format&fit=crop",
        alt: "Suite Gelsomino con arredi artigianali siciliani",
      },
    ],
  },
};

const rooms = [
  {
    name: "Suite Gelsomino",
    slug: "suite-gelsomino",
    capacity: 2,
    size: "52 m²",
    description:
      "La nostra suite più esclusiva: ampio terrazzo privato con vista sugli ulivi e il mare all'orizzonte. Letto king-size con baldacchino artigianale, vasca freestanding in terracotta locale, arredi di recupero firmati da maestro Salvatore Cagliostro di Ragusa.",
    features: [
      "Terrazzo privato con vista panoramica",
      "Letto king-size con baldacchino",
      "Vasca freestanding in terracotta locale",
      "Arredi di recupero artigianali",
      "Lenzuola in cotone biologico GOTS",
      "Minibar con prodotti biologici locali",
      "Wi-Fi ad alta velocità",
      "Smart TV 55\" con streaming",
    ],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Suite Gelsomino: letto king-size e terrazzo panoramico",
    badge: "Suite Premium",
    badgeColor: "#F4C430",
  },
  {
    name: "Camera Mandorlo",
    slug: "camera-mandorlo",
    capacity: 2,
    size: "28 m²",
    description:
      "Camera doppia con vista sul giardino di mandorli. Atmosfera intima e naturale con pareti in calce bianca, pavimento in cotto ibleo fatto a mano e lenzuola in canapa certificata. Perfetta per coppie che cercano autenticità.",
    features: [
      "Vista giardino di mandorli",
      "Pavimento in cotto ibleo artigianale",
      "Pareti in calce naturale bianca",
      "Lenzuola in canapa biologica GOTS",
      "Arredi di recupero",
      "Doccia walk-in con pietra di Comiso",
      "Wi-Fi gratuito",
    ],
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Camera Mandorlo con vista giardino e arredi in cotto ibleo",
    badge: "Classic",
    badgeColor: "#00A896",
  },
  {
    name: "Familiare Carruba",
    slug: "familiare-carruba",
    capacity: 4,
    size: "45 m²",
    description:
      "Soluzione ideale per famiglie: due camere comunicanti, due bagni completi, un angolo salotto con divano letto per bambini. Pavimenti in graniglia di Ragusa, soffitto a volta, colori della terra siciliana. Baby kit biologico incluso.",
    features: [
      "Due camere comunicanti",
      "Due bagni completi",
      "Angolo salotto con divano letto",
      "Pavimento in graniglia di Ragusa",
      "Soffitto a volta originale",
      "Baby kit biologico incluso",
      "Lenzuola in cotone biologico GOTS",
      "Frigorifero con snack biologici",
    ],
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Camera Familiare Carruba con spazio per tutta la famiglia",
    badge: "Family",
    badgeColor: "#C85C40",
  },
  {
    name: "Junior Suite Zagara",
    slug: "junior-suite-zagara",
    capacity: 2,
    size: "38 m²",
    description:
      "Junior suite per coppie con patio privato fiorito di zagare. Ampio letto queen, scrittoio artigianale in legno di carrubo recuperato, vasca doppia. L'aroma degli agrumi al mattino è incluso nel prezzo.",
    features: [
      "Patio privato fiorito",
      "Letto queen con testiera in legno carrubo",
      "Vasca doppia",
      "Scrittoio in legno di recupero",
      "Lenzuola in cotone biologico GOTS",
      "Prodotti da bagno biologici",
      "Accappatoi in cotone equo-solidale",
      "Wi-Fi gratuito",
    ],
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
    imageAlt: "Junior Suite Zagara con patio privato fiorito",
    badge: "Junior Suite",
    badgeColor: "#00A896",
  },
];

export default function CamerePage() {
  return (
    <Box component="article">
      {/* Page header */}
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
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&auto=format&fit=crop&q=75"
          alt="Panoramica delle camere artigianali dell'Hotel Pomelia"
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
            Camere & Suite
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            Design artigianale, benessere autentico
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
            Ogni camera di Hotel Pomelia è un&apos;opera artigianale unica. Gli arredi provengono
            da laboratori siciliani che praticano l&apos;upcycling di legni antichi.
            Le lenzuola sono certificate{" "}
            <strong>GOTS (Global Organic Textile Standard)</strong> in cotone biologico e canapa.
            Zero plastica monouso. Zero greenwashing: solo fatti concreti.
          </Typography>
        </Container>
      </Box>

      {/* Room cards */}
      <Box component="section" aria-labelledby="rooms-heading" sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography id="rooms-heading" variant="h2" sx={{ mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
            Le nostre soluzioni di soggiorno
          </Typography>

          <Grid container spacing={4}>
            {rooms.map((room) => (
              <Grid key={room.slug} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.25s",
                    "&:hover": { boxShadow: "0 8px 32px rgba(0,0,0,0.12)" },
                  }}
                >
                  {/* Room image */}
                  <Box sx={{ position: "relative", height: 260 }}>
                    <Image
                      src={room.image}
                      alt={room.imageAlt}
                      fill
                      sizes="(max-width:900px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                    <Chip
                      label={room.badge}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: room.badgeColor,
                        color: "#1A1A2E",
                        fontWeight: 700,
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                        {room.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1.5, color: "text.secondary", flexShrink: 0, ml: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <PeopleIcon sx={{ fontSize: 16 }} aria-hidden="true" />
                          <Typography variant="caption">{room.capacity}</Typography>
                        </Box>
                        <Typography variant="caption">{room.size}</Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      {room.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.1em" }}>
                      Dotazioni principali
                    </Typography>
                    <Grid container spacing={0.5} sx={{ mt: 1, mb: 3 }}>
                      {room.features.map((feature) => (
                        <Grid key={feature} size={{ xs: 12, sm: 6 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 14, color: "#00A896", flexShrink: 0 }}
                              aria-hidden="true"
                            />
                            <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
                              {feature}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Button
                      component={NextLink}
                      href={`/prenota?room=${room.slug}`}
                      variant="contained"
                      color="secondary"
                      endIcon={<ArrowForwardIcon />}
                      fullWidth
                      aria-label={`Prenota ${room.name}`}
                    >
                      Prenota questa camera
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box sx={{ py: 8, backgroundColor: "#FAF7F0", textAlign: "center" }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.4rem", md: "1.8rem" } }}>
            Non sai quale camera scegliere?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
            Scrivici nella nota della prenotazione e ti aiuteremo a trovare la soluzione
            perfetta per il tuo soggiorno.
          </Typography>
          <Button
            component={NextLink}
            href="/prenota"
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Richiedi disponibilità
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
