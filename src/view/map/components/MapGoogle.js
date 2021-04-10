import React, { useEffect, useState } from 'react';
import { Button, Radio } from 'antd';
import moment from 'moment';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  OverlayView,
  InfoWindow,
} from 'react-google-maps';
import * as icons from 'assets';
import { HistoryOutlined } from '@ant-design/icons';
import { compose, withProps } from 'recompose';
import { isEmpty } from 'utils/helpers/helpers';
import ViewDeviceModal from './ViewDeviceModal';

// export const KEY_GOOGLE_MAP = 'AIzaSyA9SPYP838bh5o7pBC8xA7632sDJ0jJwxM';
export const KEY_GOOGLE_MAP = 'AIzaSyDemuTXbh1ONO1hYzbfP-TGCkPRI2jwaPA';

// const BLUE = '#00B6F3';
const WHITE = '#FFFFFF';
let device_id = null;

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
  const [isLoaded, setLoaded] = useState(false);
  const [zoom] = React.useState(12);
  const [visible, setVisible] = useState(null);

  const handleCloseModal = () => {
    device_id = null;
    setVisible(null);
  };
  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    }; // eslint-disable-next-line
  }, []);

  const disableOption = {
    mapTypeControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    streetViewControl: false,
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
    <>
      <GoogleMap
        defaultZoom={zoom}
        center={{
          lat: deviceSelected.latitude,
          lng: deviceSelected.longitude,
        }}
        key={KEY_GOOGLE_MAP}
        defaultOptions={disableOption}
      >
        {isLoaded &&
          !isEmpty(deviceList) &&
          (deviceList || []).map((el) => {
            const dataInfo = [];
            [1, 2, 3, 4, 5, 6, 7, 8].forEach((idx) => {
              if (!el[`config${idx}`].is_display_data) {
                dataInfo.push({
                  ...el[`config${idx}`],
                  value: el.lastData[idx - 1],
                });
              }
            });
            // const isActive = el.device_id === deviceSelected.device_id;
            const isOnline = el.status;
            if (isEmpty(el)) return null;
            return (
              <>
                {/* <Marker
                  key={i}
                  position={{ lat: el.latitude, lng: el.longitude }}
                  onClick={() => {}}
                >
                  <InfoWindow onCloseClick={() => {}}>
                    <p>aaaa</p>
                  </InfoWindow>
                </Marker> */}
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
                        className={
                          isOnline ? 'online-device' : 'offline-device'
                        }
                      />
                      <span style={{ fontWeight: 600 }}>{el.device_name}</span>
                      <ul style={{ padding: '4px 20px' }}>
                        <span
                          style={{
                            marginLeft: -20,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <HistoryOutlined />
                          &nbsp;
                          {moment
                            .utc(el.lastReceived)
                            .format('DD/MM/YYYY HH:mm')}
                        </span>
                        <li>
                          <span style={{ fontWeight: 600 }}>Vin</span>
                          :&nbsp;{el.vin} (V)
                        </li>
                        {el.hasPump && (
                          <li style={{ color: el.status ? '#01bf01' : 'red' }}>
                            {el.status ? 'Đang kết nối' : 'Mất kết nối'}
                          </li>
                        )}
                        {!isEmpty(dataInfo) &&
                          dataInfo.map((infoItem, i) => (
                            <li
                              key={i}
                              style={{
                                color: infoItem.high_warning
                                  ? '#f44336'
                                  : infoItem.low_warning
                                  ? '#fdd835'
                                  : '#212121',
                              }}
                            >
                              <span style={{ fontWeight: 600 }}>
                                {infoItem.input_name}
                              </span>
                              :&nbsp;{infoItem.value} ({infoItem.input_unit})
                            </li>
                          ))}
                      </ul>
                      <Button
                        className="detail-btn"
                        type="primary"
                        onClick={(event) => {
                          device_id = el.device_id;
                          setVisible('view');
                          event.stopPropagation();
                        }}
                      >
                        Chi tiết
                      </Button>
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
                    >
                      <img
                        src={icons.ic_location}
                        style={{
                          transform: 'rotate(-45deg)',
                        }}
                      />
                    </div>
                  </div>
                </OverlayView>
              </>
            );
          })}
      </GoogleMap>
      {visible === 'view' && (
        <ViewDeviceModal device_id={device_id} handleClose={handleCloseModal} />
      )}
    </>
  );
});

export default MapGoogle;
