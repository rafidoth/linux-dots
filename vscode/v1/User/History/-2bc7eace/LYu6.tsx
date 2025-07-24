"use client";
import { getMyProfileDetailsStudent } from "@/app/lib/fetchers/student";
import { StudentInfoType } from "@/app/types";
import InterestBox from "@/app/ui/InterestBoxUI/InterestBox";
import { getAvatar } from "@/app/utils/utility";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState<StudentInfoType | null>(null);

  useEffect(() => {
    const fn = async () => {
      const p: StudentInfoType = await getMyProfileDetailsStudent();
      setMyProfile(p);
    };
    fn();
  }, []);

  if (myProfile) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-x-4 items-center justify-end p-3 w-1/2">
          <div className="flex flex-col bg-orange-800/30   rounded-md">
            <span className="text-4xl font-bold px-6 text-orange-500">
              {myProfile.name}
            </span>
            <span className="text-xl px-6 border-t border-orange-500/20">
              {myProfile.email}
            </span>
          </div>
          <Image
            src={
              myProfile.image_link.length
                ? myProfile.image_link
                : getAvatar(myProfile.username)
            }
            alt="myprofile"
            width={100}
            height={100}
            className="border-2 border-orange-900/40 rounded-full"
          />
        </div>

        <div className="w-1/2">
          <InterestBox role="student" />
        </div>
      </div>
    );
  }
};

export default MyProfile;
