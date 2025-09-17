"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// Imports de autenticação do Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
// Imports do Material-UI
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, CssBaseline, CircularProgress, Button, IconButton
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 240;

const menuItems = [
  { text: 'Membros', icon: <PeopleIcon />, path: '/admin' }, // Dashboard geralmente em /admin
  { text: 'Finanças', icon: <AttachMoneyIcon />, path: '/admin/financas' },
  { text: 'Eventos', icon: <EventIcon />, path: '/admin/eventos' },
  { text: 'Slides', icon: <SlideshowIcon />, path: '/admin/slides' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false); // Estado para controlar o Drawer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Erro ao fazer logout: ", error);
      alert("Não foi possível sair. Tente novamente.");
    }
  };

  const getPageTitle = () => {
    if (!pathname) {
      return 'Painel Administrativo';
    }
    const currentItem = menuItems.find(item => {
      if (item.path === '/admin') {
        return pathname === '/admin';
      }
      return pathname.startsWith(item.path);
    });

    if (pathname.includes('/admin/slides/') && pathname !== '/admin/slides') {
      return 'Editar Slides';
    }
    return currentItem ? currentItem.text : 'Painel Administrativo';
  };

  if (loading || !user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        className="non-printable"
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: '#1C2536',
          color: 'white',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Ícone do hambúrguer, visível SEMPRE */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }} // Removido display: { sm: 'none' }
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {getPageTitle()}
          </Typography>
          <Button color="inherit" component={Link} href="/" startIcon={<HomeIcon />} sx={{ ml: 2 }}>
            Voltar ao Site
          </Button>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout} sx={{ ml: 2 }}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: drawerWidth, flexShrink: 0 }} // Largura base para o Drawer (irá flutuar)
        aria-label="caixa de entrada"
      >
        {/* ✅ ESTE É O ÚNICO DRAWER QUE DEVE EXISTIR NESTE ARQUIVO */}
        <Drawer
          variant="temporary" // ✅ GARANTIR QUE É TEMPORARY
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: 'block', // ✅ O Drawer é sempre um bloco, sua visibilidade é controlada por 'open'
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1C2536',
              color: 'white',
            },
          }}
        >
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
              AD Plenitude
            </Typography>
          </Toolbar>
          <List>
            {menuItems.map((item) => (
              <Link href={item.path} key={item.text} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={pathname === item.path || (item.path === '/admin' && pathname === '/admin')}
                    sx={{
                      '&.Mui-selected': { backgroundColor: 'rgba(25, 118, 210, 0.5)' },
                      '&.Mui-selected:hover': { backgroundColor: 'rgba(25, 118, 210, 0.6)' },
                      '& .MuiListItemIcon-root': { color: 'white' }
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
        {/* ❌ REMOVA QUALQUER OUTRO <Drawer> AQUI! Especialmente um com variant="permanent" */}
      </Box>

      {/* Conteúdo Principal do Admin */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%', // ✅ Conteúdo principal ocupa 100% da largura disponível
          mt: '64px', // Margem superior para respeitar a AppBar
          bgcolor: 'background.default',
        }}
      >
        {/* Toolbar "vazia" para espaçar o conteúdo em mobile (se a AppBar for pequena) */}
        <Toolbar className="non-printable" sx={{ display: { xs: 'block', sm: 'none' } }} />
        {children}
      </Box>
    </Box>
  );
}