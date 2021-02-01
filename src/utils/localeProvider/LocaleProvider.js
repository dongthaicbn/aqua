import React from 'react';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import en_US from 'antd/lib/locale-provider/en_US';
import vi from '../locales/vi.json';
import en from '../locales/en.json';

moment.locale('vi');
const getLocale = locale => ({
  locale,
  messages: locale === 'en' ? en : vi
});

const LocaleComponent = props => {
  return (
    <IntlProvider {...getLocale(props.locale)}>
      <ConfigProvider locale={props.locale === 'en' ? en_US : vi_VN}>
        {props.children}
      </ConfigProvider>
    </IntlProvider>
  );
};

export default connect(
  state => ({
    locale: state.system.locale
  }),
  null
)(LocaleComponent);
