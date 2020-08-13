import * as firebase from  "firebase/app";
import "firebase/auth";
var otherfirebaseConfig = {
  // add the auth keys from firebase authentication
};
var otherProject = firebase.initializeApp(otherfirebaseConfig,"other");
// Initialize Firebase
  //firebase.initializeApp(otherProject); 
  export default otherProject