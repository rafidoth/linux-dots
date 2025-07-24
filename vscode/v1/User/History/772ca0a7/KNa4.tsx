import Link from "next/link";
import React from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  urlPath?: string;
};

function Btn({ children, className, urlPath }: Props) {
  return (
    <Link href={urlPath ? urlPath : ""}>
      <button className={`${className}`}>{children}</button>
    </Link>
  );
}

export default Btn;
