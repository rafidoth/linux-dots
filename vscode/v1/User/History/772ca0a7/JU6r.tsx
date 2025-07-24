import Link from "next/link";
import React, { Children } from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  urlPath?: string;
};

function Btn({ children, className, urlPath }: Props) {
  return (
    <Link href={urlPath ? urlPath : ""}>
      <button className={`${className} bg-jigao text-white hover:bg-jigao/50`}>
        {children}
      </button>
    </Link>
  );
}

export default Btn;
