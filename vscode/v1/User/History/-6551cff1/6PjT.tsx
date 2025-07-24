import React from "react";
import { MentorPublicProfileType } from "../types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { theme_style } from "./CustomStyles";

type Props = {
  MentorProfile: MentorPublicProfileType;
};

const MentorProfile = ({ MentorProfile }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 p-5 ">
      <div className="flex gap-x-10">
        <div className="flex flex-col items-center m-4 w-[800px]">
          <div>
            <Image
              src={MentorProfile.profile_pic}
              alt="avatar"
              width={200}
              height={200}
              className="border rounded-4xl"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-end text-lg">
              <span className=" bg-orange-800 font-semibold px-2 rounded-xl flex justify-center items-center">
                Mentor
              </span>
            </div>
            <div className={`text-6xl  font-bold`}>{MentorProfile.name}</div>
            <div className="flex gap-x-4 text-xl text-muted-foreground justify-end">
              <div>@{MentorProfile.username}</div>
              <div>{MentorProfile.email}</div>
            </div>
            <div className="flex justify-end my-3">
              <Button
                size={"custom"}
                variant={"outline"}
                className="cursor-pointer"
              >
                Message
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col  font-semibold">
          <div className="flex flex-col justify-end gap-x-3 my-4 text-2xl w-full">
            <span
              className={cn(
                theme_style,
                " flex justify-center w-48 rounded-xl px-2"
              )}
            >
              Interested At
            </span>
            <div className="flex gap-4 flex-wrap my-4">
              {MentorProfile.interests.map((interest) => (
                <span
                  key={interest.interest_id}
                  className="bg-orange-800 text-lg font-normal px-2 rounded-md "
                >
                  {interest.interest_name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
