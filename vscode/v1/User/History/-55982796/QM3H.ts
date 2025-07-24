export signInApi = "" 
export getSignInApi = function(student:boolean) {
    if (student){
        return "http://localhost:3000/api/student/login"
    }
  return signInApi;
}



