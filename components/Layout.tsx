import Head from 'next/head';
import { useRouter } from 'next/router';

import { ReactNode } from 'react';
import { NotesContextType, PageMeta } from '../types';

interface Props extends NotesContextType {
  children: ReactNode;
  meta?: PageMeta;
}

export default function Layout({ children, meta: pageMeta, notes, setNotes }: Props) {
  const router = useRouter();
  const meta = {
    title: "Let's note",
    description: 'Brought to you by Nhat Anh Dang.',
    cardImage: '/nhatanh.jpg',
    ...pageMeta
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`https://subscription-starter.vercel.app${router.asPath}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vercel" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head>
      <main>{children}</main>
    </>
  );
}
