import { Inter } from 'next/font/google';
import './globals.css';
import SecurityWrapper from '@/components/ui/SecurityWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Course Creator Studio',
  description: 'Create beautiful, engaging online courses with our intuitive course creation platform. Build courses with drag-and-drop curriculum, media uploads, pricing, and more.',
  keywords: ['course creation', 'online courses', 'LMS', 'education platform', 'course builder'],
  openGraph: {
    title: 'Course Creator Studio',
    description: 'The easiest way to create and publish online courses',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SecurityWrapper>
          {children}
        </SecurityWrapper>
      </body>
    </html>
  );
}
