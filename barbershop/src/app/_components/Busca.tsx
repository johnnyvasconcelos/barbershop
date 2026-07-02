"use client";

import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "../_components/ui/input";
import { useRouter } from "next/navigation";

const Busca = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    router.push(`/barbershops?search=${search}`);
  };

  return (
    <>
      <div className="flex mt-5 flex-row justify-content items-center gap-2">
        <Input
          placeholder="Faça sua busca..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <SearchIcon className="cursor-pointer" onClick={handleSubmit} />
      </div>
    </>
  );
};

export default Busca;
