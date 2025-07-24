const port = 3000;
export signInApi = "" 
export getSignInApi = function(student:boolean) {
    if (student){
        return `http://localhost:${}/api/student/login`
    }
  return signInApi;
}



