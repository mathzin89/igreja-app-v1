// src/app/culto/WorshipPanelClient.tsx
"use client";

import { useState } from "react";
import { BibleBook } from "@/lib/bible";
import HymnListPageClient from "../harpa/HymnListPageClient";
import BiblePageClient from "../biblia/BiblePageClient";
import PresentationView from "@/components/PresentationView";
import FreeSlidesClient from "./FreeSlidesClient";

// MUI
import { 
  Paper, Box, Tabs, Tab, Grid, 
  List, ListItem, ListItemText, 
  IconButton, Button, Typography 
} from "@mui/material"; 
import DeleteIcon from '@mui/icons-material/Delete'; 

// --- ATUALIZADO: PlaylistItem ---
type PlaylistItem = {  
  title: string;  
  content: string;  
  type: 'hino' | 'biblia' | 'text-slide' | 'slide-custom' | 'image-slide'; 
  id: string; 
  numero?: number; 
  imageUrl?: string; // Para slides de imagem
};

// --- ATUALIZADO: PresentationContent ---
type PresentationContent = { 
  title: string; 
  content: string; 
  startIndex?: number; 
  type: 'hino' | 'biblia' | 'text-slide' | 'slide-custom' | 'image-slide'; 
  imageUrl?: string; 
};

type Props = {
  allBooks: BibleBook[];
};

export default function WorshipPanelClient({ allBooks }: Props) {
  const [activeTab, setActiveTab] = useState<'harpa' | 'biblia' | 'slides'>('harpa');
  
  const [presentationContent, setPresentationContent] = useState<PresentationContent | null>(null);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);

  const handleAddItemToPlaylist = (item: Omit<PlaylistItem, 'id'>) => {
    const newItem = { ...item, id: `${item.type}-${Date.now()}-${Math.random().toString(36).substring(7)}` };
    setPlaylist((prev) => [...prev, newItem]);
  };

  const handleRemoveItemFromPlaylist = (id: string) => {
    setPlaylist((prev) => prev.filter(item => item.id !== id));
  };

  const handleStartPresentation = (item: PlaylistItem) => {
    setPresentationContent({
      title: item.title,
      content: item.content,
      startIndex: item.type === 'biblia' && item.numero ? item.numero - 1 : 0, 
      type: item.type,
      imageUrl: item.imageUrl
    });
  };

  if (presentationContent) {
    return (
      <PresentationView 
        content={presentationContent}
        onClose={() => setPresentationContent(null)}
        startIndex={presentationContent.startIndex}
      />
    );
  }

  return (
    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
      <Grid container spacing={3} sx={{ width: '100%', maxWidth: 'lg' }}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
              <Tab label="Harpa Cristã" value="harpa" />
              <Tab label="Bíblia Sagrada" value="biblia" />
              <Tab label="Slides" value="slides" />
            </Tabs>
            <Box sx={{ mt: 2 }}>
              {activeTab === 'harpa' && (
                <HymnListPageClient hideTitle={true} onHymnSelect={(hino) => handleAddItemToPlaylist({ ...hino, type: 'hino' })} />
              )}
              {activeTab === 'biblia' && (
                <BiblePageClient allBooks={allBooks} onVerseSelect={(verso) => handleAddItemToPlaylist({ ...verso, type: 'biblia' })} />
              )}
              {activeTab === 'slides' && (
                <FreeSlidesClient onSlideSelect={handleAddItemToPlaylist} />
              )}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
            <Typography variant="h5" gutterBottom>Playlist de Apresentação</Typography>
            {playlist.length === 0 ? (
              <Typography variant="body2" color="text.secondary">Adicione itens para começar a apresentar.</Typography>
            ) : (
              <List>
                {playlist.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{ pr: { xs: '180px', sm: '210px', md: '230px' }, position: 'relative' }} 
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItemFromPlaylist(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={item.title} secondary={`Tipo: ${item.type}`} />
                    <Button 
                      variant="contained" 
                      size="small" 
                      onClick={() => handleStartPresentation(item)}
                      sx={{ position: 'absolute', right: { xs: '60px', sm: '70px', md: '80px' } }} 
                    >
                      Apresentar
                    </Button>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}