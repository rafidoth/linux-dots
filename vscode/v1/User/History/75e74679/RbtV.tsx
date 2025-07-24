"use client";

export default function GenearatedQuizViewLoading() {
  return (
    <div className={`w-full max-h-full overflow-hidden p-2 flex flex-col`}>
      <div className="h-[800px] flex overflow-auto scrollbar flex-wrap gap-4 items-center">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className=" flex flex-col gap-4 animate-pulse bg-gray-300/10 h-[300px] w-[400px] rounded-xl p-5"
          >
            <div className="h-6 bg-gray-300/30 rounded w-full mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-300/30 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-300/30 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-300/30 rounded w-1/2 animate-pulse"></div>
            <div className="h-6 bg-gray-300/30 rounded w-1/2 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
