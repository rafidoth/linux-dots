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
      <button className={className}>{content}</button>
    </Link>
  );
}

export default Btn;
