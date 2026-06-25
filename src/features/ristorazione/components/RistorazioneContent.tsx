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
import dbConnect from "../../../core/database/mongoose";
import Restaurant from "@/core/models/Restaurant";

export default async function RistorazioneContent() {
  await dbConnect();
  const menuItems = await Restaurant.find({}).lean();
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
            {menuItems.map((item) => (
              <Grid key={String(item._id)} size={{ xs: 12, md: 4 }}>
                <Card component="article" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 1.5, flexWrap: "wrap" }}>
                      <Chip label={item.category} size="small" sx={{ backgroundColor: "#FAF7F0", fontWeight: 600 }} />
                    </Box>
                    <Typography component="h3" variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
}
