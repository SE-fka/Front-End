export default function AuthHeader() {
   const user = JSON.parse(localStorage.getItem('token'));
  //console.log("data", user)
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }