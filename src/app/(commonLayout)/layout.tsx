import { Footer } from "@/components/HomeComponents/Footer";
import { Header } from "@/components/HomeComponents/Header";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="grow-1"> {children}</div>
      <Footer />
    </div>
  );
}
