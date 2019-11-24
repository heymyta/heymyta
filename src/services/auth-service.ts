import httpService from './http-service';

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
    this.logedIn = null;
    this.userType = UserType.NONE;
    this.connected = false;
  }
  /**
   * check if current login account is a student or ta or none
   */
  async whoami(force=false){
    let payload = (login, type) => {
      return {
        login: login,
        type: type
      }
    }
    this.logedIn = false;

    //use cache
    // if(this.connected && !force){
    //   return payload(this.logedIn, this.userType);
    // }
    
    let isTA = await this.isUserType(UserType.TA);
    console.log('isTA', isTA);
    if(isTA) return payload(this.logedIn, this.userType);
    
    let isStudent = await this.isUserType(UserType.STUDENT);
    console.log('isStudent', isStudent);
    if(isStudent) return payload(this.logedIn, this.userType);
    
    return payload(false, UserType.NONE);
  }
  
  async isUserType(userType=UserType.STUDENT){
    console.log('userType', userType);
    let type = (userType===UserType.STUDENT) ? "student" : "teacher";
    let api = `/${type}/me`;
    let res = await httpService.getAsync(api);
    console.log("api", api, 'isusertype res', res);
    if(res.code == 403){
      return false;
    }
    return true;
  }

  async fakeTARegister(name, email, pass){
    return await httpService.postAsync(`/register`, {
      username: name,
      email: email,
      password: pass
    });
  }

  async fakeTAAuth(name='test', pass='test'){
    return await httpService.postAsync('/teacher/login', {
      username: name,
      password: pass
    });
  }

}

export default AuthService; 