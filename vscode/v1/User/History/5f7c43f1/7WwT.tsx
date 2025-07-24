import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTheme } from "next-themes";

type Prop = {
  src?: string;
  width?: number;
  height?: number;
};
export default function Logo({ width, height }: Prop) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, [theme]);
  if (!mounted) return null;
  return (
    <div className={`rounded rounded-md`}>
      <Link href="/">
        {mounted && (
          <Image
            className={"rounded rounded-sm"}
            src={theme === "light" ? "/jigao_dark.svg" : "/jigao.svg"}
            alt="logo"
            width={width ? width : 50}
            height={height ? height : 50}
          />
        )}
      </Link>
    </div>
  );
}
