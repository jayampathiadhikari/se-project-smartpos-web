import FIREBASE,{FIREBASE_SEC} from "./firebase";
import 'firebase/functions';

import User  from './models/User';

const getActionCodeSettings = (email) => {
  var actionCodeSettings = {
    url: `http://localhost:3000/auth/reset-password?email=${email}`,
    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
    // handleCodeInApp: true,
    dynamicLinkDomain: 'custom.page.link'
  };
  return actionCodeSettings;
};

export const createUserWithEmail2 = async (email,password,json) => {
  try{
    await FIREBASE_SEC.auth().createUserWithEmailAndPassword(email, password);
    json.uid = FIREBASE_SEC.auth().currentUser.uid;
    FIREBASE_SEC.auth().signOut();
    await FIREBASE.firestore().collection('users').add(json);
    return {success:true}
  }catch (e) {
    console.log(e,'ERROR');
    console.log(e.response,'ERROR RESPONSE');
    return {success:false, error:e}
  }
};

export const createUserWithEmail = async (data) => {
  try{
    const addClient = FIREBASE.functions().httpsCallable('addUser');
    return addClient(data).then(result => {
      if(result.data.success){
        return FIREBASE.auth().sendPasswordResetEmail(data.email).then(()=>({success:true})).catch(()=>({success:false}))
      }else{
        return {success:false, message: result.data.message}
      }
    })
      .catch(error => ({
        success: false,
        error: error.message
      }));
  }catch (e) {
    console.log(e,'ERROR');
    console.log(e.response,'ERROR RESPONSE');
    return {success:false, error:e}
  }
};