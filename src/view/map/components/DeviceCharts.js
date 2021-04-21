import React, { useRef } from 'react';
import moment from 'moment';
import { isEmpty } from 'utils/helpers/helpers';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);
/* eslint-disable */
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
  const chartEl = useRef(null);
  const element = useRef();

  const { list_data_in_day, device } = deviceInfo;
  const getConfigSeries = () => {
    let configs = [];
    if (!isEmpty(device)) {
      [1, 2, 3, 4, 5, 6, 7, 8].forEach((it) => {
        const info = device[`config${it}`];
        if (info.is_display_graph) {
          configs.push({
            name: info.input_name,
            index: it - 1,
            data: [],
            color: colors[it - 1],
            field: `config${it}`,
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

  // test
  const generateChartData = () => {
    let chartData = [];
    let firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 100);
    firstDate.setHours(0, 0, 0, 0);

    if (!isEmpty(list_data_in_day)) {
      list_data_in_day.forEach((el, i) => {
        let result = { date: new Date(el.dt) };
        if (!isEmpty(dataConfigDevice)) {
          dataConfigDevice.forEach((el, idx) => {
            result = { ...result, [el.field]: el.data[i] };
          });
        }
        chartData.push(result);
      });
    }
    return chartData;
  };
  const createAxisAndSeries = (chart, field, name, opposite) => {
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if (chart.yAxes.indexOf(valueAxis) != 0) {
      valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
    }

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = '{name}: [bold]{valueY}[/]';
    series.tensionX = 0.8;
    series.showOnInit = true;

    let interfaceColors = new am4core.InterfaceColorSet();

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.stroke = interfaceColors.getFor('background');
    bullet.circle.strokeWidth = 2;

    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
  };
  const buildChart = () => {
    if (element.current) {
      let chart = am4core.create('chartdiv', am4charts.XYChart);
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormatter.dateFormat = 'HH:mm:ss';
      dateAxis.renderer.minGridDistance = 50;
      chart.data = generateChartData();
      chart.colors.step = 2;
      if (!isEmpty(dataConfigDevice)) {
        dataConfigDevice.forEach((el, i) => {
          createAxisAndSeries(chart, el.field, el.name, i % 2 === 0, 'circle');
        });
      }
      chart.legend = new am4charts.Legend();

      // Add cursor
      chart.cursor = new am4charts.XYCursor();
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.minHeight = 28;
      // scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      chartEl.current = chart;
    }
  };
  React.useEffect(() => {
    buildChart();
    return () => {
      chartEl?.current?.dispose();
    }; // eslint-disable-next-line
  }, [deviceInfo]);
  return (
    <>
      <div
        ref={element}
        id="chartdiv"
        style={{
          height: 250,
          width: '100%',
          opacity: 1,
          transition: 'opacity 0.3s',
          display: 'flex',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
    </>
  );
};
export default DeviceCharts;
