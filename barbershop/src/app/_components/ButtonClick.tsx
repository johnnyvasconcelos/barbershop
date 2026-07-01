"use client";
import { Button } from "./ui/button";
const ButtonClick = ({ phone }) => {
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
