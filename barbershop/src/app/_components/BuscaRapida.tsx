import QuickSearchButton from "../_components/QuickSearchButton";
const BuscaRapida = () => {
  // categorias da barbearia
  interface QuickSearchOption {
    imageUrl: string;
    title: string;
  }

  const quickSearchOptions: QuickSearchOption[] = [
    { imageUrl: "cabelo", title: "Cabelo" },
    { imageUrl: "barba", title: "Barba" },
    { imageUrl: "bigode", title: "Bigode" },
    { imageUrl: "massagem", title: "Massagem" },
    { imageUrl: "sobrancelha", title: "Sobrancelha" },
  ];
  return (
    <>
      <div className="flex mt-5 gap-2 overflow-x-auto overflow-y-hidden py-[2px] scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {quickSearchOptions.map((option) => (
          <QuickSearchButton
            key={option.title}
            imageUrl={option.imageUrl}
            title={option.title}
          />
        ))}
      </div>
    </>
  );
};

export default BuscaRapida;
