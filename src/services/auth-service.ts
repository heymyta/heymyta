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
    this.logedIn = false;
    this.userType = UserType.NONE;
    this.connected = false;
  }

  async handleTaLogin(username, password){
    let that = this;
    this.logedIn = false;
    this.userType = UserType.NONE;
    return httpService.post('/teacher/login', {
      username: username, 
      password: password,
    }).then((res) => {
      if(res.code == 0){
        that.connected = true;
        that.logedIn = true;
        that.userType = UserType.TA;
      }
      return res;
    });
  }

  async handleLogout(){
    return httpService.get('/logout')
    .then((res) => {
      this.logedIn = false;
      this.connected = false;
      this.userType = UserType.NONE;
      return res
    })
  }
  async handleStudentLogin(name){
    let that = this;
    this.logedIn = false;
    this.userType = UserType.NONE;
    return httpService.post('/student/login', {
      name: name
    }).then((res) => {
      if(res.code == 0){
        that.connected = true;
        that.logedIn = true;
        that.userType = UserType.STUDENT;
      }
      return res;
    });
  }
  /**
   * check if current login account is a student or ta or none
   * force: = true. force to reconnect and check for authentication
   */
  async whoami(force=false, fakeauth=false){
    if(fakeauth){
      await this.fakeAuth();
    }
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
    this.logedIn = true;
    this.userType = userType;
    return true;
  }

  handleTaRegister({name, username, password}){
    return httpService.post('/teacher/register', {
      name: name,
      email: 'dummy_email@dummy.dummy',
      username: username, 
      password: password,
      invite_code: 'fall2019ta'
    });
  }
  async fakeTARegister(name, email, pass){
    return await httpService.postAsync(`/teacher/register`, {
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

  async fakeAuth(){
    await this.fakeTARegister('test', 'test@test.com', 'test');
    let auth =  await this.fakeTAAuth('test', 'test');
    return auth;
  }
}

export default AuthService; 