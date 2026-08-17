import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Balcon Solar — Soare pe balcon. Mai puțin pe factură.",
  description: "Sisteme solare compacte pentru apartamente din România. Calculează economia și înscrie-te pentru o ofertă de testare.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ro"><body>{children}</body></html>;
}
