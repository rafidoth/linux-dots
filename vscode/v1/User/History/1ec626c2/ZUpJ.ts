export async function getStudentPersonalInfo(studentID: string) {
  const req: ApiRequestType = {
    endpoint: `api/student/${sID}`,
    method: "GET",
    auth: true,
  };
  const res1 = await apiRequest(req);

  const studentPersonalInfo: z.infer<typeof StudentInfoSchema> = {
    name: res1.name,
    email: res1.email,
    username: res1.username,
    gender: res1.gender,
    dob: new Date(res1.dob),
    graduation_year: res1.graduation_year,
  };
}
