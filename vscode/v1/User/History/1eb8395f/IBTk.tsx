import React from "react";

type Props = {};

const Topbar = (props: Props) => {
  return (
    <div
      className={`w-full h-[60px] flex justify-between items-center  mb-2 px-4`}
    >
      <div>
        {!sidebarOpen && (
          <ViewVerticalIcon
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`cursor-pointer
              hover:text-white/50
              w-6 h-6`}
          />
        )}
      </div>
      title :<div>{currentQuizset && <div>{currentQuizset.title}</div>}</div>
      <ThemeChanger />
    </div>
  );
  return <div>Topbar</div>;
};

export default Topbar;
