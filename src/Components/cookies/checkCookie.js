import getCookie from './getCookie';
import setCookie from './getCookie';
const checkCookie = (cname)=>{
    let user = getCookie(cname);
    if (user !=="") {
      alert("Welcome again " + user);
    } else {
      user = prompt("Please enter your name:", "");
      if (user !== "" && user != null) {
        setCookie(cname, user, 365);
      }
    }
}
export default checkCookie;