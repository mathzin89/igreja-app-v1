"use client";

import { useState } from 'react';
// Link não está sendo usado, pode ser removido
// import Link from 'next/link'; 
import { Button } from '@mui/material';
import { BibleBook } from '@/lib/bible';

// --- 1. Definição de Tipos e Props Corrigida ---
// Este é o formato que o componente PAI espera
interface VersePayload {
  title: string;
  content: string;
    startIndex?: number; // ✅ Adicione esta linha. O '?' a torna opcional.
}

interface BiblePageClientProps {
  allBooks: BibleBook[];
  // ✅ CORRIGIDO: A prop agora espera o formato correto { title, content }
  onVerseSelect: (verse: VersePayload) => void;
}


export default function BiblePageClient({ allBooks, onVerseSelect }: BiblePageClientProps) {
  const [view, setView] = useState<'books' | 'chapters' | 'verses'>('books');
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapterNum, setSelectedChapterNum] = useState<number | null>(null);

  const antigoTestamento = allBooks.filter(b => b.periodo?.includes('Antigo'));
  const novoTestamento = allBooks.filter(b => b.periodo?.includes('Novo'));

  const handleBookClick = (book: BibleBook) => {
    setSelectedBook(book);
    setView('chapters');
  };

  const handleChapterClick = (chapterNumber: number) => {
    setSelectedChapterNum(chapterNumber);
    setView('verses');
  };

  // --- 2. Lógica de Seleção do Versículo Corrigida ---
const handleVerseClick = (verseNumber: number) => {
    if (selectedBook && selectedChapterNum !== null) {
      // 1. Pega TODOS os versículos do capítulo
      const chapterVerses: string[] = selectedBook.capitulos[selectedChapterNum - 1];
      
      // 2. Junta todos os versículos em uma única string, separados por '\n\n'
      const fullChapterContent = chapterVerses
        .map(verse => verse.substring(verse.indexOf(' ') + 1)) // Remove o "1 ", "2 ", etc. do início
        .join('\n\n');

      // 3. Cria o título para o CAPÍTULO
      const chapterTitle = `${selectedBook.nome} ${selectedChapterNum}`;
      
      // 4. Chama a função passando o capítulo inteiro e o índice inicial
      onVerseSelect({
        title: chapterTitle,
        content: fullChapterContent,
        startIndex: verseNumber - 1 // O índice do array (ex: versículo 1 é o índice 0)
      });
    }
  };

  // --- Renderização Condicional (seu código aqui já estava ótimo) ---

  if (view === 'verses' && selectedBook && selectedChapterNum !== null) {
    const chapterVersesStrings: string[] = selectedBook.capitulos[selectedChapterNum - 1] || [];
    const verseNumbers = Array.from({ length: chapterVersesStrings.length }, (_, i) => i + 1);

    return (
      <div className="bible-navigation-container">
        <Button onClick={() => setView('chapters')} variant="outlined" color="primary">
          &larr; Voltar para Capítulos
        </Button>
        <h2>{selectedBook.nome} {selectedChapterNum}</h2>
        <p>Selecione um versículo para adicionar à playlist:</p>
        <div className="verse-grid">
          {verseNumbers.map((verseNumber) => (
            <Button
              key={verseNumber}
              onClick={() => handleVerseClick(verseNumber)}
              variant="contained"
              color="secondary"
              className="verse-button"
            >
              {verseNumber}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (view === 'chapters' && selectedBook) {
    const totalChapters = selectedBook.capitulos.length;
    const chapterNumbers = Array.from({ length: totalChapters }, (_, i) => i + 1);

    return (
      <div className="bible-navigation-container">
        <Button onClick={() => { setView('books'); setSelectedBook(null); }} variant="outlined" color="primary">
          &larr; Voltar para a Lista de Livros
        </Button>
        <h2>{selectedBook.nome}</h2>
        <p>Selecione um capítulo:</p>
        <div className="chapter-grid">
          {chapterNumbers.map((chapterNumber) => (
            <Button
              key={chapterNumber}
              onClick={() => handleChapterClick(chapterNumber)}
              variant="contained"
              color="primary"
              className="chapter-link"
            >
              {chapterNumber}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bible-navigation-container">
      <div className="testament-section">
        <h2>Antigo Testamento</h2>
        <div className="bible-book-grid">
          {antigoTestamento.map(book => (
            <Button
              key={book.nome}
              onClick={() => handleBookClick(book)}
              variant="outlined"
              color="primary"
              className="book-button"
            >
              {book.nome}
            </Button>
          ))}
        </div>
      </div>
      <div className="testament-section">
        <h2>Novo Testamento</h2>
        <div className="bible-book-grid">
          {novoTestamento.map(book => (
            <Button
              key={book.nome}
              onClick={() => handleBookClick(book)}
              variant="outlined"
              color="primary"
              className="book-button"
            >
              {book.nome}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}