"use client";

export default function GenearatedQuizViewLoading() {
  return (
    <div className={`w-full max-h-full overflow-hidden p-2 flex flex-col`}>
      <div className="h-[800px] flex overflow-auto scrollbar flex-wrap gap-4 items-center">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-300/5 h-[300px] w-[400px] rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
}
