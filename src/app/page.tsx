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
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import KingBedIcon from "@mui/icons-material/KingBed";
import HikingIcon from "@mui/icons-material/Hiking";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const metadata: Metadata = {
  title: "Hotel Pomelia | Turismo Responsabile a Ragusa, Sicilia",
  description:
    "Scopri Hotel Pomelia: hotel ecosostenibile a Ragusa, Sicilia. Società Benefit con energia 100% rinnovabile, cucina biologica 0 km e spiaggia accessibile.",
  openGraph: {
    title: "Hotel Pomelia — Dove la Sicilia incontra il turismo responsabile",
    description:
      "Boutique hotel eco-sostenibile nel cuore degli Iblei, Ragusa. Tre generazioni di ospitalità autentica.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Panorama della Sicilia ragusana al tramonto",
      },
    ],
  },
};

// JSON-LD structured data for Google Hotel/LocalBusiness schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotel Pomelia",
  description:
    "Hotel ecosostenibile a Ragusa, Sicilia. Società Benefit dedicata al turismo responsabile.",
  url: "https://www.hotelpomelia.it",
  telephone: "+390932000000",
  email: "info@hotelpomelia.it",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Contrada Pomelia, S.P. 25",
    addressLocality: "Ragusa",
    addressRegion: "RG",
    postalCode: "97100",
    addressCountry: "IT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "36.9269",
    longitude: "14.7251",
  },
  starRating: { "@type": "Rating", ratingValue: "4" },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Spiaggia accessibile", value: true },
    { "@type": "LocationFeatureSpecification", name: "Energia rinnovabile 100%", value: true },
    { "@type": "LocationFeatureSpecification", name: "Cucina biologica 0 km", value: true },
    { "@type": "LocationFeatureSpecification", name: "Wi-Fi gratuito", value: true },
    { "@type": "LocationFeatureSpecification", name: "Parcheggio gratuito", value: true },
  ],
};

const highlights = [
  {
    icon: <KingBedIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
    title: "Camere Artigianali",
    description:
      "Suite e camere con arredi di recupero realizzati da maestri artigiani siciliani. Lenzuola certificate GOTS in canapa e cotone biologico.",
    href: "/camere",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Camera artigianale con arredi in legno recuperato",
  },
  {
    icon: <RestaurantIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
    title: "Cucina 0 km",
    description:
      "Maccu di favi ragusano, Schiaccia ragusana, Mpanatigghi: sapori autentici dall'orto biologico di proprietà. Workshop di cucina siciliana e permacultura.",
    href: "/ristorazione",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Piatti della cucina siciliana biologica",
  },
  {
    icon: <HikingIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
    title: "Territorio & Esperienze",
    description:
      "Trekking negli Iblei, degustazione di olio extravergine a Chiaramonte Gulfi, escursioni ad Agrigento. La Sicilia più autentica a portata di mano.",
    href: "/esperienze",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Trekking nei paesaggi degli Iblei siciliani",
  },
  {
    icon: <SolarPowerIcon sx={{ fontSize: 36, color: "#F4C430" }} aria-hidden="true" />,
    title: "100% Rinnovabile",
    description:
      "Energia solare, economia circolare, spiaggia privata certificata barrier-free. Il nostro manifesto: lusso responsabile che rispetta persone e pianeta.",
    href: "/sostenibilita",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Pannelli solari sul tetto dell'hotel",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data injected in <head> */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <Box
        component="section"
        aria-label="Benvenuto all'Hotel Pomelia"
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
          alt="Vista della piscina dell'Hotel Pomelia con il paesaggio siciliano sullo sfondo"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.55 }}
        />

        <Container
          maxWidth="lg"
          sx={{ position: "relative", zIndex: 1, textAlign: "center", color: "#FFFFFF" }}
        >
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
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              mb: 2,
              textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              color: "#FFFFFF",
            }}
          >
            Hotel Pomelia
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 300,
              mb: 1.5,
              color: "rgba(255,255,255,0.9)",
              maxWidth: 640,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Dove la Sicilia incontra il futuro del turismo responsabile.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.7)",
              mb: 4,
              fontStyle: "italic",
            }}
          >
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
              aria-label="Scopri le nostre camere"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                color: "#FFFFFF",
                borderColor: "rgba(255,255,255,0.6)",
                "&:hover": { borderColor: "#F4C430", color: "#F4C430" },
              }}
            >
              Scopri le camere
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── VALUE PROPOSITION ── */}
      <Box
        component="section"
        aria-labelledby="value-prop-heading"
        sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#FAF7F0" }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8, maxWidth: 700, mx: "auto" }}>
            <Typography
              variant="overline"
              sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}
            >
              Il nostro impegno
            </Typography>
            <Typography
              id="value-prop-heading"
              variant="h2"
              sx={{ mt: 1, mb: 3, fontSize: { xs: "1.8rem", md: "2.5rem" } }}
            >
              Non solo un hotel. Un manifesto.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", lineHeight: 1.9, fontSize: "1.05rem" }}
            >
              Dal 1958, la famiglia Pomelia accoglie viaggiatori che cercano autenticità.
              Oggi, come{" "}
              <strong>Società Benefit certificata</strong>, ogni scelta — dall&apos;energia
              alle lenzuola, dalla tavola al territorio — è guidata da un principio semplice:
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
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                    },
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
                    <Box sx={{ mb: 1.5 }}>{item.icon}</Box>
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

      {/* ── BOOKING CTA BANNER ── */}
      <Box
        component="section"
        aria-labelledby="cta-heading"
        sx={{
          py: { xs: 8, md: 10 },
          background: "linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}
          >
            Prenota direttamente con noi
          </Typography>
          <Typography
            id="cta-heading"
            variant="h3"
            sx={{ mt: 1, mb: 2, fontSize: { xs: "1.6rem", md: "2.2rem" }, color: "#FFFFFF" }}
          >
            Il tuo rifugio siciliano ti aspetta
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255,255,255,0.7)", mb: 4, lineHeight: 1.8 }}
          >
            Prenota direttamente con noi — senza intermediari — e ricevi
            la nostra migliore tariffa garantita, con colazione biologica inclusa.
          </Typography>
          <Button
            component={NextLink}
            href="/prenota"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            aria-label="Compila il modulo di richiesta di prenotazione"
            sx={{ px: 5, py: 1.75, fontSize: "1rem" }}
          >
            Richiedi disponibilità
          </Button>
        </Container>
      </Box>
    </>
  );
}
