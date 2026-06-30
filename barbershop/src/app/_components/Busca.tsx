import { SearchIcon } from "lucide-react";
import { Input } from "../_components/ui/input";
const Busca = () => {
  return (
    <>
      <div className="flex mt-5 flex-row justify-content items-center gap-2">
        <Input placeholder="Faça sua busca..." />
        <SearchIcon />
      </div>
    </>
  );
};

export default Busca;
