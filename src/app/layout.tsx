import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Build a Habit For Me',
  description: 'A web app the help you use the Coaching Habits, Habit Formula to create a new habit.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-black'>{children}</body>
    </html>
  )
}
