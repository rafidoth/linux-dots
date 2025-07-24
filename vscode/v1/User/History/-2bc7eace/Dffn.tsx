"use client";
import { getMyProfileDetailsStudent } from "@/app/lib/fetchers/student";
import { updateStudentProfile } from "@/app/lib/mutations/student";
import { StudentInfoType } from "@/app/types";
import { hover_style, theme_style } from "@/app/ui/CustomStyles";
import EditableField from "@/app/ui/EditableField";
import InterestBox from "@/app/ui/InterestBoxUI/InterestBox";
import {
  RowBorderedBox,
  RowBorderedBoxHeader,
  RowBorderedBoxRow,
} from "@/app/ui/RowBorderedBox";
import { getAvatar } from "@/app/utils/utility";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const [myProfile, setMyProfile] = useState<StudentInfoType | null>(null);
  const [unsaved, setUnsaved] = useState<boolean>(false);

  useEffect(() => {
    const fn = async () => {
      const p: StudentInfoType = await getMyProfileDetailsStudent();
      setMyProfile(p);
    };
    fn();
  }, []);

  const handleSave = async () => {
    try {
      if (myProfile) {
        await updateStudentProfile(myProfile, null);
        setUnsaved(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (myProfile) {
    return (
      <div className="flex flex-col items-center relative">
        {unsaved && (
          <div
            onClick={handleSave}
            className="w-full bg-orange-800/10 py-1 mb-5 absolute flex justify-center"
          >
            <span
              className={cn(
                hover_style,
                theme_style,
                "py-1 px-2 rounded-md select-none"
              )}
            >
              Save Changes
            </span>
          </div>
        )}
        <div className="flex gap-x-4 items-center justify-end p-3 w-1/2 mt-10">
          <div className="flex flex-col bg-orange-800/30 rounded-md">
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
                    setUnsaved(true);
                    setMyProfile((prev) =>
                      prev ? { ...prev, bio: newVal } : null
                    );
                  }}
                  value={myProfile.bio || ""}
                  placeholder=""
                  editIcon
                />
              </span>
            </RowBorderedBoxRow>
          </RowBorderedBox>
          <InterestBox role="student" />
        </div>
      </div>
    );
  }
};

export default MyProfile;
