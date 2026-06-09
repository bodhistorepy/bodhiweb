"use client";

import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, ShoppingBagIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from "@/context/CartContext";

type NavItem = {
  name: string;
  href: string;
};

const storeNavigation: NavItem[] = [
  { name: 'Shop All', href: '/pedidos' },
];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const customerId = localStorage.getItem("bodhi_customer_id");
    setIsLoggedIn(!!customerId);
  }, []);

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-[#3D2A25]/90 backdrop-blur-md border-b border-white/5 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          <div className="flex items-center space-x-10">
            <div className="flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-full p-2 text-[#A89F91] hover:bg-white/5 hover:text-[#F4EFE6] focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>

            <Link href="/" className="text-2xl font-black tracking-[0.2em] text-[#F4EFE6] hover:opacity-80 transition-opacity uppercase">
              Bodhi
            </Link>

            <div className="hidden sm:flex sm:space-x-8">
              {storeNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActive ? 'text-[#F4EFE6] font-semibold' : 'text-[#A89F91] hover:text-[#F4EFE6]',
                      'text-sm font-medium tracking-wide transition-colors duration-200'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button type="button" className="p-2 text-[#A89F91] hover:text-[#F4EFE6] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
              <span className="sr-only">Search catalog</span>
              <MagnifyingGlassIcon className="size-5.5" aria-hidden="true" />
            </button>

            {/* Carrito vinculado a la página /carrito */}
            <Link href="/carrito">
              <button type="button" className="relative p-2 text-[#A89F91] hover:text-[#F4EFE6] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
                <ShoppingBagIcon className="size-5.5" aria-hidden="true" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-[#F4EFE6] text-[10px] font-bold text-[#3D2A25]">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-[#3D2A25] border-t border-white/5">
        <div className="space-y-1 px-4 py-4">
          {storeNavigation.map((item) => (
            <DisclosureButton key={item.name} as="div" className="block">
              <Link href={item.href} className="block rounded-lg py-2.5 text-base font-medium text-[#A89F91] hover:bg-white/5 hover:text-[#F4EFE6]">
                {item.name}
              </Link>
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}