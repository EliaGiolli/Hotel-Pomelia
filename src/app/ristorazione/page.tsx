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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import GrassIcon from "@mui/icons-material/Grass";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";

export const metadata: Metadata = {
  title: "Ristorazione & Orto Biologico",
  description:
    "Ristorante biologico 0 km dell'Hotel Pomelia a Ragusa. Maccu di favi ragusano, Schiaccia ragusana, 'Mpanatigghi e workshop di cucina siciliana e permacultura.",
  keywords: ["maccu di favi ragusano", "schiaccia ragusana", "cucina biologica Ragusa", "ristorante 0 km Sicilia"],
  openGraph: {
    title: "Ristorazione & Orto Biologico — Hotel Pomelia",
    description: "Cucina siciliana autentica dall'orto biologico di proprietà. Maccu di favi, Schiaccia ragusana, 'Mpanatigghi.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop",
        alt: "Piatti della tradizione siciliana al ristorante biologico di Hotel Pomelia",
      },
    ],
  },
};

const dishes = [
  {
    name: "Maccu di Favi Ragusano",
    description:
      "La zuppa della tradizione iblea: fave secche di produzione propria, finocchietto selvatico raccolto nei campi circostanti, olio extravergine di oliva locale. Una ricetta tramandata da generazioni che racconta il territorio.",
    origin: "Tradizione Iblea",
    season: "Autunno · Inverno",
    keywords: ["maccu di favi ragusano", "cucina tradizionale iblea"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Maccu di favi ragusano con finocchietto e olio extravergine",
  },
  {
    name: "Schiaccia Ragusana",
    description:
      "Focaccia ricca e saporita ripiena con tuma fresca, acciughe e cipolla caramellata. La nostra versione utilizza farina di grano antico Tumminia macinata a pietra da mulino locale, lievitazione naturale di 48 ore.",
    origin: "Ragusa Ibla",
    season: "Tutto l'anno",
    keywords: ["schiaccia ragusana", "grano antico tumminia"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=80",
    imageAlt: "Schiaccia ragusana con tuma fresca e acciughe locali",
  },
  {
    name: "'Mpanatigghi",
    description:
      "Il dolce più misterioso e amato di Ragusa: pasta frolla con ripieno di carne di manzo macinata, cioccolato fondente, mandorle di Avola e cannella. Un incontro arabo-normanno sopravvissuto intatto nei secoli.",
    origin: "Modica · Ragusa",
    season: "Dicembre · Pasqua",
    keywords: ["mpanatigghi", "dolci tipici ragusani"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
    imageAlt: "'Mpanatigghi: dolci tipici ragusani con cioccolato e mandorle",
  },
];

const workshops = [
  {
    icon: <LocalDiningIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Workshop di Cucina Siciliana",
    description:
      "Tre ore con la chef Chiara tra i profumi dell'orto. Si impara a fare la pasta fresca iblea, il pane di casa e almeno uno dei nostri dolci tradizionali. Incluse degustazione e ricette da portare a casa.",
    duration: "3 ore",
    maxGuests: "8 persone",
  },
  {
    icon: <GrassIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Tour dell'Orto in Permacultura",
    description:
      "Alessandro vi guida nella scoperta dell'orto sinergico: le piante compagne, il compostaggio, i sistemi di raccolta dell'acqua piovana. Un modo diverso di guardare il cibo e la terra.",
    duration: "1,5 ore",
    maxGuests: "12 persone",
  },
  {
    icon: <EmojiNatureIcon sx={{ fontSize: 32, color: "#F4C430" }} aria-hidden="true" />,
    title: "Degustazione di Oli e Vini Iblei",
    description:
      "Serata di abbinamento con produttori locali: olio monocultivar Tonda Iblea DOP, vini Cerasuolo di Vittoria DOCG e Nero d'Avola. Ogni prodotto ha una storia e un territorio da raccontare.",
    duration: "2 ore",
    maxGuests: "16 persone",
  },
];

export default function RistorazionePage() {
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
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=75"
          alt="Il ristorante biologico di Hotel Pomelia con vista sull'orto"
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
            Ristorante & Orto
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            La Sicilia nel piatto, dall&apos;orto alla tavola
          </Typography>
        </Container>
      </Box>

      {/* Philosophy */}
      <Box component="section" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FAF7F0" }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em" }}
              >
                La nostra filosofia
              </Typography>
              <Typography variant="h2" sx={{ mt: 1, mb: 3, fontSize: { xs: "1.6rem", md: "2.2rem" } }}>
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
                  alt="Mercato locale siciliano con prodotti freschi di stagione"
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Signature dishes — targeted for SEO on culinary keywords */}
      <Box component="section" aria-labelledby="dishes-heading" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em", display: "block", textAlign: "center" }}
          >
            I piatti della tradizione
          </Typography>
          <Typography
            id="dishes-heading"
            variant="h2"
            sx={{ mt: 1, mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}
          >
            Identità culinaria iblea
          </Typography>

          <Grid container spacing={4}>
            {dishes.map((dish) => (
              <Grid key={dish.name} size={{ xs: 12, md: 4 }}>
                {/* Each dish gets its own <article> to help search engines index culinary keywords */}
                <Card
                  component="article"
                  sx={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
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

      {/* Workshops */}
      <Box component="section" aria-labelledby="workshops-heading" sx={{ py: { xs: 6, md: 10 }, backgroundColor: "#FAF7F0" }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em", display: "block", textAlign: "center" }}
          >
            Esperienze culinarie
          </Typography>
          <Typography
            id="workshops-heading"
            variant="h2"
            sx={{ mt: 1, mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}
          >
            Workshop e degustazioni
          </Typography>

          <Grid container spacing={4}>
            {workshops.map((ws) => (
              <Grid key={ws.title} size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: "100%", p: 1 }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{ws.icon}</Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                      {ws.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
                      {ws.description}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5 }}>
                      <Chip label={ws.duration} size="small" color="secondary" variant="outlined" />
                      <Chip label={`Max ${ws.maxGuests}`} size="small" variant="outlined" />
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
              aria-label="Prenota un soggiorno con workshop di cucina incluso"
            >
              Prenota e scegli il tuo workshop
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
