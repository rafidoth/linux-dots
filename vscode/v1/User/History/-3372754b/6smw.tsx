import React from "react";

type Props = {};

const RowBorderedBox = (props: Props) => {
  return (
    <span className="flex flex-col bg-orange-800/30  text-orange-500 rounded-md m-2 py-3 w-full">
      <div className="flex items-center justify-between px-4">
        <span className="text-3xl font-semibold py-2">Interests</span>
        <span className="flex items-center text-xl gap-x-2">
          {interestList.length}/{maxInterests}
          <AddInterestBtn
            SelectCount={maxInterests}
            updateInterestList={(newInterstList: InterestType[]) => {
              setInterestList(newInterstList);
            }}
            value={interestList}
          />
        </span>
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

export default RowBorderedBox;
