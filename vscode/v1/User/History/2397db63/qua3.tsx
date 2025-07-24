"use client";
import { minutesToHours } from "@/app/(student)/s/group-sessions/page";
import { createGroupDiscussion } from "@/app/lib/mutations";
import { DateTimePicker } from "@/app/ui/CalendarUI/CustomDateTimePicker";
import { hover_style, smooth_hover, theme_border } from "@/app/ui/CustomStyles";
import { Select, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectContent, SelectItem } from "@radix-ui/react-select";
import { CornerDownLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CreateGroupSession = () => {
  const router = useRouter();
  const [titleEditing, setTitleEditing] = React.useState<boolean>(false);
  const [endTime, setEndTime] = React.useState<Date>(new Date());
  const [GroupSessionCreateInfo, setGroupSessionCreateInfo] = React.useState<{
    title: string;
    description: string;
    startDate: Date;
    durationInMinutes: number;
    maxParticipants: number;
  }>({
    title: "Untitled Group Session",
    description: "",
    startDate: new Date(),
    durationInMinutes: 0,
    maxParticipants: 25,
  });
  return (
    <div className="p-16">
      <div>
        {!titleEditing && (
          <div
            className="flex items-center gap-4 hover:bg-zinc-900 p-4 rounded-md select-none"
            onClick={() => setTitleEditing(true)}
          >
            <span className="font-semibold text-4xl">
              {GroupSessionCreateInfo.title.length > 0
                ? GroupSessionCreateInfo.title
                : "Untitled Group Session"}
            </span>
            <span>
              <Edit />
            </span>
          </div>
        )}

        {titleEditing && (
          <div className="flex items-center gap-4">
            <input
              type="text"
              onChange={(e) =>
                setGroupSessionCreateInfo({
                  ...GroupSessionCreateInfo,
                  title: e.target.value,
                })
              }
              onFocus={(e) => e.target.select()}
              value={GroupSessionCreateInfo.title}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setTitleEditing(false);
                }
              }}
              onBlur={() => setTitleEditing(false)}
              className="bg-transparent border-b-2 border-b-zinc-500 text-4xl font-semibold outline-none"
              placeholder={GroupSessionCreateInfo.title}
            />
            <span
              className="hover:bg-zinc-900 p-2 rounded-md cursor-pointer"
              onClick={() => setTitleEditing(false)}
            >
              <CornerDownLeft />
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-4 ">
        <textarea
          placeholder="Write a description of your group session here"
          className="border rounded-lg w-[700px]  p-5"
        ></textarea>

        <div className="flex flex-col gap-4 border p-5 rounded-xl">
          <span>
            <Select
              onValueChange={(value) => {
                setGroupSessionCreateInfo({
                  ...GroupSessionCreateInfo,
                  maxParticipants: parseInt(value),
                });
              }}
            >
              <SelectTrigger className="w-[200px]">
                {GroupSessionCreateInfo.maxParticipants}
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 rounded-xl  font-semibold">
                {Array.from({ length: 9 }, (_, i) => (
                  <SelectItem
                    className="select-none w-[200px] flex justify-center"
                    key={i}
                    value={(10 + i * 5).toString()}
                  >
                    {10 + i * 5}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </span>
          Start Time
          <DateTimePicker
            field={{
              value: GroupSessionCreateInfo.startDate,
              onChange: (value: Date) => {
                setGroupSessionCreateInfo({
                  ...GroupSessionCreateInfo,
                  startDate: value,
                });
              },
            }}
          />
          End Time
          <DateTimePicker
            field={{
              value: endTime,
              onChange: (value: Date) => {
                setEndTime(value);
                setGroupSessionCreateInfo({
                  ...GroupSessionCreateInfo,
                  durationInMinutes: Math.floor(
                    (value.getTime() -
                      GroupSessionCreateInfo.startDate.getTime()) /
                      1000 /
                      60
                  ),
                });
              },
            }}
          />
          <span className="flex gap-x-2">
            <span className="font-semibold">Duration </span>

            {minutesToHours(GroupSessionCreateInfo.durationInMinutes)}
          </span>
          <span
            className={cn(
              smooth_hover,
              theme_border,
              hover_style,
              "flex justify-center select-none "
            )}
            onClick={() => {
              const mentorId = localStorage.getItem("menotor-id");
              if (mentorId) {
                const data = createGroupDiscussion({
                  ...GroupSessionCreateInfo,
                  mentorId: mentorId,
                });
                console.log(data);
              } else {
                router.push("/sign-in");
              }
            }}
          >
            Create
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupSession;
