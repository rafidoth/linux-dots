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
      <button className={`${className} bg-jigao text-white`}>
        <p className="transition-all duration-300 ease-in-out hover:scale-110 ">
          {children}
        </p>
      </button>
    </Link>
  );
}

export default Btn;
