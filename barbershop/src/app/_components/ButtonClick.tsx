"use client";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

const ButtonClick = ({ phone }: { phone: string | number }) => {
  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(String(phone));
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-3">
      <span className="text-sm font-medium text-foreground">{phone}</span>
      <Button
        onClick={handleCopy}
        variant="outline"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-primary"
        title="Copiar telefone"
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ButtonClick;
