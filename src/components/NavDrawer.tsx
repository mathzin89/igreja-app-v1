// src/components/NavDrawer.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  AppBar, Toolbar, Button, Box, Container, Typography, IconButton, Tooltip,
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/site-ad-plenitude.firebasestorage.app/o/logo-plenitude.png?alt=media&token=1a61b486-b9a6-49ab-bfc1-56140700f9cb"
        alt="Logo AD Plenitude"
        width={160}
        height={45}
        style={{ objectFit: 'contain', margin: '16px auto' }}
        priority
      />
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Início" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/culto">
            <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
            <ListItemText primary="Painel de Culto" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/sobre-nos">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Sobre Nós" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/eventos">
            <ListItemIcon><EventIcon /></ListItemIcon>
            <ListItemText primary="Eventos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/contato">
            <ListItemIcon><ContactMailIcon /></ListItemIcon>
            <ListItemText primary="Contato" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/login">
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Acesso Restrito" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', boxShadow: 'none' }}>
      <Container maxWidth="lg">
        {/* Adicionado 'alignItems: "center"' na Toolbar para alinhar os itens verticalmente */}
        <Toolbar sx={{ minHeight: '64px', py: 1, alignItems: "center" }}> 
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
            {/* O Box em torno da imagem agora tem 'position: relative' para 'fill' funcionar corretamente */}
            {/* E uma altura explícita para o logo ocupar o espaço vertical necessário */}
            <Box sx={{ 
                width: { xs: '120px', sm: '160px' }, 
                height: { xs: '40px', sm: '45px' }, // Altura responsiva para o logo
                display: 'flex', 
                alignItems: 'center', 
                position: 'relative' // Essencial para Image com fill
            }}>
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/site-ad-plenitude.firebasestorage.app/o/logo-plenitude.png?alt=media&token=1a61b486-b9a6-49ab-bfc1-56140700f9cb"
                alt="Logo AD Plenitude"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          {/* --- MENU PARA TELAS GRANDES (MD E ACIMA) --- */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Button color="inherit" sx={{ color: '#333', fontWeight: 600 }} component={Link} href="/">Início</Button>
            <Button color="inherit" sx={{ color: '#333', fontWeight: 600 }} component={Link} href="/culto">Painel de Culto</Button>
            <Button color="inherit" sx={{ color: '#333', fontWeight: 600 }} component={Link} href="/sobre-nos">Sobre Nós</Button>
            <Button color="inherit" sx={{ color: '#333', fontWeight: 600 }} component={Link} href="/contato">Contato</Button>
            <Button variant="contained" color="primary" component={Link} href="/login" sx={{ ml: 2, borderRadius: '20px' }}>
              Acesso Restrito
            </Button>
          </Box>

          {/* --- MENU PARA TELAS PEQUENAS (XS) --- */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Button variant="contained" size="small" color="primary" component={Link} href="/login" sx={{ mr: 1, borderRadius: '20px' }}>
              Acesso
            </Button>
            <IconButton
              color="primary"
              aria-label="abrir menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* DRAWER (MENU LATERAL) PARA MOBILE */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawerContent}
        </Drawer>
      </nav>
    </AppBar>
  );
}