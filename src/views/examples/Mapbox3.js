import React from 'react';
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, RotationControl } from 'react-mapbox-gl';

import {MAPBOX_TOKEN} from "../../config";

// tslint:disable-next-line:no-var-requires
const mapData = require('../demos/allShapesStyle');
// tslint:disable-next-line:no-var-requires
const route = require('../demos/route');

const mappedRoute = route.points.map(
  point => [point.lng, point.lat]
);

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});


const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
};

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 12
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
    center: [-0.120736, 51.5118219],
    zoom: [8],
    circleRadius: 30,
    routeIndex: 0,
    route:[]
  };
  mounted = false;

  UNSAFE_componentWillMount() {
    this.mounted = true;
    this.timeoutHandle = setTimeout(() => {
      if (this.mounted) {
        this.setState({
          center: mappedRoute[0],
          zoom: [10],
          circleRadius: 10
        });
      }
    }, 2000);

    this.intervalHandle = setInterval(() => {
      if (this.mounted) {
        this.setState({
          route: [...this.state.route , mappedRoute[this.state.routeIndex]],
          routeIndex: this.state.routeIndex + 1,
        });
      }
    }, 3000);
  }

   componentWillUnmount() {
    clearTimeout(this.timeoutHandle);
    clearInterval(this.intervalHandle);
  }

   getCirclePaint = () => ({
    'circle-radius': this.state.circleRadius,
    'circle-color': '#E54E52',
    'circle-opacity': 0.8
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
            height: '70vh',
            width: '70vw',
          }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {/* Controls */}
          <ScaleControl />
          <ZoomControl />
          <RotationControl style={{ top: 80 }} />

          {/* Line example */}
          <Layer type="line" layout={lineLayout} paint={linePaint}>
            <Feature coordinates={this.state.route} />
          </Layer>

          {/* Circle example */}
          <Layer type="circle" paint={this.getCirclePaint()}>
            <Feature coordinates={mappedRoute[this.state.routeIndex]} />
          </Layer>
        </Map>
      </div>

    );
  }
}

export default AllShapes;