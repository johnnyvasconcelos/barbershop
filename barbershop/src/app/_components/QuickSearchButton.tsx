import { Scissors, Wand2, Sparkles, Smile, Eye } from "lucide-react";

interface QuickSearchButtonProps {
  imageUrl: string;
  title: string;
}

export default function QuickSearchButton({
  imageUrl,
  title,
}: QuickSearchButtonProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "cabelo":
        return <Scissors size={14} />;
      case "barba":
        return <Wand2 size={14} />;
      case "bigode":
        return <Sparkles size={14} />;
      case "massagem":
        return <Smile size={14} />;
      case "sobrancelha":
        return <Eye size={14} />;
      default:
        return <Scissors size={14} />;
    }
  };

  return (
    <button className="flex flex-row flex-shrink-0 items-center gap-2 text-white p-3 rounded-xl border border-gray-800 bg-zinc-950 text-nowrap transition-colors hover:bg-zinc-900">
      {getIcon(imageUrl)}
      <span className="text-sm">{title}</span>
    </button>
  );
}
