import { Albert_Sans } from 'next/font/google'

const albertSans = Albert_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800']
})

export const metadata = {
  title: 'Trova Struttura | Accudire.it',
  description: 'Ti aiutiamo a trovare la struttura giusta per il tuo caro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <body className={albertSans.className} style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
