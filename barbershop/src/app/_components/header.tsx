import { Card, CardContent } from "./ui/card";

import MenuMobile from "../_components/MenuMobile";
import Image from "next/image";

const Header = ({
  quickSearchOptions,
  getIcon,
}: {
  quickSearchOptions: any[];
  getIcon: (iconName: string) => any;
}) => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between items-center">
        <Image
          src="/logo.webp"
          height={18}
          width={120}
          alt="barbershop - logo."
        />
        <MenuMobile getIcon={getIcon} quickSearchOptions={quickSearchOptions} />
      </CardContent>
    </Card>
  );
};

export default Header;
