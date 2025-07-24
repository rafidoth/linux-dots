import Link from "next/link";
import React from "react";

type Props = {
  content: string;
  className?: string;
  onClick?: () => void;
  urlPath?: string;
};

function Btn({ content, className, onClick, urlPath }: Props) {
  return (
    <Link href={urlPath ? urlPath : ""}>
      <button></button>
    </Link>
  );
}

export default Btn;
