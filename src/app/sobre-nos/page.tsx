"use client";

import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Divider, Tabs, Tab, Button } from '@mui/material';
import Link from 'next/link';

// Componente TabPanel (sem alterações)
function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function SobreNosPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', py: 6 }}>
      <Container maxWidth="lg">
        {/* Seção de Título e História (Intacta) */}
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          textAlign="center" 
          sx={{ fontWeight: 'bold', fontFamily: 'var(--font-merriweather)', color: '#1c3d5a' }}
        >
          Sobre a AD Plenitude
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          textAlign="center" 
          sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}
        >
          O início de um ministério abençoado por Deus
        </Typography>
        <Divider sx={{ mb: 6 }} />
        <Box sx={{ my: 5 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'var(--font-merriweather)', color: '#333' }} textAlign="center">
            Nossa História
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555',  }} textAlign="center">
            O ministério Plenitude, se iniciou sendo chamado como ministério Pleno, anos atrás foi aberto esse ministério porém com o passar do tempo, ocorreu uma proposta de poder unificar os ministérios, onde o pastor presidente Josenildo, foi de acordo e então a partir disto (2005) foi inaugurado um novo ministério, conhecido como Assembléia de Deus Plenitude.
Com o passar dos anos o ministério foi crescendo e prosperando debaixo dá graça de Deus, onde houve muitas passagens de diferentes pessoas que só agregaram para o crescimento do ministério. Hoje já consolidado, como um dos ministérios mais conhecidos em Carapícuiba, o ministério Plenitude, segue sendo referência para todas as igrejas e pessoas que passam ou visitam ela.
          </Typography>
        </Box>
        
        <Divider sx={{ my: 6 }} />

        {/* Seção Liderança Pastoral e Congregações */}
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontFamily: 'var(--font-merriweather)', mb: 4, color: '#1c3d5a' }}>
            Nossa Liderança Pastoral
          </Typography>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Igreja Sede" />
              <Tab label="Primeiro de Maio" />
            </Tabs>
          </Box>
          
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={8} md={5}>
                <Card>
                  <CardMedia component="img" height="350" image="/images/casal-pastoral.jpg" alt="Foto dos Pastores Presidentes" />
                  <CardContent>
                    <Typography variant="h6">Pastor Josenildo e Pastora Maria Lucia</Typography>
                    <Typography variant="body2" color="text.secondary">Pastores Presidentes</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                <Card>
                  <CardMedia component="img" height="350" image="/images/pastor-antonio.jpg" alt="Foto do Pastor Antonio" />
                  <CardContent>
                    <Typography variant="h6">Pastor Antonio</Typography>
                    <Typography variant="body2" color="text.secondary">Pastor</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={8} md={5}>
                <Card>
                  <CardMedia component="img" height="350" image="/images/pastor_delson.jpg" alt="Foto do Pastor Delson" />
                  <CardContent>
                    <Typography variant="h6">Pastor Delson</Typography>
                    <Typography variant="body2" color="text.secondary">Pastor</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {/* Liderança Primeiro de Maio */}
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia component="img" height="300" image="/images/lider-placeholder.jpg" alt="Dirigentes" />
                  <CardContent>
                    <Typography variant="h6">Pastor Igor Henrique e Pastora Jéssica</Typography>
                    <Typography variant="body2" color="text.secondary">Dirigentes da Congregação Primeiro de Maio</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

        </Box>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button variant="contained" component={Link} href="/ministerios">
            Conheça Todos os Nossos Ministérios
          </Button>
        </Box>
      </Container>
    </Box>
  );
}