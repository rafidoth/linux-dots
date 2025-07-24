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
        <span className="group-hover/text:scale-[105%]transition delay-75 duration-300 ease-in-out ">
          {children}
        </span>
      </button>
    </Link>
  );
}

export default Btn;
