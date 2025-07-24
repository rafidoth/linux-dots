import Link from "next/link";
import React from "react";

type Props = {
  content: string;
  className?: string;
  onClick?: () => void;
  urlPath?: string;
};

function Btn({}: Props) {
  return (
    <Link>
      <button></button>
    </Link>
  );
}

export default Btn;
