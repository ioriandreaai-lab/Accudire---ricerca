export const metadata = {
  title: 'Trova Struttura | Accudire.it',
  description: 'Ti aiutiamo a trovare la struttura giusta per il tuo caro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="it">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
