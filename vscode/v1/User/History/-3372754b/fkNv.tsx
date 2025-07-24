import React from "react";

type Props = {};

const RowBorderedBox = (props: Props) => {
  return (
    <span className="flex flex-col bg-orange-800/30  text-orange-500 rounded-md m-2 py-3 w-full">
      <div className="flex items-center justify-between px-4">
        {/* first row (header) */}
      </div>
      {interestList.map((item) => {
        return (
          <span
            key={item.interest_id}
            className="border-t border-orange-500/20 px-4 py-2 text-xl"
          >
            {item.interest_name}
          </span>
        );
      })}
    </span>
  );
};

const RowBorderedBoxRow = () => {
  return <div>RowBorderedBox</div>;
};

export default RowBorderedBox;

export default RowBorderedBox;
