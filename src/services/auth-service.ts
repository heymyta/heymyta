import HttpService from './http-service';

enum UserType {
    STUDENT = "student",
    TA = "ta",
    NONE = "none"
}

class AuthService {
  userType: UserType;//student or teacher
  logedIn: boolean;
  connected: boolean;
  constructor(){
    this.logedIn = false;
    this.userType = UserType.NONE;
    this.connected = false;
  }
  /**
   * check if current login account is a student or ta or none
   */
  me(force=false){
    let payload = (login, type) => {
      return {
        login: this.logedIn,
        type: this.userType
      }
    }
    
    if(this.connected && !force){
      return payload(this.logedIn, this.userType);
    }
    

    let isTA = await isType(UserType.STUDENT);
    if(isTA) return payload(this.logedIn, this.userType);
    
    let isStudent = await isType(UserType.TA);
    if(isStudent) return payload(this.logedIn, this.userType);
    
    return payload(false, UserType.NONE);
  }
  
  async isType(userType=UserType.STUDENT){
    let type = UserType.STUDENT ? "student" : "teacher";
    let api = `/${type}/me`;
    HttpService.get(api, (status, res) => {
      console.log("status", status);
      if(status == 200){
        this.logedIn = true;
        this.type = userType
        return this.logedIn;
      }
      return this.logedIn;
    });
  }
}


export default {
  UserType,
  new AuthService()
}