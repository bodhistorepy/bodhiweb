"use client";

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ShoppingBagIcon, MagnifyingGlassIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-[#3D2A25]/90 backdrop-blur-md border-b border-white/5 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left Block Group: Hamburger (Mobile) OR Logo + Links (Desktop) */}
          <div className="flex items-center space-x-10">
            
            {/* 1. Mobile Menu Button */}
            <div className="flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-full p-2 text-[#A89F91] hover:bg-white/5 hover:text-[#F4EFE6] focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>

            {/* 2. Brand Identity Logo */}
            <Link href="/" className="text-2xl font-black tracking-[0.2em] text-[#F4EFE6] hover:opacity-80 transition-opacity uppercase">
              Bodhi
            </Link>

            {/* 3. Desktop Navigation Links - Sits right next to the Logo */}
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

          {/* Right Block Group: Utility Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Button */}
            <button type="button" className="p-2 text-[#A89F91] hover:text-[#F4EFE6] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
              <span className="sr-only">Search catalog</span>
              <MagnifyingGlassIcon className="size-5.5" aria-hidden="true" />
            </button>

            {/* Account Dropdown */}
            <Menu as="div" className="relative hidden sm:block">
              <MenuButton className="p-2 text-[#A89F91] hover:text-[#F4EFE6] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
                <span className="sr-only">User account</span>
                <UserIcon className="size-5.5" aria-hidden="true" />
              </MenuButton>
              
              <MenuItems
                transition
                className="absolute right-0 z-50 mt-3 w-48 origin-top-right rounded-xl bg-[#3D2A25] p-1 shadow-xl ring-1 ring-white/5 transition focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50 data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in"
              >
                <MenuItem>
                  <Link href="/account" className="block rounded-lg px-4 py-2.5 text-sm text-[#A89F91] data-focus:bg-white/5 data-focus:text-[#F4EFE6]">
                    My Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/orders" className="block rounded-lg px-4 py-2.5 text-sm text-[#A89F91] data-focus:bg-white/5 data-focus:text-[#F4EFE6]">
                    Order History
                  </Link>
                </MenuItem>
                <hr className="my-1 border-white/10" />
                <MenuItem>
                  <button className="block w-full text-left rounded-lg px-4 py-2.5 text-sm text-red-400 data-focus:bg-red-500/10">
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            {/* Shopping Cart Trigger */}
            <button type="button" className="relative p-2 text-[#A89F91] hover:text-[#F4EFE6] transition-colors rounded-full focus:outline-none focus:ring-2 focus:ring-[#A89F91]/50">
              <ShoppingBagIcon className="size-5.5" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full bg-[#F4EFE6] text-[10px] font-bold text-[#3D2A25]">
                0
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      <DisclosurePanel className="sm:hidden bg-[#3D2A25] border-t border-white/5">
        <div className="space-y-1 px-4 py-4">
          {storeNavigation.map((item) => (
            <DisclosureButton key={item.name} as="div" className="block">
              <Link
                href={item.href}
                className="block rounded-lg py-2.5 text-base font-medium text-[#A89F91] hover:bg-white/5 hover:text-[#F4EFE6]"
              >
                {item.name}
              </Link>
            </DisclosureButton>
          ))}
          <hr className="my-3 border-white/10" />
          <Link href="/account" className="block py-2.5 text-base font-medium text-[#A89F91] hover:bg-white/5 hover:text-[#F4EFE6]">
            My Account
          </Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}