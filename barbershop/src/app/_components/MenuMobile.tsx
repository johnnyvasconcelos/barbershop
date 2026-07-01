import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import { MenuIcon, HomeIcon, CalendarIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
const MenuMobile = ({
  quickSearchOptions,
  getIcon,
}: {
  quickSearchOptions: any[];
  getIcon: (iconName: string) => any;
}) => {
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

          <div className="px-5 py-4 flex items-center gap-4 border-b border-solid">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></AvatarImage>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-bold">Usuário</p>
              <p className="text-xs">user@gmail.com</p>
            </div>
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
                >
                  {getIcon(option.imageUrl)}
                  {option.title}
                </Button>
              ),
            )}
          </div>
          <div className="px-5 py-4 flex flex-col gap-4">
            <Button className="flex gap-3">
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
