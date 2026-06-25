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
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import RecyclingIcon from "@mui/icons-material/Recycling";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AccessibleIcon from "@mui/icons-material/Accessible";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const pillars = [
  {
    icon: <SolarPowerIcon sx={{ fontSize: 40, color: "#F4C430" }} aria-hidden="true" />,
    title: "Energia 100% Rinnovabile",
    description:
      "Dal 2019, Hotel Pomelia è alimentato esclusivamente da energia solare: 120 m² di pannelli fotovoltaici sul tetto producono il 130% del fabbisogno annuo. L'eccesso viene immesso in rete tramite contratti di vendita locale.",
    metric: { label: "Copertura energetica solare", value: 100 },
    facts: [
      "120 m² di pannelli fotovoltaici",
      "Produzione: 130% del fabbisogno",
      "Contratto ESG con fornitore locale",
      "Sistema di accumulo a batteria domestica",
    ],
  },
  {
    icon: <RecyclingIcon sx={{ fontSize: 40, color: "#F4C430" }} aria-hidden="true" />,
    title: "Economia Circolare",
    description:
      "Zero rifiuti organici: tutto ciò che non finisce in tavola viene compostato per l'orto. Gli arredi logori vengono restaurati dagli stessi artigiani che li hanno creati. Plastic free dal 2020: nessuna plastica monouso, in nessun angolo dell'hotel.",
    metric: { label: "Rifiuti destinati a compostaggio o recupero", value: 87 },
    facts: [
      "Compostaggio 100% scarti organici",
      "Plastic free certificato dal 2020",
      "Arredi restaurati, mai sostituiti",
      "Raccolta differenziata multimateriale",
    ],
  },
  {
    icon: <LocalFloristIcon sx={{ fontSize: 40, color: "#F4C430" }} aria-hidden="true" />,
    title: "Lenzuola Biologiche GOTS",
    description:
      "Tutte le lenzuola, gli asciugamani e i teli da spiaggia sono certificati GOTS (Global Organic Textile Standard): prodotti da cotone biologico e canapa senza pesticidi, tinti con coloranti naturali, lavorati in filiere locali siciliane.",
    metric: { label: "Tessili certificati biologici GOTS", value: 100 },
    facts: [
      "Certificazione GOTS verificata ogni anno",
      "Cotone biologico e canapa",
      "Filiera produttiva locale siciliana",
      "Tintoria con coloranti naturali",
    ],
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 40, color: "#F4C430" }} aria-hidden="true" />,
    title: "Programma Donazione Biancheria",
    description:
      "Al termine del loro ciclo di vita in hotel, le lenzuola vengono donate a cooperative sociali e strutture di accoglienza della provincia di Ragusa. Niente viene buttato: c'è sempre qualcuno che può usarlo.",
    metric: { label: "Biancheria donata invece di smaltita", value: 95 },
    facts: [
      "Partnership con 3 cooperative sociali ragusane",
      "Oltre 1.200 pezzi donati dal 2021",
      "Nessuna biancheria in discarica",
      "Rendicontazione pubblica annuale",
    ],
  },
  {
    icon: <AccessibleIcon sx={{ fontSize: 40, color: "#F4C430" }} aria-hidden="true" />,
    title: "Accessibilità Senza Barriere",
    description:
      "Ogni spazio è progettato per essere accessibile: rampe, porte larghissime, bagni attrezzati, percorsi tattili, spiaggia privata certificata barrier-free con carrozzine anfibie. L'accessibilità non è un extra: è il minimo.",
    metric: { label: "Spazi interni privi di barriere architettoniche", value: 100 },
    facts: [
      "Spiaggia privata certificata barrier-free",
      "Carrozzine anfibie a noleggio gratuito",
      "Ascensore panoramico certificato",
      "Bagni attrezzati in ogni camera",
    ],
  },
  {
    icon: <WaterDropIcon sx={{ fontSize: 40, color: "#F4C430" }} aria-hidden="true" />,
    title: "Gestione Idrica Responsabile",
    description:
      "Raccolta dell'acqua piovana, irrigazione a goccia per l'orto, riduttori di flusso in ogni rubinetto. In Sicilia l'acqua è un bene prezioso: la trattiamo come tale. Consumo pro-capite ridotto del 40% rispetto alla media alberghiera nazionale.",
    metric: { label: "Riduzione consumo idrico vs media nazionale", value: 40 },
    facts: [
      "Cisterna per raccolta acque piovane 15.000 L",
      "Irrigazione a goccia per tutto l'orto",
      "Riduttori di flusso certificati",
      "Monitoraggio digitale dei consumi",
    ],
  },
];

