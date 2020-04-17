import React, {useState} from 'react';
import ReactMapGL, {Source,Layer} from 'react-map-gl';
import {MAPBOX_TOKEN} from "../../config";

const parkLayer = {
  id: 'landuse_park',
  type: 'fill',
  source: 'mapbox',
  'source-layer': 'landuse',
  filter: ['==', 'class', 'park']
};

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [79.84713269736415,6.930701407232874]}}
  ]
};

const line = {
  type: 'geojson',
  data: 'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'
}

const getNewGeo = (lng,lat) => {
  const geo = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Point', coordinates: [lng,lat]}}
    ]
  };
  return geo
};

let lng = 79.84713269736415
let lat = 6.930701407232874



export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.source = React.createRef();
  }

  state = {
      viewport : {
      },
      style : 'mapbox://styles/mapbox/streets-v11'
    };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getCurrentPosCallback)
  }

  getgeo = () => {
    lng += 0.05;
    lat += 0.05;
    return getNewGeo(lng,lat)
  };
  getCurrentPosCallback = (pos) => {
    const viewport = {
      width: '80%',
      height: 500,
      latitude: 45.632433,
      longitude: -122.019807,
      zoom: 8
    };
    this.setState({
      viewport:viewport
    });
  };

  render(){
    const {parkColor = '#dea'} = this.props;
    return (
      <ReactMapGL
        mapboxApiAccessToken = {MAPBOX_TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport)=>{this.setState({viewport:viewport})}}
        mapStyle = {this.state.style}
      >
        <Source id="my-data" type="geojson" data={'https://docs.mapbox.com/mapbox-gl-js/assets/hike.geojson'}>
          <Layer
            id="point"
            type="line"
            paint={{
              'line-color': 'yellow',
              'line-opacity': 0.75,
              'line-width': 5
            }} />
        </Source>
      </ReactMapGL>
    )
  }
}

