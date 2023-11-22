import Image from "next/image";

const Logo = () => {
  return (
    <Image
        src="/logo.svg"
        alt="Logo"
        height={30}
        width={30}
    />
  );
};

export default Logo;