const baseURL = "http://localhost:3000/api";
export signInApi = "" 
export getSignInApi = function(student:boolean) {
    if (student){
        return `http://localhost:${}/api/student/login`
    }
  return signInApi;
}



