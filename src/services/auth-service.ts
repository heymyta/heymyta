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
  async me(force=false){
    let payload = (login, type) => {
      return {
        login: this.logedIn,
        type: this.userType
      }
    }
    
    if(this.connected && !force){
      return payload(this.logedIn, this.userType);
    }
    

    let isTA = await this.isType(UserType.STUDENT);
    if(isTA) return payload(this.logedIn, this.userType);
    
    let isStudent = await this.isType(UserType.TA);
    if(isStudent) return payload(this.logedIn, this.userType);
    
    return payload(false, UserType.NONE);
  }
  
  async isType(userType=UserType.STUDENT){
    let type = UserType.STUDENT ? "student" : "teacher";
    let api = `/${type}/me`;
    
    var that = this;
    return new Promise(function (resolve, reject) {
    HttpService.get(api, (status, res) => {
      console.log("status", status);
      if(status == 200){
        this.logedIn = true;
        this.type = userType
        return this.logedIn;
      }
      return this.logedIn;
    });
    }); 
  }
}

db.runAsync = function (query, param) {
  var that = this;  
  return new Promise(function (resolve, reject) {
      that.run(query, param, function (err) {
          if (err){
            printDetailError({}, err);
            reject(err.message);
          }
          else{
            resolve(this);
          }
            
      });
  });
};
export default AuthService; 