import httpService from './http-service';
import UserType from './UserType';

class AuthService {
  userType: UserType;//student or teacher
  logedIn: boolean;
  connected: boolean;
  userInfo: object;
  status: object;
  constructor(){
    this.logedIn = false;
    this.userType = UserType.NONE;
    this.connected = false;
    this.userInfo = null;
    this.status = null;
  }

  setFields({logedIn, userType, connected, userInfo, status}){
    this.logedIn = logedIn;
    this.userType = userType;
    this.connected = connected;
    this.userInfo = userInfo; 
    this.status = status;
  }

  async handleTaLogin(username, password){
    this.setFields({
      logedIn: false, userType: UserType.NONE, 
      connected: false, userInfo: null, status: null
    });
    return await httpService.post('/teacher/login', {
      username: username, 
      password: password,
    }).then(async (res) => {
      await this.whoami(true);
      return res;
    });
  }

  async handleLogout(){
    return await httpService.get('/logout')
    .then((res) => {
      this.setFields({
        logedIn: false, userType: UserType.NONE, 
        connected: false, userInfo: null, status: null
      });
      return res
    })
  }
  async handleStudentLogin(name){
    let that = this;
    this.logedIn = false;
    this.userType = UserType.NONE;
    return await httpService.post('/student/login', {
      name: name
    }).then(async (res) => {
      await this.whoami(true);
      return res;
    });
  }

  // updateStatusWithLongPoll(){
  //   let type = (this.userType===UserType.STUDENT) ? "student" : "teacher";
  //   let api = `/${type}/me?longpoll=true`;
  //   return httpService.get(api).then((res) => {
  //     let userInfo = null, status = null;
  //     console.log('res sss', res);
  //     if(this.userType == UserType.STUDENT){
  //       userInfo = res.student;
  //       status = res.student['status'];
  //     }else if(this.userType == UserType.TA){
  //       userInfo = res.teacher;
  //       status = res.teacher['status'];
  //     }
  //     if(res.code == 0){
  //       this.setFields({
  //         logedIn: true, userType: UserType.TA, 
  //         connected: true, userInfo: userInfo,
  //         status: status
  //       });
  //     }else{
  //       this.setFields({
  //         logedIn: false, userType: UserType.NONE, 
  //         connected: false, userInfo: null, status: null
  //       });
  //     }
  //     return res;
  //   });
  // }
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
    if(this.connected === true && !force){
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
    this.userInfo = (userType===UserType.STUDENT) ? res.student : res.teacher;
    this.logedIn = true;
    this.userType = userType;
    return true;
  }

  async handleTaRegister({name, username, password}){
    await this.handleLogout();
    return await httpService.post('/teacher/register', {
      name: name,
      email: 'dummy_email@dummy.dummy',
      username: username, 
      password: password,
      invite_code: 'fall2019ta'
    });
  }
}

export default AuthService; 