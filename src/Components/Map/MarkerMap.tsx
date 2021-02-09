import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import ScooterMarker from './mark-scooter-available-32px-x-32px.png';

interface InnerProps {
  center: any;
  children: any;
}
interface OuterProps {
  center: any;
  children: any;
}
const MapComponent = compose<InnerProps, OuterProps>(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDASQ1gDtuxVXsoeJZHXqsNRASQ17yVoEI',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `300px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const defaultCenter = { lat: -34.397, lng: 150.644 }

  return (
    <div style={{ width: '100%', height: '100%', maxHeight: '300px' }}>
      <GoogleMap
        defaultZoom={12}
        defaultCenter={props.center || defaultCenter}
        center={props.center}
        defaultOptions={{
          streetViewControl: false,
          scaleControl: true,
          mapTypeControl: false,
          panControl: false,
          zoomControl: true,
          rotateControl: false,
          fullscreenControl: true,
          disableDefaultUI: true,
          scrollwheel: true,
        }}
      >
        {props.children}
      </GoogleMap>
    </div>
  );
});

const MarkerMap = ({ markers, center }: any) => {
  return (
    <MapComponent center={center}>
      {markers &&
        markers.map((item: any) => {
          return (
            <Marker
              position={{
                lat: parseFloat(item.lat),
                lng: parseFloat(item.lon),
              }}
              icon={ScooterMarker}
              key={item.id_device}
            />
          );
        })}
    </MapComponent>
  );
};

export default MarkerMap;
