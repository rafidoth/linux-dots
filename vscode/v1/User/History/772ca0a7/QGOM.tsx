import Link from "next/link";
import React from "react";

type Props = {
  content: string;
  className?: string;
  urlPath?: string;
};

function Btn({ content, className, urlPath }: Props) {
  return (
    <Link href={urlPath ? urlPath : ""}>
      <button>{content}</button>
    </Link>
  );
}

export default Btn;
