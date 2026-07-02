import { Card, CardContent } from "./ui/card";

import MenuMobile from "../_components/MenuMobile";
import Image from "next/image";

const Header = ({ quickSearchOptions }: { quickSearchOptions: any[] }) => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Image
          src="/logo.webp"
          height={18}
          width={120}
          alt="barbershop - logo."
        />
        <MenuMobile quickSearchOptions={quickSearchOptions} />
      </CardContent>
    </Card>
  );
};

export default Header;
