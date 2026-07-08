import './globals.css';
import ClientRobotWidget from '@/components/ClientRobotWidget';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.aryanshakya.in'),
  title: {
    default: 'Aryan Shakya | Founder of Votiv Labs — Full Stack & IoT Engineer',
    template: '%s | Aryan Shakya — Votiv Labs',
  },
  description: 'Official portfolio of Aryan Shakya, Founder of Votiv Labs (www.votivlabs.in). Full-stack web developer, creative coder & IoT engineer building Next.js, Three.js, and AI robotics systems.',
  keywords: ['Aryan Shakya', 'Votiv Labs', 'Founder Votiv Labs', 'Full Stack Developer', 'IoT Engineer', 'Creative Coder', 'Next.js Developer', 'Aryan Shakya Pune', 'Web Developer India', 'React Developer'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
  },
};

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-ST5GQJZ2Q6';

  return (
    <html lang="en">
      <head>
        {/* Comprehensive SEO / AEO / GEO JSON-LD Schema with Sitelinks & Social Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  '@id': 'https://www.aryanshakya.in/#website',
                  url: 'https://www.aryanshakya.in',
                  name: 'Aryan Shakya — Full Stack Developer & IoT Engineer',
                  description: 'Official portfolio of Aryan Shakya. Full-Stack Web Developer, Creative Coder, IoT Engineer, and Founder of Votiv Labs.',
                  publisher: { '@id': 'https://www.aryanshakya.in/#person' },
                },
                {
                  '@type': 'Person',
                  '@id': 'https://www.aryanshakya.in/#person',
                  name: 'Aryan Shakya',
                  url: 'https://www.aryanshakya.in',
                  image: 'https://www.aryanshakya.in/images/aryan.png',
                  jobTitle: 'Full Stack Web Developer, Creative Coder & IoT Engineer',
                  description: 'Full-Stack Developer & IoT Engineer specializing in Next.js, React, Three.js, ESP32 robotics, and AI systems.',
                  founder: {
                    '@type': 'Organization',
                    name: 'Votiv Labs',
                    url: 'https://www.votivlabs.in',
                    description: 'Freelance Web Development, AI Engineering & Custom Software Agency founded by Aryan Shakya',
                  },
                  worksFor: {
                    '@type': 'Organization',
                    name: 'Votiv Labs',
                    url: 'https://www.votivlabs.in',
                  },
                  sameAs: [
                    'https://github.com/Aryan-Shakya',
                    'https://www.linkedin.com/in/aryan-shakya-73035a385/',
                    'https://www.instagram.com/aryanshakya______/',
                    'https://www.votivlabs.in',
                  ],
                  knowsAbout: ['Web Development', 'IoT', 'React', 'Next.js', 'Three.js', 'ESP32', 'Node.js', 'AI Engineering', 'Votiv Labs'],
                },
                {
                  '@type': 'SiteNavigationElement',
                  name: ['About Aryan Shakya', 'Technical Skills & IoT', 'Featured Projects', 'Tech & IoT Engineering Blog', 'Votiv Labs Freelance Agency'],
                  url: [
                    'https://www.aryanshakya.in/#about',
                    'https://www.aryanshakya.in/#skills',
                    'https://www.aryanshakya.in/#projects',
                    'https://www.aryanshakya.in/blog',
                    'https://www.votivlabs.in',
                  ],
                },
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
        <ClientRobotWidget />
      </body>
    </html>
  );
}
