import { Button } from "@/components/ui/button";
import { specialElite, inter, spaceMono, exo, rubik } from "./utils/font";
import NavigationBar from "./components/NavigationBar";
import Btn from "./components/UI/Btn";
import { GridPattern } from "@/components/ui/grid-pattern";

export default function Home() {
  return (
    <main className={`w-full  flex flex-col justify-center items-center`}>
      <NavigationBar />
      <div
        className="w-full flex flex-col items-center 
        justify-center gap-3 "
      >
        <GridPatternLinearGradient />
        <div
          className={`w-[1200px] h-[600px] flex flex-col justify-center items-center rounded px-10 bg-transparent`}
        >
          {/* <div className={`${inter.className} text-2xl`}>
            <h1 className={`motion-preset-fade`}>
              {`The gem cannot be polished without 
                friction, nor man perfected without trials.`}
            </h1>
          </div> */}
          <div
            className={`${rubik.className} relative motion-preset-shrink font-black my-6 text-9xl rounded-md `}
          >
            <div className="absolute w-full h-full bg-jigao blur-3xl z-0 opacity-10  dark:opacity-50"></div>
            <span
              className={`relative mx-2 px-2 rounded-sm text-jigao dark:text-white z-10`}
            >
              GPT For Quiz
            </span>
          </div>
          <div
            className={`${spaceMono.className} motion-preset-slide-down-lg  py-2 font-semibold text-2xl`}
          >
            Test Knowledge. Share. Compete. Repeat.
          </div>
          <Btn
            className={`motion-preset-slide-up-lg rounded-md w-[200px] h-[50px] m-4 
              font-semibold 
            `}
            urlPath="/dashboard/user"
          >
            Start Now
          </Btn>
        </div>
      </div>
    </main>
  );
}

function GridPatternLinearGradient() {
  return (
    <GridPattern
      width={20}
      height={20}
      x={-1}
      y={-1}
      className={
        "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
      }
    />
  );
}

function GridPatternDashed() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background p-20 md:shadow-xl">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        classname={
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        }
      />
    </div>
  );
}
