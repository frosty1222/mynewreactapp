import getCookie from './Components/cookies/getCookie';
import setCookie from './Components/cookies/setCookie';
class Auth{
    constructor(){
        this.authenticated = getCookie('authenticated');
        this.role = getCookie('role');
    }
    login(){
        this.authenticated =getCookie('authenticated');
    }
    logout(){
        this.authenticated = setCookie('authenticated',false);
        setCookie('accessToken','');
    }
    isAuthenticated() {
        return this.authenticated;
    }
    isAdmin(){
        if(this.role === "admin"){
            return true;
        }else{
            return false;
        }
        
    }
}
export default new Auth();