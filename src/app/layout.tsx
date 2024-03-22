import '@/styles/reset.css'
import '@/styles/globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-row md:flex-row md:overflow-hidden">
          <div className="w-1/3">
            <Nav />
          </div>
          <div className="w-full flex justify-center items-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
