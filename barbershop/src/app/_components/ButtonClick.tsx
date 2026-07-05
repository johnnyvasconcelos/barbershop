"use client";
import { Button } from "./ui/button";

const ButtonClick = ({ phone }: { phone: string | number }) => {
  return (
    <Button
      onClick={() => {
        if (typeof window !== "undefined") {
          navigator.clipboard.writeText(String(phone));
        }
      }}
      variant="outline"
      className="w-full flex justify-between items-center p-4"
    >
      <span className="text-sm">{phone}</span>
      <span className="text-muted-foreground text-xs font-light">Copiar</span>
    </Button>
  );
};

export default ButtonClick;
