import './globals.css';
import RobotChatWidget from '@/components/RobotChatWidget';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aryanshakya.in'),
  title: {
    default: 'Aryan Shakya — Developer & Creator',
    template: '%s | Aryan Shakya',
  },
  description: 'Full-stack developer, creative coder & IoT engineer building digital experiences that shift perception. Based in India.',
  keywords: ['Aryan Shakya', 'Full Stack Developer', 'IoT Engineer', 'Creative Coder', 'Next.js Developer', 'Portfolio', 'Web Developer India', 'React Developer'],
  authors: [{ name: 'Aryan Shakya', url: 'https://www.aryanshakya.in' }],
  creator: 'Aryan Shakya',
  publisher: 'Aryan Shakya',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.aryanshakya.in',
    siteName: 'Aryan Shakya',
    title: 'Aryan Shakya — Developer & Creator',
    description: 'Full-stack developer, creative coder & IoT engineer building digital experiences that shift perception.',
    images: [
      {
        url: '/images/aryan.png',
        width: 1200,
        height: 630,
        alt: 'Aryan Shakya — Developer & Creator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Shakya — Developer & Creator',
    description: 'Full-stack developer, creative coder & IoT engineer.',
    images: ['/images/aryan.png'],
  },
  alternates: {
    canonical: 'https://www.aryanshakya.in',
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Aryan Shakya',
              url: 'https://www.aryanshakya.in',
              image: 'https://www.aryanshakya.in/images/aryan.png',
              jobTitle: 'Full Stack Developer & IoT Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Votiv Labs',
                url: 'https://www.votivlabs.in',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Thakur College of Engineering and Technology',
              },
              knowsAbout: ['Web Development', 'IoT', 'React', 'Next.js', 'Three.js', 'ESP32', 'Node.js'],
              sameAs: [
                'https://github.com/Aryan-Shakya',
                'https://www.linkedin.com/in/aryan-shakya-73035a385/',
                'https://www.instagram.com/aryanshakya______/',
              ],
            }),
          }}
        />
        {/* Google Analytics */}
        {gaId && gaId !== 'G-XXXXXXXXXX' && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        {children}
        <RobotChatWidget />
      </body>
    </html>
  );
}
