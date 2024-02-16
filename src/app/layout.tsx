import '@/app/globals.css'

import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import Contacts from '@/components/Contacts';
import { ReactNode } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import classNames from 'classnames';
 
interface RootLayoutProps {
  children: ReactNode
}

const nunito = Nunito_Sans({ subsets: ['cyrillic', 'latin'], weight: ['800', '700', '600', '500', '400', '300', '200'] })

export const metadata: Metadata = {
  title: 'Детская горнолыжная школа в Красной Поляне | KRASKIDS',
  description: 'Kraskids — детская горнолыжная школа, созданная сообществом профессиональных инструкторов Красной Поляны. Групповое обучение от 1800₽/2часа. Индивидуальное обучение от/3300₽/час.',
  /*viewport: {
    initialScale: 1,
    width: 'device-width',
    userScalable: false,
    viewportFit: 'contain'
  }*/
}

export default function Layout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        
      </head>
      <body 
        className={classNames(nunito.className, 'w-full')} 
        style={{ scrollSnapType: 'y mandatory' }}>
      <Header />
      {children}
      </body>
    </html>
  );
}
