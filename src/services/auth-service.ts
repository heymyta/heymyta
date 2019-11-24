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
        login: login,
        type: type
      }
    }
    
    console.log('here');
//     if(this.connected && !force){
//       return payload(this.logedIn, this.userType);
//     }
    

    let isTA = await this.isType(UserType.TA);
    console.log('isTA', isTA);
    if(isTA) return payload(this.logedIn, this.userType);
    
    let isStudent = await this.isType(UserType.STUDENT);
    console.log('isStudent', isStudent);
    if(isStudent) return payload(this.logedIn, this.userType);
    
    return payload(false, UserType.NONE);
  }
  
  async isType(userType=UserType.STUDENT){
    let type = UserType.STUDENT ? "student" : "teacher";
    let api = `/${type}/me`;
    
    var that = this;
    return new Promise(function (resolve, reject) {
      console.log('api', api);
      HttpService.get(api, (status, res) => {
        console.log("status", res.code, "is", userType, 'res', res);
        if(res.code == 200){
          that.logedIn = true;
          that.userType = userType
          that.connected = true;
          resolve(that.logedIn);
        }else{
          reject("Not login" + that.logedIn);
        }
      });
    }); 
  }
}

// db.runAsync = function (query, param) {
//   var that = this;  
//   return new Promise(function (resolve, reject) {
//       that.run(query, param, function (err) {
//           if (err){
//             printDetailError({}, err);
//             reject(err.message);
//           }
//           else{
//             resolve(this);
//           }
            
//       });
//   });
// };
export default AuthService; 