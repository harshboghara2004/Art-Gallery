"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import logoImg from "@/public/assets/icon.png";
import { useState } from "react";
import Link from "next/link";
import NavigationTabs from "./NavigationTabs";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MainHeaderClient = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    redirect("/sign-in");
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex flex-row">
            <Image className="h-8 w-auto" src={logoImg} alt="" />
            <span className="font-bold py-1 ml-4 text-black"> Art Gallery</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavigationTabs classes="text-sm font-semibold leading-6 text-gray-900" />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <div className="flex gap-x-2">
              <Link href={`/profile/${user.username}`} className="flex gap-x-2">
                <Image
                  src={user.photoUrl}
                  width={30}
                  height={10}
                  alt="profile-photo"
                  className="rounded-full"
                />
                <p className="text-sm font-medium py-2">{user.name},</p>
              </Link>
              <span className="sm:ml-3">
                <button
                  type="submit"
                  onClick={handleLogout}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log Out
                </button>
              </span>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex flex-row">
              <Image className="h-8 w-auto" src={logoImg} alt="" />
              <span className="font-bold py-1 ml-4 text-black">
                {" "}
                Art Gallery
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavigationTabs classes="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" />
              </div>
              <div className="py-6">
                {user ? (
                  <div className="flex gap-x-2">
                    <Link
                      href={`/profile/${user.username}`}
                      className="flex gap-x-2"
                    >
                      <Image
                        src={user.photoUrl}
                        width={40}
                        height={10}
                        alt="profile-photo"
                        className="rounded-full"
                      />
                      <p className="text-sm font-medium py-2">{user.name},</p>
                    </Link>
                    <span className="sm:ml-3">
                      <button
                        onClick={handleLogout}
                        type="submit"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Log Out
                      </button>
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/sign-in"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Sign in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default MainHeaderClient;
