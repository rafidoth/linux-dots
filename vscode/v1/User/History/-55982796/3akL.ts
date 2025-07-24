const baseURL = "http://localhost:3000/api";
export signInApi = "" 
export getSignInApi = function(student:boolean) {
    if (student){
        return `${baseURL}/api/student/login`
    }
  return signInApi;
}



