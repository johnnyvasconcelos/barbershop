"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "./ui/dialog";
import {
  MenuIcon,
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  LogInIcon,
  Scissors,
  Wand2,
  Sparkles,
  Smile,
  Eye,
} from "lucide-react";
import { signIn, signOut } from "next-auth/react";
const MenuMobile = ({ quickSearchOptions }: { quickSearchOptions: any[] }) => {
  const handleClickWithGoogleClick = async () => {
    await signIn("google");
  };
  const handleSignOut = () => {
    signOut();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cabelo":
        return <Scissors size={14} />;
      case "barba":
        return <Wand2 size={14} />;
      case "bigode":
        return <Sparkles size={14} />;
      case "massagem":
        return <Smile size={14} />;
      case "sobrancelha":
        return <Eye size={14} />;
      default:
        return <Scissors size={14} />;
    }
  };
  const { data } = useSession();
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="bg-background">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          <div className="px-5 py-4 flex items-center justify-between gap-4 border-b border-solid">
            {data?.user ? (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={data?.user?.image ?? ""}></AvatarImage>
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-bold">{data.user.name}</p>
                  <p className="text-xs">{data.user.email}</p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-lg">Olá, faça seu login!</h2>
                <Dialog>
                  <DialogTrigger>
                    <Button size="icon">
                      <LogInIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background wi[90%]">
                    <DialogHeader>
                      <DialogTitle>Faça login na plataforma</DialogTitle>
                      <DialogDescription>
                        Conecte-se usando sua conta Google
                      </DialogDescription>
                    </DialogHeader>
                    <Button
                      variant="outline"
                      className="gap-2 font-bold"
                      onClick={handleClickWithGoogleClick}
                    >
                      <Image
                        alt="google icon svg"
                        width={18}
                        height={18}
                        src="/google.svg"
                      />
                      Google
                    </Button>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          <div className="p-5 flex flex-col gap-4 border-b border-solid">
            <Button className="flex gap-2 justify-start" asChild>
              <SheetClose asChild>
                <Link href="/">
                  <HomeIcon size={18} />
                  Início
                </Link>
              </SheetClose>
            </Button>
            <Button className="flex gap-2 justify-start" variant="ghost">
              <CalendarIcon size={18} />
              Agendamentos
            </Button>
          </div>
          <div className="px-5 py-4 flex flex-col gap-4 border-b border-solid">
            {quickSearchOptions.map(
              (option: { title: string; imageUrl: string }) => (
                <Button
                  key={option.title}
                  className="flex gap-2 justify-start"
                  variant="ghost"
                  asChild
                >
                  <Link href={`/barbershops?search=${option.title}`}>
                    {getIcon(option.imageUrl)}
                    {option.title}
                  </Link>
                </Button>
              ),
            )}
          </div>
          <div className="px-5 py-4 flex flex-col gap-4">
            <Button className="flex gap-3" onClick={handleSignOut}>
              <LogOutIcon />
              <span>Sair da conta</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MenuMobile;
