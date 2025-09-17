// src/app/culto/[bookSlug]/[chapterNum]/page.tsx
import { notFound } from 'next/navigation';
// Importa getBook (que agora retorna BibleBookWithSlug) e getFullBible (que é o getAllBooks)
import { getBook, getFullBible } from '@/lib/bible';
import BibleVerseSlideClient from '@/components/BibleVerseSlideClient';
import Link from 'next/link';
import React from 'react';

interface ChapterPageProps {
  params: {
    bookSlug: string;
    chapterNum: string;
  };
  searchParams?: {
    modo?: string; // Para ativar o modo slide
    versiculo?: string; // Para o versículo inicial no modo slide
  };
}

// Para metadados (SEO)
export async function generateMetadata({ params }: ChapterPageProps) {
  const { bookSlug, chapterNum } = params;
  const book = await getBook(bookSlug); // getBook agora busca pelo SLUG

  if (!book) {
    return {
      title: 'Capítulo não encontrado',
    };
  }

  const chapterNumber = parseInt(chapterNum, 10);

  return {
    title: `${book.nome} ${chapterNumber} - Versículos Bíblicos`,
    description: `Leia o capítulo ${chapterNumber} do livro de ${book.nome}.`,
  };
}

// --- generateStaticParams (agora usa getFullBible) ---
export async function generateStaticParams() {
  const allBooksWithSlugs = await getFullBible(); // Obtém todos os livros já com os slugs

  const params: { bookSlug: string; chapterNum: string }[] = [];

  for (const book of allBooksWithSlugs) {
    for (let i = 1; i <= book.capitulos.length; i++) {
      params.push({
        bookSlug: book.slug, // Usa o slug que já vem no objeto book
        chapterNum: String(i),
      });
    }
  }

  console.log(`[generateStaticParams] Gerando ${params.length} rotas para a Bíblia.`);
  return params;
}
// --- FIM DA FUNÇÃO generateStaticParams ---

export default async function ChapterPage({ params, searchParams }: ChapterPageProps) {
  const { bookSlug, chapterNum } = params;
  const book = await getBook(bookSlug); // getBook agora busca pelo SLUG

  if (!book) {
    notFound();
  }

  const chapterNumber = parseInt(chapterNum, 10);
  const chapterIndex = chapterNumber - 1; // Ajusta para índice 0-based

  if (chapterIndex < 0 || chapterIndex >= book.capitulos.length) {
    notFound();
  }

  const chapterVerses = book.capitulos[chapterIndex];

  // Verifica se o modo slide está ativado
  const isSlideMode = searchParams?.modo === 'slide';
  const initialVerse = searchParams?.versiculo ? parseInt(searchParams.versiculo, 10) - 1 : 0;

  if (isSlideMode) {
    return (
      <BibleVerseSlideClient
        book={book}
        chapterIndex={chapterIndex}
        initialVerseIndex={initialVerse}
      />
    );
  }

  // Se não estiver no modo slide, mostra a lista de versículos
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-400">
        {book.nome} {chapterNumber}
      </h1>

      {/* Botão para entrar no modo slide */}
      <div className="text-center mb-8">
        <Link
          href={`/culto/${bookSlug}/${chapterNum}?modo=slide`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition duration-300 ease-in-out shadow-lg"
        >
          Iniciar Apresentação de Slides
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapterVerses.map((verseText, index) => (
          <div
            key={index}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold mr-2">
                {index + 1}.
              </span>{' '}
              {verseText}
            </p>
          </div>
        ))}
      </div>

      {/* Navegação entre capítulos */}
      <div className="mt-12 flex justify-between items-center">
        {chapterNumber > 1 && (
          <Link
            href={`/culto/${bookSlug}/${chapterNumber - 1}`}
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline text-xl"
          >
            &larr; Capítulo Anterior
          </Link>
        )}
        {chapterNumber < book.capitulos.length && (
          <Link
            href={`/culto/${bookSlug}/${chapterNumber + 1}`}
            className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline text-xl ml-auto"
          >
            Próximo Capítulo &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
