import Image from "next/image";
const Banner = () => {
  return (
    <>
      <div className="relative w-full h-[130px] mt-5">
        <Image
          src="/banner-01.webp"
          alt="agende no barbershop."
          fill
          className="object-contain rounded"
        />
      </div>
    </>
  );
};

export default Banner;
