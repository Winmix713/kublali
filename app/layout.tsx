import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { UserProvider } from '@/lib/user-context'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </UserProvider>
      </body>
    </html>
  )
}

