/* eslint-disable @next/next/no-page-custom-font */
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/app/context/CartContext";
export const metadata = {
  title: "Delivery App",
  description: "Доставка еды и товаров от разных магазинов",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-[#1A1A1A] font-sans">
        <CartProvider>
          <Header />
          <main className="max-w-7xl mx-auto">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
