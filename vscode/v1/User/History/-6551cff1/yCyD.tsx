import React from "react";
import { MentorPublicProfileType } from "../types";
import Image from "next/image";

type Props = {
  MentorProfile: MentorPublicProfileType;
};

const MentorProfile = ({ MentorProfile }: Props) => {
  return (
    <div className="flex flex-col gap-y-4 p-5 ">
      <div className="flex justify-between">
        <div className="flex flex-col  items-center  m-4">
          <div>
            <Image
              src={MentorProfile.profile_pic}
              alt="avatar"
              width={200}
              height={200}
              className="border rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-end text-lg">
              <span className=" bg-orange-500/30 px-2 rounded-xl flex justify-center items-center">
                Mentor
              </span>
            </div>
            <div className={`text-6xl ${jakarta.className} font-black`}>
              {MentorProfile.name}
            </div>
            <div className="flex gap-x-4 text-xl text-muted-foreground justify-end">
              <div>@{MentorProfile.username}</div>
              <div>
                {props.student
                  ? studentPersonalInfo?.email
                  : mentorPersonalInfo?.email}
              </div>
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
          <div className="flex justify-end gap-x-3 my-4 text-2xl w-full">
            <span
              className={cn(
                theme_style,
                " flex justify-center w-48 rounded-xl px-2"
              )}
            >
              Interested At
            </span>
            {isOwnProfile && (
              <AddInterestBtn
                student={true}
                setStudentInterests={(newInterests: InterestType[]) => {
                  updateStudentInterests(newInterests);
                }}
                SelectCount={5}
              />
            )}
          </div>
          {props.student && (
            <div className="flex gap-x-4 font-normal flex-wrap gap-y-4 ">
              {studentInterests && (studentInterests ?? []).length > 0 ? (
                (studentInterests ?? []).map((interest) => (
                  <span
                    key={interest.interest_id}
                    className={cn(
                      theme_border,
                      "flex justify-center rounded-full px-4 "
                    )}
                  >
                    {interest.interest_name}
                  </span>
                ))
              ) : (
                <span className=" text-lg font-normal text-muted-foreground">
                  Click the Add Button to add interests
                </span>
              )}
            </div>
          )}

          {!props.student && (
            <div className="flex gap-x-4 font-normal flex-wrap gap-y-4 ">
              {mentorInterests && (mentorInterests ?? []).length > 0 ? (
                (mentorInterests ?? []).map((interest) => (
                  <span
                    key={interest.interest_id}
                    className={cn(
                      theme_border,
                      "flex justify-center rounded-full px-4 "
                    )}
                  >
                    {interest.interest_name}
                  </span>
                ))
              ) : (
                <span className=" text-lg font-normal text-muted-foreground">
                  Click the Add Button to add interests
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
