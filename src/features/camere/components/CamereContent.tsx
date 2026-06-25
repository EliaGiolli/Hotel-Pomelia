import Image from "next/image";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import PeopleIcon from "@mui/icons-material/People";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { BookingTriggerButton } from "./BookingTriggerButton";
import { prisma } from "@/core/database/prisma";

export default async function CamereContent() {
  const rooms = await prisma.room.findMany();

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
          src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&auto=format&fit=crop&q=75"
          alt="Suite Gelsomino con arredi artigianali siciliani e lenzuola certificate GOTS"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.5 }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pb: 6, color: "#FFFFFF" }}>
          <Typography variant="overline" sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}>
            Camere & Suite
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            Design artigianale, benessere autentico
          </Typography>
        </Container>
      </Box>

      <Box component="section" sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#FAF7F0" }}>
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

      <Box component="section" aria-labelledby="rooms-heading" sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography id="rooms-heading" variant="h2" sx={{ mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
            Le nostre soluzioni di soggiorno
          </Typography>
          <Grid container spacing={4}>
            {rooms.map((room) => (
              <Grid key={room.id} size={{ xs: 12, md: 6 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "box-shadow 0.25s",
                    "&:hover": { boxShadow: "0 8px 32px rgba(0,0,0,0.12)" },
                  }}
                >
                  <Box sx={{ position: "relative", height: 260 }}>
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      sizes="(max-width:900px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="h5" component="h3" sx={{ fontWeight: 700 }}>
                        {room.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary", flexShrink: 0, ml: 1 }}>
                        <PeopleIcon sx={{ fontSize: 16 }} aria-hidden="true" />
                        <Typography variant="caption">{room.capacity}</Typography>
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
                            <CheckCircleOutlineIcon sx={{ fontSize: 14, color: "#00A896", flexShrink: 0 }} aria-hidden="true" />
                            <Typography variant="caption" sx={{ lineHeight: 1.6 }}>
                              {feature}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <BookingTriggerButton roomName={room.name} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

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
