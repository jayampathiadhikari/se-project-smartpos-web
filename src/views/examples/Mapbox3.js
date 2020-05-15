import React from 'react';
import ReactMapboxGl, {
  Layer,
  MapContext,
  Feature,
  Source,
  ScaleControl,
  ZoomControl,
  RotationControl
} from 'react-mapbox-gl';
import DrawControl from 'react-mapbox-gl-draw';
import {MAPBOX_TOKEN} from "../../config";
import {setSignInStatus} from "../../redux/reducers/authentication/action";
import {setSimulation, toggleAddRouteModal} from "../../redux/reducers/ui/action";
import {connect} from "react-redux";
import {jsonObject} from "../demos/routeData";
import FIREBASE from "../../firebase";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import {
  createGeojson,
  getRouteByWaypoints, getSalespersonByAgent,
  getShopsWithNoRouteByDistrict,
  getShopsWithRouteByDistrict
} from "../../Utils";


import mapboxgl from "react-map-gl/dist/es5/utils/mapboxgl";
import AddRoute from "../../components/AddRoute";





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
  'line-opacity': 0.8
};



class AllShapes extends React.Component {
  state = {
    center: [79.84473947511191, 6.933374765107288],
    zoom: [14],
    circleRadius: 10,
    routeIndex: 0,
    route: [],
    routeData: [],
    currentPos: null,
    firstFetch: true,
    shops: null,
    shopsArray: null,
    shopsWithRouteGeoJson: null,
    shopsWithNoRouteGeoJson: null,
    newRoute:false,
    salesperson:[]
  };
  mounted = false;
  map = null;
  drawControl = null;
  drawLine = false;
  selectedShopsTemp = [];
  selectedShops = [];

