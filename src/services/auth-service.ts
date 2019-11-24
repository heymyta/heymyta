import HttpService from './http-service';

enum UserType {
    STUDENT = "student",
    TA = "ta",
    NONE = "none"
}

class AuthService {
  type: AuthType;//student or teacher
  logedIn: boolean;
  constructor(){
    this.logedIn = false;
    this.type = UserType.NONE;
  }
  /**
   * check if current login account is a student or ta or none
   */
  me(){
    
  }
  
  async isType(userType=UserType.STUDENT){
    let type = 
    let api = `/${type}/me`;
    await HttpService.get(api, (status, res) => {
      if(status == 200){
        this.logedIn = true;
        this.type = AuthType.STUDENT;
        return this.logedIn;
      }
      this.logedIn = false;
      this.type = AuthType.NONE;
      return this.logedIn;
    });
  }
  
  
}