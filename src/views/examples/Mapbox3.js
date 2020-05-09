import React from 'react';
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, RotationControl } from 'react-mapbox-gl';

import {MAPBOX_TOKEN} from "../../config";
import {setSignInStatus} from "../../redux/reducers/authentication/action";
import {setSimulation} from "../../redux/reducers/ui/action";
import {connect} from "react-redux";
import {jsonObject} from "../demos/routeData";
import FIREBASE from "../../firebase";
// tslint:disable-next-line:no-var-requires
const mapData = require('../demos/allShapesStyle');
// tslint:disable-next-line:no-var-requires
const route = require('../demos/route');

// const mappedRoute = route.points.map(
//   point => [point.lng, point.lat]
// );

const mappedRoute = jsonObject.coordinates;
const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});


const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12,
  'line-opacity':0.8
};

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': 0.7
};

const multiPolygonPaint = {
  'fill-color': '#3bb2d0',
  'fill-opacity': 0.5
};

class AllShapes extends React.Component {
  state = {
    center: [79.84473947511191,6.933374765107288],
    zoom: [14],
    circleRadius: 10,
    routeIndex: 0,
    route:[],
    routeData:[],
    currentPos:null,
    firstFetch:true
  };
  mounted = false;

  componentDidMount() {
    console.log(mappedRoute);
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevProps.simulation != this.props.simulation) && this.props.simulation){
      console.log("state changed",this.props.trackUserId);
      this.watchFirestore();
      // this.timeoutHandle = setTimeout(() => {
      //   if (this.mounted) {
      //     this.setState({
      //       center: mappedRoute[0],
      //       zoom: [10],
      //       circleRadius: 10
      //     });
      //   }
      // }, 2000);
      //
      // this.intervalHandle = setInterval(() => {
      //   if (this.mounted) {
      //     this.setState({
      //       route: [...this.state.route , mappedRoute[this.state.routeIndex]],
      //       routeIndex: this.state.routeIndex + 1,
      //     });
      //   }
      // }, 1000);
    }
  }

  watchFirestore() {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0];
    const uid = this.props.trackUserId;
    const collectionPath = `userTravel/${uid}/${dateString}`;
    this.unsubscribe = FIREBASE.firestore().collection(collectionPath).orderBy("time", "asc")
      .onSnapshot({
        error: (e) => console.error(e),
        next: (querySnapshot) => {
          const routeData = this.state.routeData;
          querySnapshot.docChanges().forEach(change => {
            if(change.type === 'added'){
              const coord = change.doc.data().location;
              routeData.push([coord.longitude,coord.latitude]);
              console.log("data: ", change.doc.data())
            }
          });
          if(this.state.firstFetch){
            this.setState({
              routeData: routeData,
              currentPos: routeData[querySnapshot.size-1],
              center:routeData[querySnapshot.size-1],
              firstFetch:false
            });
          }else{
            this.setState({
              routeData: routeData,
              currentPos: routeData[querySnapshot.size-1],
            });
          }
          console.log(querySnapshot.size,'FIREBASE QUERY',routeData)
        },
      });
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
    clearInterval(this.intervalHandle);
    this.unsubscribe();
  }

   getCirclePaint = () => ({
    'circle-radius': this.state.circleRadius,
    'circle-color': '#E54E52',
    'circle-opacity': 1
  });

   onStyleLoad = (map) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

   render() {
    return (
      <div>
        <Map
          style={"mapbox://styles/mapbox/streets-v11"}
          // tslint:disable-next-line:jsx-no-lambda
          onStyleLoad={this.onStyleLoad}
          containerStyle={{
            height: '90vh',
            width: '100%',
          }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {/* Controls */}
          <ScaleControl />
          <ZoomControl />
          <RotationControl style={{ top: 80 }} />

          {/* Line example */}
          {this.props.simulation ?
            <div>
              <Layer type="line" layout={lineLayout} paint={linePaint}>
                <Feature coordinates={this.state.routeData} />
              </Layer>
              <Layer type="circle" paint={this.getCirclePaint()}>
                <Feature coordinates={this.state.currentPos} />
              </Layer>
            </div>
            : null}

          {/* Circle example */}
          {/*{this.props.simulation ?*/}
          {/*  <Layer type="circle" paint={this.getCirclePaint()}>*/}
          {/*    <Feature coordinates={mappedRoute[this.state.routeIndex]} />*/}
          {/*  </Layer>*/}
          {/*  : null}*/}


        </Map>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  simulation: state.uiReducer.simulation,
  trackUserId: state.uiReducer.trackingUser
});

const bindAction = (dispatch) => ({
  setSimulation: (status) => dispatch(setSimulation(status)),
});

export default connect(
  mapStateToProps,
  bindAction
)(AllShapes);