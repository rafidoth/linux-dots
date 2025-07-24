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
  return (
    <Dialog>
      <DialogTrigger>
        <span
          className={cn(
            hover_style,
            theme_border,
            "flex justify-center border  px-2 cursor-pointer"
          )}
          onClick={() => console.log("add interest")}
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
        <div className="flex flex-wrap gap-2 h-[500px] overflow-y-auto">
          {All_Interests.map((interest) => (
            <span
              className={cn(
                theme_border,
                props.value.some(
                  (selected) => selected.interest_id === interest.interest_id
                )
                  ? theme_style
                  : hover_style,
                "flex justify-center border p-2 cursor-pointer"
              )}
              key={interest.interest_id}
              onClick={() => {
                if (
                  props.value.some(
                    (selected) => selected.interest_id === interest.interest_id
                  )
                ) {
                  if (props.value.length === 1) {
                    setErr("Atleast 1 interest should be selected");
                  } else {
                    props.updateInterestList(
                      props.value.filter(
                        (i) => i.interest_id !== interest.interest_id
                      )
                    );
                    setErr(null);
                  }
                } else {
                  if (props.value.length < props.SelectCount) {
                    // add interest
                    props.updateInterestList([...value, interest]);
                    setErr(null);
                  } else {
                    setErr("Atmost 5 interests can be selected");
                  }
                }
              }}
            >
              {interest.interest_name}
            </span>
          ))}
        </div>

        {err && <span className="text-red-500">{err}</span>}
        <DialogClose>
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
