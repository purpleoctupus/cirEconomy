import Image from "next/image";

export default function Home() {
  return (
    <div className="m-5">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/logo.webp"
          alt="logo"
          width={180}
          height={38}
          priority
        />
        </main>
    </div>
  );
}
