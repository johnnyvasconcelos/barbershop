"use client";

import { Card, CardContent } from "./ui/card";
import MenuMobile from "../_components/MenuMobile";
import Image from "next/image";
import Link from "next/link";
import { Calendar, LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { SignInDialog } from "./sign-in-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { data } = useSession();

  interface QuickSearchOption {
    imageUrl: string;
    title: string;
  }

  const quickSearchOptions: QuickSearchOption[] = [
    { imageUrl: "cabelo", title: "Cabelo" },
    { imageUrl: "barba", title: "Barba" },
    { imageUrl: "bigode", title: "Bigode" },
    { imageUrl: "massagem", title: "Massagem" },
    { imageUrl: "sobrancelha", title: "Sobrancelha" },
  ];

  const handleLogoutClick = () => signOut();

  return (
    <Card>
      <CardContent className="p-5 w-full max-w-7xl mx-auto flex flex-row justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.webp"
            height={18}
            width={120}
            alt="barbershop - logo."
          />
        </Link>

        <div className="md:hidden">
          <MenuMobile quickSearchOptions={quickSearchOptions} />
        </div>

        <div className="hidden md:flex items-center gap-6">
          {data?.user && (
            <Link
              href="/bookings"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Agendamentos
            </Link>
          )}

          {data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 outline-none cursor-pointer">
                <Avatar className="w-7 h-7">
                  <AvatarImage
                    src={data.user.image ?? ""}
                    alt={data.user.name ?? ""}
                  />
                </Avatar>
                <span className="text-sm font-medium">
                  {data.user.name?.split(" ")[0]}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogoutClick}
                  className="text-red-500 focus:text-red-500 gap-2 cursor-pointer"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 font-bold">Login</Button>
              </DialogTrigger>
              <SignInDialog />
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
