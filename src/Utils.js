import axios from 'axios';
import FIREBASE from "./firebase";
import 'firebase/functions';
import {MAPBOX_TOKEN} from "./config";
import {regions, Regions} from './constants';

import User from './models/User';

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
  try {
    const addClient = FIREBASE.functions().httpsCallable('addUser');
    return addClient(data).then(
      async (result) => {
        if (result.data.success) {
          try {
            const type = result.data.data.type;
            const district_id = getDistrictId(result.data.data.region);
            if (type === 'agent'){
              await axios.post('https://se-smartpos-backend.herokuapp.com/employee/registeragent', {
                owner_id: result.data.data.supervisorUid,
                employee_id: result.data.data.uid,
                district_id: district_id
              });
            }else if(type === 'salesperson'){
              await axios.post('https://se-smartpos-backend.herokuapp.com/employee/registersalesperson', {
                agent_id: result.data.data.supervisorUid,
                employee_id: result.data.data.uid,
                district_id: district_id
              });
            }
            // await axios.post('https://se-smartpos-backend.herokuapp.com/employee/register', {
            //   type: result.data.data.type,
            //   employee_id: result.data.data.uid,
            //   district_id: district_id
            // });
            await FIREBASE.auth().sendPasswordResetEmail(data.email);
            return {success: true}
          } catch (e) {
            return {success: false, error: e}
          }
        } else {
          return {success: false, error: result.data.message}
        }
      })
      .catch(error => ({
        success: false,
        error: error.message
      }));
  } catch (e) {
    console.log(e, 'ERROR');
    console.log(e.response, 'ERROR RESPONSE');
    return {success: false, error: e}
  }
};

export const getAgentsByRegion = async (region) => {
  const queryRef = FIREBASE.firestore().collection("users")
    .where("region", "==", region).where("type", "==", "agent")
  const querySnap = await queryRef.get();
  const agents = [];
  querySnap.docs.forEach(doc => {
    const data = doc.data()
    agents.push({name: data.firstName, id: data.uid})
  });
  return agents;
};

export const getSalespersonByAgent = async (agentID) => {
  const queryRef = FIREBASE.firestore().collection("users")
    .where("supervisorUid", "==", agentID);
  const querySnap = await queryRef.get();
  const salesperson = [];
  querySnap.docs.forEach(doc => {
    const data = doc.data();
    salesperson.push({name: data.firstName, id: data.uid})
  });
  return salesperson;
};

export const getCurrentAgentData = async () => {
  const {currentUser} = FIREBASE.auth();
  const userQueryRef = FIREBASE.firestore().collection('users')
    .where('email', '==', currentUser.email);
  const userQuerySnapshot = await userQueryRef.get();
  const region = userQuerySnapshot.docs[0].data().region;
  const uid = currentUser.uid;
  return {uid, region}
};

export const getCurrentExecData = () => {
  const {currentUser} = FIREBASE.auth();
  const uid = currentUser.uid;
  return {uid}
};

export const checkAuthentication = (email, password) => {
  return FIREBASE.auth().signInWithEmailAndPassword(email, password)
    .then(
      async () => {
        const userQueryRef = FIREBASE.firestore().collection('users').where('email', '==', email);
        const userQuerySnapshot = await userQueryRef.get();
        const type = userQuerySnapshot.docs[0].data().type;
        console.log(userQuerySnapshot.docs[0].data(), 'USER DATA');
        return {success: true, type: type, user: userQuerySnapshot.docs[0].data()}
      }
    )
    .catch(function (error) {
      var errorMessage = error.message;
      return {success: false, message: errorMessage}
    });
};


//check for arraylength
export const getRouteByWaypoints = async (waypointsArray) => {
  var coords = '';
  waypointsArray.forEach((coord) => {
    coords += coord.join() + ';'
  });
  coords = coords.slice(0, coords.length - 1);
  console.log(coords, 'COORDS STRING');
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coords}`;
  const res = await axios.get(url, {
      params: {
        alternatives: false,
        geometries: "geojson",
        steps: false,
        overview:"full",
        access_token: MAPBOX_TOKEN
      }
    }
  );
  return res;
};

export const getOptimizedRouteByWaypoints = async (waypointsArray) => {
  var coords = '';
  waypointsArray.forEach((coord) => {
    coords += coord.join() + ';'
  });
  coords = coords.slice(0, coords.length - 1);
  console.log(coords, 'COORDS STRING');
  const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coords}`;
  const res = await axios.get(url, {
      params: {
        alternatives: false,
        geometries: "geojson",
        steps: false,
        access_token: MAPBOX_TOKEN
      }
    }
  );
  return res;
};
//for now district is hardcoded as 6
export const getShopsWithNoRouteByDistrict = async (id) => {
  const res = await axios.post('https://se-smartpos-backend.herokuapp.com/shop/viewshops-withnoroutebydistrict', {
    district_id: id
  });
  console.log(res.data)
  if (res.data.success) {
    console.log('success')
    let shopData = res.data.data.map((shop, index) => {
      var shop_id = shop["shop_id"];
      var name = shop ["name"];
      var coords = [shop.longitude, shop.latitude];
      return ({shop_id, name, coords})
    });
    console.log(shopData, 'shopdata');
    return {
      success: true,
      data: shopData
    }
  } else {
    console.log('false')
    return {
      success: false,
    }
  }
};

export const getShopsWithRouteByDistrict = async (id) => {
  const res = await axios.post('https://se-smartpos-backend.herokuapp.com/shop/viewshops-withroutebydistrict', {
    district_id: id
  });
  console.log(res.data);
  if (res.data.success) {
    console.log('success');
    let shopData = res.data.data.map((shop, index) => {
      var shop_id = shop["shop_id"];
      var name = shop ["name"];
      var coords = [shop.longitude, shop.latitude];
      return ({shop_id, name, coords})
    });
    console.log(shopData, 'shopdata');
    return {
      success: true,
      data: shopData
    }
  } else {
    console.log('false')
    return {
      success: false,
    }
  }
};

export const createGeojson = (shopData) => {
  var data = {
    'type': 'FeatureCollection',
    'features': []
  };
  const feature = (shop) => ({
    'type': 'Feature',
    'properties': {
      'name': shop.name,
      'id': shop.shop_id
    },
    'geometry': {
      'type': 'Point',
      'coordinates': shop.coords
    }
  });
  shopData.forEach(shop => {
    data.features.push(feature(shop))
  });
  return data
};

export const createNewRoute = async (shop_ids, formData) => {
  //req object
  const req_object = {
    route_details: JSON.stringify(formData),
    shop_ids: JSON.stringify(shop_ids)
  };
  try{
    const res = await axios.post('https://se-smartpos-backend.herokuapp.com/route/create-route', req_object);
    return res;
  }catch (e) {
    console.log(e)
  }

};

export const getUnassignedRoutes = async (salesperson_id) => {
  const res = await axios.post('https://se-smartpos-backend.herokuapp.com/salesperson/getunassigneddates', {
    salesperson_id
  });
  if (res.data.success) {
    let routes = [];
    res.data.data.forEach(data => {
      routes.push(
        {
          id: data.day_id,
          name: `Week ${data.week}: ${data.day}`
        }
      )
    });
    return {
      success: true,
      data: routes
    }
  } else {
    return res.data
  }
};

export const getDistrictId = (name) => {
  var districtA = null;
  regions.forEach((district) => {
    if (district.name === name) {
       districtA = district;
    }
  });
  console.log(districtA, 'GET DISTRICT ID');
  return districtA.id;
};

//'#f40005'