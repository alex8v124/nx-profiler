'use client';

import dynamic from 'next/dynamic';

const BackgroundNetwork = dynamic(() => import('./background-network'), { ssr: false });

export default function ClientBackground() {
  return <BackgroundNetwork />;
}
