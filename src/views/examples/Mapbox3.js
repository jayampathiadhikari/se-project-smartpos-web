import React from 'react';
import ReactMapboxGl, { Layer, Feature, ScaleControl, ZoomControl, RotationControl } from 'react-mapbox-gl';

import {MAPBOX_TOKEN} from "../../config";
import {setSignInStatus} from "../../redux/reducers/authentication/action";
import {setSimulation} from "../../redux/reducers/ui/action";
import {connect} from "react-redux";

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

  componentDidMount() {
    this.mounted = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevProps.simulation != this.props.simulation) && this.props.simulation){
      console.log("state changed");
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
      }, 1000);
    }
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
                <Feature coordinates={this.state.route} />
              </Layer>
              <Layer type="circle" paint={this.getCirclePaint()}>
                <Feature coordinates={mappedRoute[this.state.routeIndex]} />
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
});

const bindAction = (dispatch) => ({
  setSimulation: (status) => dispatch(setSimulation(status)),
});

export default connect(
  mapStateToProps,
  bindAction
)(AllShapes);