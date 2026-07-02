import { Card, CardContent } from "./ui/card";

import MenuMobile from "../_components/MenuMobile";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  // categorias da barbearia
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
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Link href="/">
          <Image
            src="/logo.webp"
            height={18}
            width={120}
            alt="barbershop - logo."
          />
        </Link>
        <MenuMobile quickSearchOptions={quickSearchOptions} />
      </CardContent>
    </Card>
  );
};

export default Header;