  componentDidMount = async () => {
    this.mounted = true;
    const res = await getShopsWithRouteByDistrict(6);
    const result = await getShopsWithNoRouteByDistrict(6);
    let shopsWithRouteGeoJson = null;
    let shopsWithNoRouteGeoJson = null;
    if (res.success) {
      shopsWithRouteGeoJson = createGeojson(res.data);
      console.log(shopsWithRouteGeoJson, 'shopsWithRouteGeoJson')
    }
    if (result.success) {
      shopsWithNoRouteGeoJson = createGeojson(result.data);
      console.log(shopsWithNoRouteGeoJson, 'shopsWithNoRouteGeoJson')
    }
    this.setState({
      shopsWithRouteGeoJson: shopsWithRouteGeoJson,
      shopsWithNoRouteGeoJson: shopsWithNoRouteGeoJson
    }, this.forceUpdate)

  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if ((prevProps.simulation != this.props.simulation) && this.props.simulation) {
      console.log("state changed", this.props.trackUserId);
      this.watchFirestore();
    }
    if(prevState.shopsWithNoRouteGeoJson != this.state.shopsWithNoRouteGeoJson){
      console.log('update source')
      if(this.map!= null && this.map.getSource('shopsWithNoRoute')){
        this.map.getSource('shopsWithNoRoute').setData(this.state.shopsWithNoRouteGeoJson);
      }
    }
    if(this.map!= null && prevState.shopsWithRouteGeoJson != this.state.shopsWithRouteGeoJson){
      if(this.map.getSource('shopsWithRoute')){
        this.map.getSource('shopsWithRoute').setData(this.state.shopsWithRouteGeoJson);
      }
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
            if (change.type === 'added') {
              const coord = change.doc.data().location;
              routeData.push([coord.longitude, coord.latitude]);
              console.log("data: ", change.doc.data())
            }
          });
          if (this.state.firstFetch) {
            this.setState({
              routeData: routeData,
              currentPos: routeData[querySnapshot.size - 1],
              center: routeData[querySnapshot.size - 1],
              firstFetch: false
            });
          } else {
            this.setState({
              routeData: routeData,
              currentPos: routeData[querySnapshot.size - 1],
            });
          }
          console.log(querySnapshot.size, 'FIREBASE QUERY', routeData)
        },
      });
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
    clearInterval(this.intervalHandle);
    // this.unsubscribe();
  }

  getCirclePaint = () => ({
    'circle-radius': this.state.circleRadius,
    'circle-color': '#E54E52',
    'circle-opacity': 1
  });

  onStyleLoad = (map) => {
    const {onStyleLoad} = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  onDraw = async ({features}) => {
    console.log(features[0].geometry.coordinates,'by draw');
    const res = await getRouteByWaypoints(features[0].geometry.coordinates);
    var route = res.data.routes[0].geometry.coordinates;
    var geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    };
    this.drawControl.draw.deleteAll();
    if (this.map.getSource('route')) {
      this.map.getSource('route').setData(geojson);
      this.forceUpdate()
    } else { // otherwise, make a new request
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: route
            }
          }
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      },'shopsWithNoRouteLayer');
    }

  };

  onClickShopsWithNoRoute = (e) => {
    if(this.drawLine){
      if(!this.selectedShopsTemp.includes(e.features[0].properties.id)){
        this.selectedShopsTemp.push(e.features[0].properties.id);
      }
      this.selectedShops = this.selectedShopsTemp;
    }
    console.log(this.selectedShops)
      // new mapboxgl.Popup()
      //   .setLngLat(e.lngLat)
      //   .setHTML(e.features[0].properties.name)
      //   .addTo(map);

  };

  onAddNewRoute = async() => {
    const salespersons = await getSalespersonByAgent('vsotjU8PuSUm5HxEmDbJ5zWvbgy2');
    this.setState({
      salesperson:salespersons
    });
    this.props.toggle()
  };

  render() {
    console.log(this.state.shopsWithNoRouteGeoJson, 'RENDER');
    return (
      <div>
        <AddRoute modalOpen={true} salesperson={this.state.salesperson} />
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
          <ScaleControl/>
          <ZoomControl/>
          <RotationControl style={{top: 80}}/>
          <MapContext.Consumer>
            {(map) => {
              this.map = map;

              map.on('draw.modechange',(e)=>{
                if(e.mode === 'draw_line_string'){
                  this.drawLine = true;
                }else{
                  this.drawLine = false;
                  this.selectedShopsTemp = []
                }
              });

              var symbol = 'shop';
              console.log(this.state.shopsWithNoRouteGeoJson, 'this.state.shopsWithNoRouteGeoJson')
              if (!map.getSource('shopsWithNoRoute')) {
                map.addSource('shopsWithNoRoute', {
                  'type': 'geojson',
                  'data': this.state.shopsWithNoRouteGeoJson
                });
              }
              if (!map.getSource('shopsWithRoute')) {
                console.log(this.state.shopsWithRouteGeoJson, 'this.state.shopsWithRouteGeoJson')
                map.addSource('shopsWithRoute', {
                  'type': 'geojson',
                  'data': this.state.shopsWithRouteGeoJson
                });
              }

              if (!map.getLayer('shopsWithNoRouteLayer')) {
                map.addLayer({
                  'id': 'shopsWithNoRouteLayer',
                  'type': 'symbol',
                  'source': 'shopsWithNoRoute',
                  'layout': {
                    'icon-image': symbol + '-15',
                    'icon-allow-overlap': true,
                    'text-field': ['get', 'name'],
                    'text-font': [
                      'Open Sans Bold',
                      'Arial Unicode MS Bold'
                    ],
                    'text-size': 11,
                    'text-transform': 'uppercase',
                    'text-letter-spacing': 0.05,
                    'text-offset': [0, 1.5]
                  },
                  'paint': {
                    'text-color': '#f40005',
                    'text-halo-color': '#fff',
                    'text-halo-width': 2
                  }
                });
              }
              if (!map.getLayer('shopsWithRouteLayer')) {
                map.addLayer({
                  'id': 'shopsWithRouteLayer',
                  'type': 'symbol',
                  'source': 'shopsWithRoute',
                  'layout': {
                    'icon-image': 'grocery' + '-15',
                    'icon-allow-overlap': true,
                    'text-field': ['get', 'name'],
                    'text-font': [
                      'Open Sans Bold',
                      'Arial Unicode MS Bold'
                    ],
                    'text-size': 11,
                    'text-transform': 'uppercase',
                    'text-letter-spacing': 0.05,
                    'text-offset': [0, 1.5]
                  },
                  'paint': {
                    'text-color': '#2e48f4',
                    'text-halo-color': '#fff',
                    'text-halo-width': 2
                  }
                });
              }

              map.on('click', 'shopsWithNoRouteLayer', this.onClickShopsWithNoRoute
              );
              map.on('mouseenter', 'shopsWithNoRouteLayer', function () {
                map.getCanvas().style.cursor = 'pointer';
              });
              map.on('mouseleave', 'shopsWithNoRouteLayer', function () {
                map.getCanvas().style.cursor = '';
              });
            }}
          </MapContext.Consumer>
          {/*{this.state.shopsWithNoRouteGeoJson ?*/}
          {/*<>*/}
          {/*  <Source id="shopsWithNoRoute" geoJsonSource ={this.state.shopsWithNoRouteGeoJson} />*/}
          {/*  <Layer type="symbol" id="shopsWithNoRouteLayer" sourceId="shopsWithNoRoute" />*/}
          {/*</>:null*/}
          {/*}*/}


          {/*Line example*/}
          {this.props.simulation ?
            <div>
              <Layer type="line" layout={lineLayout} paint={linePaint}>
                <Feature coordinates={this.state.routeData}/>
              </Layer>
              <Layer type="circle" paint={this.getCirclePaint()}>
                <Feature coordinates={this.state.currentPos}/>
              </Layer>
            </div>
            : null}

          <DrawControl ref={(drawControl) => {
            this.drawControl = drawControl
          }} displayControlsDefault={false} onDrawCreate={this.onDraw} onDrawUpdate={this.onDraw}
                       controls={{line_string: true, trash: true}}/>

          <div className={'mapboxgl-ctrl-bottom-left'}>
            <div className={"mapboxgl-ctrl-group mapboxgl-ctrl"} style={{minWidth:100, boxShadow:'0 0 2px 2px #0096ff'}}>
              <button style={{minWidth:100}} disabled={this.state.newRoute} onClick={this.onAddNewRoute}>Add New Route</button>
            </div>
          </div>

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
  toggle: () => dispatch(toggleAddRouteModal())
});

export default connect(
  mapStateToProps,
  bindAction
)(AllShapes);