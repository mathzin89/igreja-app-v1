// src/app/layout.tsx
// REMOVA "use client"; daqui!
import type { Metadata } from 'next';
import { Merriweather, Lato } from 'next/font/google';
import React from 'react'; // Não precisa mais de Link e Image aqui

// Imports do Material-UI. Remova os que são usados apenas no NavDrawer
import { Box, Container, Typography } from '@mui/material'; // Reduzir imports

// Importando o AuthProvider
import { AuthProvider } from '../firebase/AuthContext'; 

import ThemeRegistry from '@/theme/ThemeRegistry';
import './globals.css';

// Importe o novo Client Component
import NavDrawer from '@/components/NavDrawer'; // Ajuste o caminho se seu componente está em outro lugar

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-merriweather',
});
const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

// A metadata DEVE estar em um Server Component
export const metadata: Metadata = {
  title: 'AD Plenitude',
  description: 'Igreja Assembleia de Deus Plenitude',
  // Viewport pode ser definida aqui para Next.js 13+ App Router
  viewport: 'width=device-width, initial-scale=1', 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={`${merriweather.variable} ${lato.variable}`}>
      <head>
        {/* A meta tag viewport não é mais estritamente necessária aqui se estiver em `metadata` acima,
            mas mantê-la não causa problemas e funciona como fallback.
            Porém, para seguir a recomendação do Next.js, preferimos na metadata.
        */}
      </head>
      <body>
        <AuthProvider>
          <ThemeRegistry>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              {/* Renderiza o Client Component que contém o AppBar e o Drawer */}
              <NavDrawer />

              <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'var(--background-light)' }}>
                {children}
              </Box>

              <Box
                component="footer"
                sx={{ backgroundColor: '#1C2536', color: 'white', py: 4, mt: 'auto' }}
              >
                <Container maxWidth="lg">
                  <Typography variant="body1" align="center" gutterBottom>
                    Assembleia de Deus Plenitude
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" align="center">
                    Sede: R. Tauro, 70 - Jd. Novo Horizonte - Carapicuíba - SP
                  </Typography>
                </Container>
              </Box>
            </Box>
          </ThemeRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}
