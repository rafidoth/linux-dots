import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {};

const MySessions = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>You have no upcoming sessions.</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default MySessions;
