//const baseURL = "http://localhost:3000/api";
const baseURL = "https://345e-202-83-126-166.ngrok-free.app";
export const getSignInApi = function (student: boolean) {
  if (student) {
    return `${baseURL}/api/student/login`;
  } else {
    return `${baseURL}/api/mentor/login`;
  }
};
