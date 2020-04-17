import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { Source } from "react-mapbox-gl";

import {MAPBOX_TOKEN} from "../../config";
import firebase from "../../firebase";

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12
};

const lineLayout = {
  'line-cap': 'round' ,
  'line-join': 'round'
};

let index = 0;
let routes = [];

const getGeoJSON = (array) => {
  index++;
  return {
    "type": "geojson",
    "data": {"geometry": {"type": "Point", "coordinates": array}, "type": "Feature", "properties": {}},
  }
};
const geoJSONOptions = {
  "type": "geojson",
  "data": {"geometry": {"type": "Point", "coordinates": [-127.12815438117805, -21.829189494953944]}, "type": "Feature", "properties": {}},
};
const extradata = [
  [79.84713269736415,6.930701407232874],
  [79.84776241316717,6.9296686084791475],
  [79.84891232897951,6.9284455543794365],
  [79.84967893951335,6.927439929747052]];



export default class Mapbox2 extends React.Component{
  state = {
    latitude: 51.3233379650232,
    longitude: -0.481747846041145
  };

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return false;
  // }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(this.getCurrentPosCallback);
    this.watchFirestore();
    setInterval(this.timeoutHandler,5000);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  timeoutHandler = () => {
    console.log('TIMOUT');
    this.setState({
      userRoute : [...this.state.userRoute, extradata[index]]
    });
    index++;
  };
  getCurrentPosCallback = (pos) => {
    console.log(pos);
    this.setState({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      userRoute : []
    });
  };

  watchFirestore(){
    this.unsubscribe = firebase.firestore().collection('users/0001/18-03-2020')
      .onSnapshot({
        error: (e) => console.error(e),
        next: (querySnapshot) => {
          let mappedarray;
          let temp_array = [];
          querySnapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            temp_array.push(change.doc.data().location);
          }
        });
          mappedarray = temp_array.map((location) => [location.longitude,location.latitude]);
          //let newUserRoute = [...this.state.userRoute,...mappedarray];

          let testArray = [
            [79.8468041500056,6.931951634293924],
          ];
          this.setState({
            userRoutes : testArray
          })
        },
      });
  }
  render() {
    console.log('RENDER');
    return(
      <div>
        <Map
          style="mapbox://styles/mapbox/streets-v11"
          containerStyle={{
            height: '70vh',
            width: '70vw',
          }}
        >

          <Source id="source_id" geoJsonSource={geoJSONOptions} />
          <Layer type="symbol" id="layer_id" sourceId="source_id" layout={{ 'icon-image': 'rocket-15' }} />
          <Layer type="line" layout={lineLayout} paint={linePaint}>
            <Feature coordinates={this.state.userRoute} />
          </Layer>
        </Map>;
      </div>
    )
  }
}
