import React from 'react';
import {
  Marker,
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { ReactComponent as Box } from '../../Screens/MyFleet/Resources/Box.svg';
import { ReactComponent as Ship } from '../../Screens/MyFleet/Resources/Ship.svg';
import { ReactComponent as Factory } from '../../Screens/MyFleet/Resources/Factory.svg';
import { ReactComponent as Done } from '../../Screens/MyFleet/Resources/Done.svg';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const VectorMapView = (props) => {
  const { latLng, order } = props;
  return (
    <ComposableMap width={750} height={300} projectionConfig={{ scale: 115 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return geo.properties.ISO_A2 === order.country ? (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: '#1270e3',
                    outline: 'none',
                  },
                }}
              />
            ) : (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: '#EAEAEC',
                    outline: 'none',
                  },
                }}
              />
            );
          })
        }
      </Geographies>
      <Marker coordinates={[latLng.lng, latLng.lat]}>
        {order.status === 1 && <Factory />}
        {order.status === 2 && <Factory />}
        {order.status === 3 && <Ship />}
        {order.status === 4 && <Box />}
        {order.status === 5 && <Done />}
      </Marker>
    </ComposableMap>
  );
};

export default VectorMapView;
