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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import GrassIcon from "@mui/icons-material/Grass";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import { prisma } from "@/core/database/prisma";

const workshopIconMap: Record<string, React.ReactNode> = {
  chef: <LocalDiningIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
  garden: <GrassIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
  wine: <EmojiNatureIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
};

export default async function RistorazioneContent() {
  const [dishes, workshops] = await Promise.all([
    prisma.dish.findMany(),
    prisma.workshop.findMany(),
  ]);

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
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=75"
          alt="Il ristorante biologico di Hotel Pomelia con vista sull'orto siciliano"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.5 }}
        />
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, pb: 6, color: "#FFFFFF" }}>
          <Typography variant="overline" sx={{ color: "#F4C430", fontWeight: 700, letterSpacing: "0.12em" }}>
            Ristorante & Orto Biologico
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            La Sicilia nel piatto, dall&apos;orto alla tavola
          </Typography>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="philosophy-heading" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FAF7F0" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="overline" sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}>
                La nostra filosofia
              </Typography>
              <Typography id="philosophy-heading" variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
                Zero chilometri, cento sapori
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 2, mb: 3 }}>
                Il nostro ristorante serve quasi esclusivamente ciò che cresce nell&apos;orto biologico di
                proprietà o che proviene da produttori locali entro 30 km. Nessun additivo,
                nessun prodotto fuori stagione, nessuna catena distributiva.
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 2 }}>
                La chef Chiara — terza generazione della famiglia — interpreta la tradizione iblea con
                rispetto filologico: le ricette sono quelle delle nonne, gli ingredienti quelli del
                territorio, la tecnica quella affinata in vent&apos;anni di cucina.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ position: "relative", height: { xs: 280, md: 400 }, borderRadius: 2, overflow: "hidden" }}>
                <Image
                  src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&auto=format&fit=crop&q=80"
                  alt="Prodotti freschi di stagione del mercato biologico locale siciliano"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="dishes-heading" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em", display: "block", textAlign: "center" }}
          >
            I piatti della tradizione iblea
          </Typography>
          <Typography id="dishes-heading" variant="h2" sx={{ mt: 1, mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
            Identità culinaria ragusana
          </Typography>
          <Grid container spacing={4}>
            {dishes.map((dish) => (
              <Grid key={dish.id} size={{ xs: 12, md: 4 }}>
                <Card component="article" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <Box sx={{ position: "relative", height: 220 }}>
                    <Image
                      src={dish.image}
                      alt={dish.imageAlt}
                      fill
                      sizes="(max-width:900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
                      <Chip label={dish.origin} size="small" sx={{ backgroundColor: "#FAF7F0", fontWeight: 600 }} />
                      <Chip label={dish.season} size="small" variant="outlined" />
                    </Box>
                    <Typography component="h3" variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {dish.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                      {dish.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box component="section" aria-labelledby="workshops-heading" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FAF7F0" }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em", display: "block", textAlign: "center" }}
          >
            Esperienze culinarie
          </Typography>
          <Typography id="workshops-heading" variant="h2" sx={{ mt: 1, mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
            Workshop e degustazioni
          </Typography>
          <Grid container spacing={4}>
            {workshops.map((ws) => (
              <Grid key={ws.id} size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: "100%", p: 1 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{workshopIconMap[ws.iconKey] ?? null}</Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                      {ws.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      {ws.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Chip label={ws.duration} size="small" color="secondary" variant="outlined" />
                      <Chip label={`Max ${ws.maxGuests} persone`} size="small" variant="outlined" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <Button
              component={NextLink}
              href="/prenota"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              aria-label="Prenota un soggiorno con workshop di cucina siciliana incluso"
            >
              Prenota e scegli il tuo workshop
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
