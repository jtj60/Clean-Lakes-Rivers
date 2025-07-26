import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import './styles/globals.css'
import LayoutProvider from '@/components/providers/LayoutProvider' // ✅ Import the Client Component
import { ThemeProvider } from '@/components/custom/theme/theme-provider'
import QueryProvider from '@/components/providers/QueryProvider'

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-header',
})

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Clean Lakes and Rivers',
  description:
    'A nonprofit dedicated to protecting and restoring our waterways through community-driven cleanups, education, and environmental stewardship.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${openSans.variable}`}
    >
      <body className="bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
