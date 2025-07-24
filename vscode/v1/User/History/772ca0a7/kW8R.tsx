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
        <p className="transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 hover:shadow-lg">
          {children}
        </p>
      </button>
    </Link>
  );
}

export default Btn;
