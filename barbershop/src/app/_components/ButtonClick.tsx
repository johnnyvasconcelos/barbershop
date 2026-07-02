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
    >
      Copiar
    </Button>
  );
};

export default ButtonClick;
