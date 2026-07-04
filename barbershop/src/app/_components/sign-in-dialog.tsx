import {
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
export const SignInDialog = () => {
  const handleClickWithGoogleClick = async () => {
    await signIn("google");
  };
  return (
    <>
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
    </>
  );
};
