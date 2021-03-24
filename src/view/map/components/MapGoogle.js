import React from 'react';
import { Radio } from 'antd';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  OverlayView,
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

// export const KEY_GOOGLE_MAP = 'AIzaSyA9SPYP838bh5o7pBC8xA7632sDJ0jJwxM';
export const KEY_GOOGLE_MAP = 'AIzaSyDemuTXbh1ONO1hYzbfP-TGCkPRI2jwaPA';

// const BLUE = '#00B6F3';
const WHITE = '#FFFFFF';

const MapGoogle = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE_MAP}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ width: '100%', height: '100%' }} />,
    containerElement: <div style={{ width: '100%', height: '100%' }} />,
    mapElement: <div style={{ width: '100%', height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const { deviceList, deviceSelected, handleSelectDevice } = props;
  // const items = [{ latitude: 21.00626, longitude: 105.85537, id: 1 }];
  // const coordinateActive = { latitude: 21.00626, longitude: 105.85537 };

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
    <GoogleMap
      defaultZoom={zoom}
      center={{
        lat: deviceSelected.latitude,
        lng: deviceSelected.longitude,
      }}
      key={KEY_GOOGLE_MAP}
      defaultOptions={disableOption}
    >
      {(deviceList || []).map((el) => {
        // console.log('el', el);
        // const isActive = el.device_id === deviceSelected.device_id;
        const isOnline = el.status;
        return (
          <OverlayView
            key={el.device_id}
            position={{ lat: el.latitude, lng: el.longitude }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={getPixelPositionOffset}
          >
            <div
              style={{
                backgroundColor: WHITE,
                color: '#212121',
                // backgroundColor: isActive ? BLUE : WHITE,
                // color: isActive ? WHITE : BLUE,
                fontSize: 14,
                lineHeight: '17px',
                padding: '3px 6px',
                borderRadius: 8,
                position: 'relative',
              }}
              onClick={() => handleSelectDevice(el)}
              aria-hidden="true"
            >
              <div>
                <Radio
                  checked
                  className={isOnline ? 'online-device' : 'offline-device'}
                />
                {el.device_name}
              </div>
              <div
                style={{
                  width: 9,
                  height: 9,
                  backgroundColor: WHITE,
                  // backgroundColor: isActive ? BLUE : WHITE,
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
  );
});

export default MapGoogle;
