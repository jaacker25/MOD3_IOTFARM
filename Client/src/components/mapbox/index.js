import React,{Component} from 'react'
import MapGL,{Marker, Popup} from 'react-map-gl'
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import './index.css'

const TOKEN='pk.eyJ1IjoiamFhY2tlcjI1IiwiYSI6ImNrN2F0dTJhMDAzczYzZXFoYjZ1b254czIifQ.BKaLkPb4rQN6hiy3kTXvmQ'

export default class Map extends Component {
    state = {
    viewport: {
    width: "90vw",
    height: "50vh",
    latitude: 19.42,
    longitude: -99.16,
    minZoom: 8,
    maxZoom: 15,
    zoom:12,
    position:"relative"
      },
      popupInfo: null
    };
  

  _updateViewport = viewport => {
   this.setState({viewport});
  };



  _onClickMarker=params=> e=>{
      console.log('hola')
      console.log(params)
      const {longitude,latitude}=params
    this.setState({popupInfo: {longitude,latitude}});
  };

  _renderPopup() {
    const {popupInfo} = this.state;
    return (
      popupInfo && (
        <Popup 
          className="PopupMap"
          tipSize={10}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={true}
          onClose={() => this.setState({popupInfo: null})}
        >
        
        <p><b>Sensor</b> # 1</p>
        <p><b>Longitude=</b> {popupInfo.longitude}</p>
        <p><b>Latitude=</b> {popupInfo.latitude}</p>
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;
    return (
      <MapGL {...viewport} mapboxApiAccessToken={TOKEN} mapStyle="mapbox://styles/mapbox/outdoors-v11" onViewportChange={this._updateViewport}>
      <div style={{position:'absolute',top:'0',left:'0',padding:'10px'}}>
      </div>
      <Marker longitude={-99.1600} latitude={19.4200}> 
      <SettingsInputAntennaIcon className="farmSensorIcon"  onClick={this._onClickMarker({longitude:-99.1600,latitude:19.4200})}/>
      </Marker>
      {this._renderPopup()}
      </MapGL>
    )
  }
}
