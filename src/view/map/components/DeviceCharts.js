import React from 'react';
import moment from 'moment';
import ReactApexChart from 'react-apexcharts';
import { isEmpty } from 'utils/helpers/helpers';

const colors = [
  '#f44336',
  '#2196f3',
  '#9e9e9e',
  '#9c27b0',
  '#00bcd4',
  '#ffeb3b',
  '#ff5722',
  '#673ab7',
];
const DeviceCharts = (props) => {
  const { date, deviceInfo } = props;
  // console.log('date', date, deviceInfo);
  const { list_data_in_day, device } = deviceInfo;
  const getConfigSeries = () => {
    let configs = [];
    if (!isEmpty(device)) {
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((it) => {
        const info = device[`config${it}`];
        if (info.is_display_graph) {
          configs.push({
            type: 'line',
            name: info.input_name,
            index: it - 1,
            data: [],
            color: colors[it - 1],
          });
        }
      });
    }
    if (!isEmpty(list_data_in_day) && !isEmpty(configs)) {
      list_data_in_day.forEach((el) => {
        configs.map((item) => {
          return { ...item, data: item.data.push(el.data[item.index]) };
        });
      });
    }
    return configs;
  };
  const getCategories = () => {
    let result = [];
    if (!isEmpty(list_data_in_day)) {
      list_data_in_day.forEach((el) => {
        result.push(moment.utc(el.dt).format('HH:mm:ss'));
      });
    }
    return result;
  };

  const dataConfigDevice = getConfigSeries();
  const getYaxis = () => {
    let result = [];
    if (!isEmpty(dataConfigDevice)) {
      dataConfigDevice.forEach((el, i) => {
        result.push({
          seriesName: el.name,
          opposite: i !== 0,
          axisTicks: { show: true },
          axisBorder: { show: true, color: el.color },
          labels: { style: { colors: el.color } },
          title: { text: el.name, style: { color: el.color } },
        });
      });
    }
    return result;
  };
  const dataYaxis = getYaxis();
  const data = {
    // series: [
    //   {
    //     name: 'Income',
    //     type: 'line',
    //     data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    //   },
    //   {
    //     name: 'Cashflow',
    //     type: 'line',
    //     data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
    //   },
    //   {
    //     name: 'Revenue',
    //     type: 'line',
    //     data: [20, 29, 37, 36, 44, 45, 50, 58],
    //   },
    //   {
    //     name: 'Revenueaaaa',
    //     type: 'line',
    //     data: [20, 29, 37, 36, 44, 45, 50, 58],
    //   },
    // ],
    series: dataConfigDevice,
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: false,
      },
      dataLabels: { enabled: false },
      stroke: { width: [1, 1, 4] },
      title: {
        text: `Data Sensor Ngày ${moment(date).format('DD/MM/YYYY')}`,
        align: 'left',
        offsetX: 0,
      },
      xaxis: {
        // categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        categories: getCategories(),
      },
      yaxis: dataYaxis,
      // yaxis: [
      //   {
      //     axisTicks: { show: true },
      //     axisBorder: { show: true, color: '#008FFB' },
      //     labels: { style: { colors: '#008FFB' } },
      //     title: { text: 'Income', style: { color: '#008FFB' } },
      //     tooltip: { enabled: true },
      //   },
      //   {
      //     seriesName: 'Income',
      //     opposite: true,
      //     axisTicks: { show: true },
      //     axisBorder: { show: true, color: '#00E396' },
      //     labels: { style: { colors: '#00E396' } },
      //     title: { text: 'Operating', style: { color: '#00E396' } },
      //   },
      //   {
      //     seriesName: 'Revenue',
      //     opposite: true,
      //     axisTicks: { show: true },
      //     axisBorder: { show: true, color: '#FEB019' },
      //     labels: { style: { colors: '#FEB019' } },
      //     title: { text: 'Revenue', style: { color: '#FEB019' } },
      //   },
      //   {
      //     seriesName: 'Revenue',
      //     opposite: true,
      //     axisTicks: { show: true },
      //     axisBorder: { show: true, color: '#FEB019' },
      //     labels: { style: { colors: '#FEB019' } },
      //     title: { text: 'Revenueaaaa', style: { color: '#FEB019' } },
      //   },
      // ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: { horizontalAlign: 'left', offsetX: 40 },
    },
  };
  return (
    <>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="line"
          height={250}
          width="100%"
        />
      </div>
    </>
  );
};
export default DeviceCharts;
