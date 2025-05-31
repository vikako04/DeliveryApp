"use client";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

export default function Header() {
  const { cart } = useCart();
  console.log("cart в Header:", cart);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };
  if (loading) return null;
  return (
    <header className="bg-white shadow-md py-4 px-6 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="logo text-2xl font-bold text-[var(--color-primary)]"
        >
          DeliveryApp
        </Link>
        <nav className="flex space-x-4">
          {user ? (
            <>
              {user.role === "admin" && (
                <div className="transition duration-400 transform hover:scale-105">
                  <Link
                    href="/admin/orders"
                    className="font-semibold px-4 py-2 rounded-xl transition duration-400 transform hover:bg-[var(--color-primary-light)] hover:shadow-sm hover:text-[var(--color-primary-dark)]"
                  >
                    Admin Panel
                    <span className="pi pi-wrench ml-3 text-xl relative top-[1px]"></span>
                  </Link>
                </div>
              )}
              <div className="transition duration-400 transform  hover:scale-105">
                <Link
                  href="/cart"
                  className=" font-semibold px-4 py-2 rounded-xl  transition duration-400 transform hover:bg-[var(--color-primary-light)] hover:shadow-sm hover:text-[var(--color-primary-dark)]"
                >
                  Cart
                  <span className="pi pi-shopping-bag ml-3 text-xl relative top-[1px]">
                    {totalQuantity > 0 && (
                      <span className="relative right-[13px] bottom-[2px] text-xs font-semibold">
                        {totalQuantity}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
              <div className="transition duration-400 transform  hover:scale-105">
                <Link
                  href="/profile"
                  className=" font-semibold px-4 py-2 rounded-xl  transition duration-400 transform hover:bg-[var(--color-primary-light)] hover:shadow-sm hover:text-[var(--color-primary-dark)]"
                >
                  Profile
                  <span className="pi pi-user ml-3 text-xl relative top-[3px]"></span>
                </Link>
              </div>
              <div className="transition duration-400 transform  hover:scale-105">
                <a
                  href="#"
                  className="font-semibold  px-4 py-2 rounded-xl  duration-400 transform-colors hover:bg-[var(--color-primary-light)] hover:shadow-sm hover:text-[var(--color-primary-dark)]"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Log out
                  <span className="pi pi-sign-out ml-3 text-xl relative top-[2px]"></span>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="transition duration-400 transform  hover:scale-105">
                <Link
                  href="/login"
                  className=" font-semibold px-4 py-2 rounded-xl  transition duration-400 transform hover:bg-[var(--color-primary-light)] hover:shadow-sm hover:text-[var(--color-primary-dark)]"
                >
                  Sign in
                  <span className="pi pi-sign-in ml-3 text-xl relative top-[3px]"></span>
                </Link>
              </div>
              <div className="transition duration-400 transform  hover:scale-105">
                <Link
                  href="/register"
                  className=" font-semibold  px-4 py-2 rounded-xl  duration-400 transform-colors hover:bg-[var(--color-primary-light)] hover:shadow-sm hover:text-[var(--color-primary-dark)]"
                >
                  Sign up
                  <span className="pi pi-user-plus ml-3 text-xl relative top-[2px]"></span>
                </Link>
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
