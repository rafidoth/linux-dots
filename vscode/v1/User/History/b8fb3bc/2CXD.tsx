"use client";
import { DateTimePicker } from "@/app/ui/CalendarUI/CustomDateTimePicker";
import { hover_style, theme_style } from "@/app/ui/CustomStyles";
import EditableField from "@/app/ui/EditableField";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Select } from "@radix-ui/react-select";
import React, { useState } from "react";

const style1 =
  "w-full h-[50px] flex items-center text-2xl bg-amber-800/20 my-5 px-4 text-amber-500 rounded-xl";

const SignupMentor = () => {
  const [info, setInfo] = useState<{
    name: string;
    email: string;
    username: string;
    gender: "Male" | "Female" | null;
    grad_year: string;
    dob: Date;
    password: string;
    repeatPassword: string;
  }>({
    name: "",
    email: "",
    username: "",
    gender: null,
    grad_year: "",
    dob: new Date(),
    password: "",
    repeatPassword: "",
  });
  const handleRegisterMentor = async () => {
    console.log(info);
  };
  return (
    <div className="my-10">
      <span className="text-xl">Information</span>
      <EditableField
        value={info.name}
        onChange={(newValue) => {
          setInfo((prev) => ({ ...prev, name: newValue }));
        }}
        className={style1}
        placeholder="Full Name"
        title="name"
      />

      <EditableField
        value={info.email}
        onChange={(newValue) => {
          setInfo((prev) => ({ ...prev, email: newValue }));
        }}
        className={style1}
        placeholder="Email Provided By UIU"
        title="email"
      />

      <EditableField
        value={info.email}
        onChange={(newValue) => {
          setInfo((prev) => ({ ...prev, username: newValue }));
        }}
        className={style1}
        placeholder="Username"
        title="username"
      />
      <div className="w-full flex gap-x-4">
        <Select
          onValueChange={(val) => {
            setInfo((prev) => ({ ...prev, gender: val as "Male" | "Female" }));
          }}
        >
          <SelectTrigger className="bg-amber-800/20 text-amber-500 text-2xl px-3 py-2 border-none w-1/2 h-[50px]">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>

          <SelectContent className="bg-amber-800/20 border-none">
            <SelectItem className="" value="Male">
              Male
            </SelectItem>
            <SelectItem value="Female">Female</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val) => {
            setInfo((prev) => ({
              ...prev,
              grad_year: val,
            }));
          }}
        >
          <SelectTrigger className="bg-amber-800/20 text-amber-500 text-2xl px-3 py-2 border-none w-1/2 h-[50px]">
            <SelectValue placeholder="Graduation Year" />
          </SelectTrigger>

          <SelectContent className="bg-amber-800/20 border-none">
            {Array.from({ length: new Date().getFullYear() - 2002 }, (_, i) => {
              const year = 2002 + i;
              return (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              );
            })}
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="my-4">
        <DateTimePicker
          field={{
            value: info.dob,
            onChange: (newdate: Date) =>
              setInfo((prev) => ({ ...prev, dob: newdate })),
          }}
          classnames="bg-amber-800/20 px-4 py-3 rounded-md text-amber-500 text-2xl"
          timeClock="hide"
          year={true}
        />
      </div>
      <div className="my-15">
        <span className="text-xl">Account</span>
        <EditableField
          value={info.password}
          onChange={(newValue) => {
            setInfo((prev) => ({ ...prev, password: newValue }));
          }}
          className={style1}
          placeholder="Put a password to your account"
          pass={true}
          title="Password"
        />
        <EditableField
          value={info.repeatPassword}
          onChange={(newValue) => {
            setInfo((prev) => ({ ...prev, repeatPassword: newValue }));
          }}
          className={style1}
          placeholder="Confirm Password"
          pass={true}
        />
      </div>
      <div className="flex justify-end">
        <span
          className={cn(
            hover_style,
            theme_style,
            "px-3 py-1 text-xl rounded-md select-none "
          )}
          onClick={handleRegisterMentor}
        >
          Create Account
        </span>
      </div>
    </div>
  );
};

export default SignupMentor;
