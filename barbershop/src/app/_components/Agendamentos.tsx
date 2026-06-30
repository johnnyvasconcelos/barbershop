import { Badge } from "../_components/ui/badge";
import { Card, CardContent } from "../_components/ui/card";
import { Avatar, AvatarImage } from "../_components/ui/avatar";
const Agendamentos = () => {
  return (
    <>
      <Card className="mt-3">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="rounded-xl w-fit">Confirmado</Badge>
            <h3>Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src="/user.webp"></AvatarImage>
              </Avatar>
              <p className="text-sm font-semibold">Barbearia do Juvenal</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center px-5 border-l-2 border-solid border-l-[#212122]">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Agendamentos;
