import FIREBASE,{FIREBASE_SEC} from "./firebase";
import 'firebase/functions';

import User  from './models/User';

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
    const addClient = FIREBASE.functions().httpsCallable('addClient');
    return addClient(data).then(result => result.data)
      .catch(error => ({
        status: 'FAILED',
        error: error.message
      }));
    
  }catch (e) {
    console.log(e,'ERROR');
    console.log(e.response,'ERROR RESPONSE');
    return {success:false, error:e}
  }
};