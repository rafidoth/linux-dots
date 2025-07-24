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
      <button className={`${className} group/text`}>
        <p className="transition-all duration-300 ease-in-out hover:scale-105">
          {children}
        </p>
      </button>
    </Link>
  );
}

export default Btn;
