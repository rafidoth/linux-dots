//const baseURL = "http://localhost:3000/api";
export const baseURL = "https://1e18-202-83-126-162.ngrok-free.app";
export const getSignInApi = function (student: boolean) {
  if (student) {
    return `${baseURL}/api/student/login`;
  } else {
    return `${baseURL}/api/mentor/login`;
  }
};
