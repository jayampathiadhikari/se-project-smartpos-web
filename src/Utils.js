import axios from 'axios';
import FIREBASE from "./firebase";
import 'firebase/functions';

import User  from './models/User';

// export const createUserWithEmail2 = async (email,password,json) => {
//   try{
//     await FIREBASE_SEC.auth().createUserWithEmailAndPassword(email, password);
//     json.uid = FIREBASE_SEC.auth().currentUser.uid;
//     FIREBASE_SEC.auth().signOut();
//     await FIREBASE.firestore().collection('users').add(json);
//     return {success:true}
//   }catch (e) {
//     console.log(e,'ERROR');
//     console.log(e.response,'ERROR RESPONSE');
//     return {success:false, error:e}
//   }
// };

export const createUserWithEmail = async (data) => {
  try{
    const addClient = FIREBASE.functions().httpsCallable('addUser');
    return addClient(data).then(
      async(result) => {
      if(result.data.success){
        try{
          await axios.post('https://se-smartpos-backend.herokuapp.com/employee/register',{
            type: result.data.data.type,
            employee_id: result.data.data.uid
          });
          await FIREBASE.auth().sendPasswordResetEmail(data.email);
          return {success:true}
        }catch (e) {
          return {success:false, error: e}
        }
      }else{
        return {success:false, error: result.data.message}
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

export const getAgentsByRegion = async(region) => {
  const queryRef = FIREBASE.firestore().collection("users")
    .where("region", "==", region);
  const querySnap = await queryRef.get();
  const agents = [];
  querySnap.docs.forEach(doc => {
    const data = doc.data()
    agents.push({name:data.firstName, id: data.uid})
  });
  return agents;
};

export const getCurrentAgentData = async () => {
  const { currentUser } = FIREBASE.auth();
  const userQueryRef = FIREBASE.firestore().collection('users')
    .where('email', '==', currentUser.email);
  const userQuerySnapshot = await userQueryRef.get();
  const region = userQuerySnapshot.docs[0].region;
  const uid = currentUser.uid;
  return {uid, region}
};

export const getCurrentExecData  = () => {
  const { currentUser } = FIREBASE.auth();
  const uid = currentUser.uid;
  return {uid}
};

export const checkAuthentication = (email, password) => {
  return FIREBASE.auth().signInWithEmailAndPassword(email, password)
    .then(
      async()=>{
        const userQueryRef = FIREBASE.firestore().collection('users').where('email', '==', email);
        const userQuerySnapshot = await userQueryRef.get();
        const type = userQuerySnapshot.docs[0].data().type;
        return {success: true, type:type}
      }
    )
    .catch(function(error) {
    var errorMessage = error.message;
    return {success:false, message: errorMessage}
  });
};