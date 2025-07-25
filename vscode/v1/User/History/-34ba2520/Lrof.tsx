import React, { useState } from "react";
import { hover_style, theme_border, theme_style } from "./CustomStyles";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InterestType } from "../types";
import { All_Interests } from "../data/fake";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { updateInterestList } from "../lib/mutations/student";

type Props = {
  SelectCount: number;
  student?: boolean;
  updateInterestList: (newInterests: InterestType[]) => void;
  value: InterestType[];
};

const AddInterestBtn = (props: Props) => {
  const [selectedInterests, setSelectedInterests] = useState<InterestType[]>(
    props.value
  );
  const [err, setErr] = React.useState<string | null>(null);
  const handleSubmission = async () => {
    updateInterestList(selectedInterests);
    await updateInterestList(selectedInterests);
  };
  console.log(selectedInterests);
  return (
    <Dialog>
      <DialogTrigger>
        <span
          className={cn(
            hover_style,
            theme_border,
            "flex justify-center border  px-2 cursor-pointer"
          )}
        >
          +
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex justify-between pr-5">
          Add interests
          <span>
            {selectedInterests.length}/{props.SelectCount}
          </span>
        </DialogTitle>
        <ScrollArea>
          <div className="flex flex-wrap gap-2 h-[500px] ">
            {All_Interests.map((interest) => (
              <span
                className={cn(
                  theme_border,
                  selectedInterests.some(
                    (selected) => selected.interest_id === interest.interest_id
                  )
                    ? theme_style
                    : hover_style,
                  "flex justify-center border p-2 cursor-pointer"
                )}
                key={interest.interest_id}
                onClick={() => {
                  if (
                    selectedInterests.some(
                      (selected) =>
                        selected.interest_id === interest.interest_id
                    )
                  ) {
                    if (props.value.length === 1) {
                      setErr("Atleast 1 interest should be selected");
                    } else {
                      setSelectedInterests(
                        selectedInterests.filter(
                          (i) => i.interest_id !== interest.interest_id
                        )
                      );
                      setErr(null);
                    }
                  } else {
                    if (selectedInterests.length < props.SelectCount) {
                      // add interest
                      setSelectedInterests([...selectedInterests, interest]);
                      setErr(null);
                    } else {
                      setErr(
                        `Atmost ${props.SelectCount} interests can be selected`
                      );
                    }
                  }
                }}
              >
                {interest.interest_name}
              </span>
            ))}
          </div>
          <ScrollBar orientation={"vertical"} />
        </ScrollArea>
        {err && <span className="text-red-500">{err}</span>}
        <DialogClose onClick={handleSubmission}>
          <span
            className={cn(
              theme_border,
              hover_style,
              "flex justify-center p-2 cursor-pointer"
            )}
          >
            Done
          </span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddInterestBtn;
