import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import { Poppins } from 'next/font/google';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
    weight: ['400', '600', '700'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Valorant Teams",
  description: "Created to solve your teams problems",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={ `${poppins.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                },
                success: {
                    iconTheme: {
                        primary: 'green',
                        secondary: 'white',
                    },
                },
                error: {
                    iconTheme: {
                        primary: 'red',
                        secondary: 'white',
                    },
                },
            }}
        />
      </body>
    </html>
  );
}
