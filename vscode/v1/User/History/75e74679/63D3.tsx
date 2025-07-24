"use client";

export default function GenearatedQuizViewLoading() {
  return (
    <div className={`w-full max-h-full overflow-hidden p-2 flex flex-col`}>
      <div className="flex justify-between h-[40px] my-4 pr-4">
        <div className="border rounded-sm h-full flex items-center justify-center px-2">
          <div className="animate-pulse bg-gray-300 h-4 w-24"></div>
        </div>
        <div className="h-full flex justify-center items-center border rounded-sm px-4">
          <div className="animate-pulse bg-gray-300 h-4 w-20"></div>
        </div>
        <div className="h-full flex justify-center items-center border rounded-sm px-2">
          <div className="animate-pulse bg-gray-300 h-4 w-36"></div>
        </div>
        <div className="h-full flex justify-center items-center border rounded-sm px-2">
          <div className="animate-pulse bg-gray-300 h-4 w-36"></div>
        </div>
        <div className="h-full flex justify-center items-center border rounded-sm px-2">
          <div className="animate-pulse bg-gray-300 h-8 w-8"></div>
        </div>
      </div>
      <div className="h-[800px] flex overflow-auto scrollbar flex-wrap gap-4 items-center">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-300 h-40 w-60"
          ></div>
        ))}
      </div>
    </div>
  );
}
