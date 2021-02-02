import React from 'react';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  OverlayView,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

export const KEY_GOOGLE_MAP = 'AIzaSyA9SPYP838bh5o7pBC8xA7632sDJ0jJwxM';
const BLUE = '#00B6F3';
const WHITE = '#FFFFFF';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE_MAP}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ width: '100%', height: '100%' }} />,
    containerElement: <div style={{ width: '100%', height: '100%' }} />,
    mapElement: <div style={{ width: '100%', height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const items = [{ latitude: 21.00626, longitude: 105.85537, id: 1 }];
  const coordinateActive = { latitude: 21.00626, longitude: 105.85537 };
  const [zoom] = React.useState(12);

  const disableOption = {
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: true,
    streetViewControl: true,
    zoomControl: true,
    keyboardShortcuts: true,
    draggableCursor: 'pointer',
    // gestureHandling: "none",
  };
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });
  return (
    <div style={{ height: 500, width: '100%' }}>
      <GoogleMap
        defaultZoom={zoom}
        center={{
          lat: coordinateActive.latitude,
          lng: coordinateActive.longitude,
        }}
        key={KEY_GOOGLE_MAP}
        defaultOptions={disableOption}
      >
        {items.map((el) => {
          const isActive = true;
          return (
            <OverlayView
              key={el.id}
              position={{ lat: el.latitude, lng: el.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <div
                style={{
                  backgroundColor: isActive ? BLUE : WHITE,
                  fontSize: 14,
                  lineHeight: '17px',
                  padding: '3px 6px',
                  borderRadius: 8,
                  position: 'relative',
                  color: isActive ? WHITE : BLUE,
                }}
                onClick={() => {}}
                aria-hidden="true"
              >
                <div>aaaa</div>
                <div
                  style={{
                    width: 9,
                    height: 9,
                    backgroundColor: isActive ? BLUE : WHITE,
                    transform: 'rotate(45deg)',
                    position: 'absolute',
                    left: 'calc(50% - 5px)',
                    marginTop: -1,
                  }}
                />
              </div>
            </OverlayView>
          );
        })}
      </GoogleMap>
    </div>
  );
});

export default Map;
