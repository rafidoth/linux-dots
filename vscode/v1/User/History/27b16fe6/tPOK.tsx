"use client";
import { getMyProfileDetailsMentor } from "@/app/lib/fetchers/mentor";
import { MentorInfoType } from "@/app/types";
import EditableField from "@/app/ui/EditableField";
import InterestBox from "@/app/ui/InterestBoxUI/InterestBox";
import {
  RowBorderedBox,
  RowBorderedBoxHeader,
  RowBorderedBoxRow,
} from "@/app/ui/RowBorderedBox";
import { getAvatar } from "@/app/utils/utility";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState<MentorInfoType | null>(null);

  useEffect(() => {
    const fn = async () => {
      const p: MentorInfoType = await getMyProfileDetailsMentor();
      setMyProfile(p);
    };
    fn();
  }, []);

  if (myProfile) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex gap-x-4 items-center justify-end p-3 w-1/2">
          <div className="flex flex-col bg-orange-800/30   rounded-md">
            <span className="text-4xl py-2 font-bold px-6 text-orange-500">
              {myProfile.name}
            </span>
            <span className="text-xl py-2 px-6 border-t border-orange-500/20">
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
          <RowBorderedBox>
            <RowBorderedBoxHeader>
              <span className="text-3xl font-semibold">Bio</span>
            </RowBorderedBoxHeader>
            <RowBorderedBoxRow>
              <span>
                <EditableField
                  onChange={(newVal) => {
                    setMyProfile((prev) =>
                      prev ? { ...prev, bio: newVal } : null
                    );
                  }}
                  value={myProfile.bio || ""}
                  placeholder="Enter your bio"
                  editIcon
                />
              </span>
            </RowBorderedBoxRow>
          </RowBorderedBox>
          <InterestBox role="mentor" />
        </div>
      </div>
    );
  }
};

export default MyProfile;
