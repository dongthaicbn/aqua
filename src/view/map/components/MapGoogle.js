import React, { useEffect, useState, useRef } from 'react';
import { Button, Radio } from 'antd';
import moment from 'moment';
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  // OverlayView,
  Marker,
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
let deviceSave = [];

const MapGoogle = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${KEY_GOOGLE_MAP}&v=3.exp&libraries=drawing`,
    loadingElement: <div style={{ width: '100%', height: '100%' }} />,
    containerElement: <div style={{ width: '100%', height: '100%' }} />,
    mapElement: <div style={{ width: '100%', height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  let ref = useRef(null);
  const { deviceList, deviceSelected, handleSelectDevice } = props;
  // const items = [{ latitude: 21.00626, longitude: 105.85537, id: 1 }];
  // const coordinateActive = { latitude: 21.00626, longitude: 105.85537 };
  const [isLoaded, setLoaded] = useState(false);
  const [zoom] = React.useState(12);
  const [visible, setVisible] = useState(null);
  const [coordinateActive, setCoordinateActive] = React.useState(
    !isEmpty(deviceSelected)
      ? { lat: deviceSelected.latitude, lng: deviceSelected.longitude }
      : { lat: 21.00626, lng: 105.85537 }
  );

  const defaultIcon = { url: icons.ic_location };
  const highlightedIcon = { url: icons.ic_location_online };
  const handleCloseModal = () => {
    device_id = null;
    setVisible(null);
  };
  // const fitBounds = () => {
  //   const bounds = new window.google.maps.LatLngBounds();
  //   items.map((el) => {
  //     const { coordinate } = el.address;
  //     bounds.extend({ lat: coordinate.latitude, lng: coordinate.longitude });
  //     return el.id;
  //   });
  //   if (!ref.current) return;
  //   ref.current.fitBounds(bounds);
  // };
  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
      // ref = null;
      deviceSave = [];
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
  // const getPixelPositionOffset = (width, height) => ({
  //   x: -(width / 2),
  //   y: -(height / 2),
  // });
  const fitBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    deviceList.map((el) => {
      bounds.extend({ lat: el.latitude, lng: el.longitude });
      return el.device_id;
    });
    if (!ref.current) return;
    ref.current.fitBounds(bounds);
  };
  useEffect(() => {
    if (
      !isEmpty(deviceList) &&
      JSON.stringify(deviceSave) !== JSON.stringify(deviceList)
    ) {
      deviceSave = [...deviceList];
      if (deviceList.length > 1) fitBounds();
    } // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (!isEmpty(deviceSelected))
      setCoordinateActive({
        lat: deviceSelected.latitude,
        lng: deviceSelected.longitude,
      }); // eslint-disable-next-line
  }, [deviceSelected]);
  return (
    <>
      <GoogleMap
        defaultZoom={zoom}
        center={coordinateActive}
        ref={ref}
        key={KEY_GOOGLE_MAP}
        defaultOptions={disableOption}
      >
        {isLoaded &&
          !isEmpty(deviceList) &&
          (deviceList || []).map((el) => {
            const dataInfo = [];
            [1, 2, 3, 4, 5, 6, 7, 8].forEach((it, idx) => {
              if (el[`config${it}`].is_display_data) {
                dataInfo.push({
                  ...el[`config${it}`],
                  value: el.lastData[it - 1],
                });
              }
            });
            // const isActive = el.device_id === deviceSelected.device_id;
            const isOnline = el.status;
            if (isEmpty(el)) return null;
            return (
              <Marker
                key={el.device_id}
                position={{ lat: el.latitude, lng: el.longitude }}
                // mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                // getPixelPositionOffset={getPixelPositionOffset}
                icon={isOnline ? highlightedIcon : defaultIcon}
                // icon={defaultIcon}
              >
                <InfoWindow
                // marker={this.state.activeMarker}
                // onClose={this.onInfoWindowClose}
                // visible={this.state.showingInfoWindow}
                >
                  <div
                    style={{
                      backgroundColor: WHITE,
                      color: '#212121',
                      // backgroundColor: isActive ? BLUE : WHITE,
                      // color: isActive ? WHITE : BLUE,
                      fontSize: 14,
                      lineHeight: '17px',
                      // padding: '3px 6px',
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

                        <div className="text-info-item">
                          <p>
                            Điện áp<span>:&nbsp;</span>
                          </p>
                          {el.vin} (V)
                        </div>
                        <div className="text-info-item">
                          <p>
                            Thiết bị<span>:&nbsp;</span>
                          </p>
                          <span
                            style={{ color: el.status ? '#01bf01' : 'red' }}
                          >
                            {el.status ? 'Đang kết nối' : 'Mất kết nối'}
                          </span>
                        </div>
                        {el.hasPump && (
                          <div className="text-info-item">
                            <p>
                              Bơm<span>:&nbsp;</span>
                            </p>
                            <span
                              style={{
                                color:
                                  el.pump_state === 'ON' ? '#01bf01' : 'red',
                              }}
                            >
                              {el.pump_state === 'ON'
                                ? 'Bật'
                                : el.pump_state === 'OFF'
                                ? 'Tắt'
                                : 'Mất kết nối'}
                            </span>
                          </div>
                        )}
                        <div className="divider-map-info" />
                        {!isEmpty(dataInfo) &&
                          dataInfo.map((infoItem, i) => (
                            <li
                              key={i}
                              style={{
                                color: infoItem.high_warning
                                  ? '#f44336'
                                  : infoItem.low_warning
                                  ? '#ff9800'
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
                    {/* <div
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
                        src={
                          isOnline
                            ? icons.ic_location_online
                            : icons.ic_location
                        }
                        style={{
                          transform: 'rotate(-45deg)',
                          width: 24,
                          marginTop: 6,
                          marginLeft: 6,
                        }}
                        alt=""
                      />
                    </div> */}
                  </div>
                </InfoWindow>
              </Marker>
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
