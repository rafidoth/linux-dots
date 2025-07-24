import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SessionInfoType } from "../types";
import { Clock, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { hover_style, smooth_hover, theme_border } from "./CustomStyles";

type Props = {
  sessionDetails: SessionInfoType;
  student: boolean;
};

const SessionCard = ({ sessionDetails, student }: Props) => {
  return (
    <Card className="w-[350px] my-5 text-lg">
      <CardHeader>
        <CardTitle className="text-3xl">{sessionDetails.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-lg">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{sessionDetails.DurationInMinutes} minutes</span>
        </div>
        <div className="flex items-center gap-2">
          <Banknote className="w-4 h-4" />
          <span>৳{sessionDetails.Price}</span>
        </div>
        <div className="flex gap-2">
          {sessionDetails.session_medium.map((medium) => (
            <span
              key={medium}
              className="text-sm bg-secondary px-2 py-1 rounded"
            >
              {medium}
            </span>
          ))}
        </div>
        <CardDescription className="whitespace-pre-line text-lg">
          {sessionDetails.Description}
        </CardDescription>
      </CardContent>
      {!student && (
        <CardFooter className="flex gap-2">
          <Button size="sm" className="cursor-pointer">
            Edit
          </Button>
          <Button variant="destructive" size="sm" className="cursor-pointer">
            Delete
          </Button>
        </CardFooter>
      )}
      {student && (
        <CardFooter className="flex justify-end gap-2">
          <span
            className={cn(
              theme_border,
              hover_style,
              smooth_hover,
              "px-4 cursor-pointer"
            )}
          >
            Book Session
          </span>
        </CardFooter>
      )}
    </Card>
  );
};

export default SessionCard;
