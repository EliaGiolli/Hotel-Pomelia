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
import dbConnect from "@/core/database/mongoose";
import { getExperiences } from "@/core/queries/getExperiences";

const iconMap: Record<string, React.ReactNode> = {
  hiking: <HikingIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
  oil_barrel: <OilBarrelIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
  car: <DirectionsCarIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
  waves: <WavesIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
};

export default async function EsperienzeContent() {
  await dbConnect();
  const experiences = await getExperiences();

  return (
    <Box component="article">
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
          alt="Paesaggio degli altipiani iblei durante un trekking guidato in Sicilia"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.5 }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pb: 6, color: "#FFFFFF" }}>
          <Typography variant="overline" sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}>
            Esperienze & Territorio
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            La Sicilia più autentica, a portata di mano
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#FAF7F0" }}>
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

      <Box component="section" aria-labelledby="exp-heading" sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography id="exp-heading" variant="h2" sx={{ mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
            Cosa ti aspetta
          </Typography>
          <Grid container spacing={4}>
            {experiences.map((exp) => (
              <Grid key={String(exp._id)} size={{ xs: 12, md: 6 }}>
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
                  <Box sx={{ position: "relative", height: 240, backgroundColor: "#1A1A2E" }}>
                    {exp.image && (
                      <Image
                        src={exp.image}
                        alt={exp.imageAlt ?? exp.title}
                        fill
                        sizes="(max-width:900px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    )}
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
                    <Box sx={{ mb: 2 }}>{iconMap[exp.iconKey] ?? null}</Box>
                    <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700 }}>
                      {exp.subtitle}
                    </Typography>
                    <Typography component="h3" variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {exp.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                      {exp.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                      {exp.tags.map((tag: string) => (
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

      <Box
        component="section"
        aria-labelledby="accessibility-heading"
        sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#1A1A2E", color: "#FFFFFF" }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <AccessibleIcon sx={{ fontSize: 48, color: "#00A896", mb: 2 }} aria-hidden="true" />
          <Typography id="accessibility-heading" variant="h3" sx={{ mb: 2, color: "#FFFFFF", fontSize: { xs: "1.5rem", md: "2rem" } }}>
            Il turismo è per tutti
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.9, mb: 4 }}>
            Hotel Pomelia è privo di barriere architettoniche in ogni spazio: camere,
            ristorante, giardino, percorsi verso la spiaggia. La nostra spiaggia privata è{" "}
            <strong style={{ color: "#F4C430" }}>certificata barrier-free</strong>: pedane mobili,
            carrozzine anfibie da noleggio gratuito e assistenti dedicati rendono il mare
            accessibile a tutti, senza compromessi. La Sicilia è per tutti.
          </Typography>
          <NextLink href="/prenota" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ArrowForwardIcon />}
            aria-label="Prenota il tuo soggiorno accessibile a Hotel Pomelia"
            sx={{ color: "#1A1A2E" }}
          >
            Prenota il tuo soggiorno
          </Button>
          </NextLink>
        </Container>
      </Box>
    </Box>
  );
}