export default function SostenibilitaContent() {
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
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&auto=format&fit=crop&q=75"
          alt="Pannelli solari dell'Hotel Pomelia al tramonto tra gli ulivi siciliani"
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
            Il nostro manifesto
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "3rem" }, mt: 0.5, color: "#FFFFFF" }}>
            Sostenibilità: fatti, non promesse
          </Typography>
        </Container>
      </Box>

      {/* Società Benefit declaration */}
      <Box
        component="section"
        aria-labelledby="sb-heading"
        sx={{ py: { xs: 6, md: 8 }, backgroundColor: "#FAF7F0" }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: "#00A896", fontWeight: 700, letterSpacing: "0.12em", display: "block", textAlign: "center" }}
          >
            Società Benefit
          </Typography>
          <Typography
            id="sb-heading"
            variant="h2"
            sx={{ mt: 1, mb: 3, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}
          >
            Perché siamo una Società Benefit
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 2, mb: 2 }}>
            Dal 2021, Hotel Pomelia S.r.l. è registrata come{" "}
            <strong>Società Benefit</strong> (L. 208/2015). Questo significa che il nostro statuto
            vincola legalmente l&apos;azienda a perseguire, accanto al profitto, uno o più benefici
            comuni: per le persone, per il territorio, per l&apos;ecosistema.
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 2 }}>
            Non si tratta di marketing. Ogni anno pubblichiamo la{" "}
            <strong>Relazione d&apos;Impatto</strong> in cui rendicontiamo le nostre performance
            ambientali e sociali, misurate secondo metodologie indipendenti. Potete richiederla
            alla reception.
          </Typography>
        </Container>
      </Box>

      {/* Pillars */}
      <Box component="section" aria-labelledby="pillars-heading" sx={{ py: { xs: 4, md: 8 }, backgroundColor: "#FFFFFF" }}>
        <Container maxWidth="lg">
          <Typography
            id="pillars-heading"
            variant="h2"
            sx={{ mb: 6, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" } }}
          >
            I sei pilastri del nostro impegno
          </Typography>

          <Grid container spacing={4}>
            {pillars.map((pillar) => (
              <Grid key={pillar.title} size={{ xs: 12, md: 6 }}>
                <Card sx={{ height: "100%", p: 1 }}>
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", mb: 2 }}>
                      {pillar.icon}
                      <Typography component="h3" variant="h6" sx={{ fontWeight: 700, pt: 0.5 }}>
                        {pillar.title}
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85, mb: 2 }}>
                      {pillar.description}
                    </Typography>

                    {/* Metric progress bar */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {pillar.metric.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#00A896", fontWeight: 700 }}>
                          {pillar.metric.value}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={pillar.metric.value}
                        aria-label={`${pillar.metric.label}: ${pillar.metric.value}%`}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: "#EEF",
                          "& .MuiLinearProgress-bar": { backgroundColor: "#00A896", borderRadius: 3 },
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 1.5 }} />

                    <Box component="ul" sx={{ pl: 0, m: 0, listStyle: "none" }}>
                      {pillar.facts.map((fact) => (
                        <Box
                          key={fact}
                          component="li"
                          sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 0.5 }}
                        >
                          <Typography
                            component="span"
                            sx={{ color: "#F4C430", fontSize: "0.9rem", lineHeight: "1.6", flexShrink: 0 }}
                            aria-hidden="true"
                          >
                            ·
                          </Typography>
                          <Typography variant="caption" sx={{ lineHeight: 1.7 }}>
                            {fact}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Bottom CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background: "linear-gradient(135deg, #00A896 0%, #007A6E 100%)",
          textAlign: "center",
          color: "#FFFFFF",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ mb: 2, color: "#FFFFFF", fontSize: { xs: "1.5rem", md: "2rem" } }}>
            Scegli il turismo che fa la differenza
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", mb: 4, lineHeight: 1.8 }}>
            Ogni prenotazione diretta con Hotel Pomelia elimina le commissioni degli intermediari
            e destina il 2% del ricavo a progetti di riforestazione della Valle dell&apos;Ippari.
          </Typography>
          <Button
            component={NextLink}
            href="/prenota"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            aria-label="Prenota direttamente con Hotel Pomelia"
            sx={{
              backgroundColor: "#F4C430",
              color: "#1A1A2E",
              "&:hover": { backgroundColor: "#D4A820" },
              px: 4,
              py: 1.5,
            }}
          >
            Prenota con impatto positivo
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
