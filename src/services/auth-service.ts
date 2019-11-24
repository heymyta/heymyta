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
   * force: = true. force to reconnect and check for authentication
   */
  async whoami(force=false){
    let payload = (logedIn, userType) => {
      return {
        logedIn: logedIn,
        userType: userType
      }
    }
    

    //use cache
    if(this.connected && !force){
      return payload(this.logedIn, this.userType);
    }
    this.logedIn = false;
    this.userType = UserType.NONE;
    
    let isTA = await this.isUserType(UserType.TA);
    if(isTA) {
      this.connected = true;
      return payload(this.logedIn, this.userType);
    }
    
    let isStudent = await this.isUserType(UserType.STUDENT);
    if(isStudent){
      this.connected = true;
      return payload(this.logedIn, this.userType);
    }
    
    return payload(false, UserType.NONE);
  }
  
  async isUserType(userType=UserType.STUDENT){
    let type = (userType===UserType.STUDENT) ? "student" : "teacher";
    let api = `/${type}/me`;
    let res = await httpService.getAsync(api);
    if(res.code == 403){
      return false;
    }
    this.logedIn = true;
    this.userType = userType;
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
  
  async forceLogout(){
    return await httpService.getAsync('/logout');
  }

}

export default AuthService; 