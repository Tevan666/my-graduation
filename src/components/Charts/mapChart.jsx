import { StatisticCard } from '@ant-design/pro-card';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getMapNum } from '@/services/ant-design-pro/api';
import { ChoroplethMap } from '@ant-design/maps';

const MapChart = () => {
  const [province_num, setProvince_num] = useState({ type: 'FeatureCollection', features: [] });
  const getPeopleNum = async () => {
    await getMapNum().then((res) => setProvince_num(res));
  };
  useEffect(() => {
    getPeopleNum();
  }, []);
  console.log(province_num, 'province_num');
  const config = {
    map: {
      type: 'mapbox',
      style: 'blank',
      center: [120.19382669582967, 30.258134],
      zoom: 3,
      pitch: 0,
    },
    source: {
      data: province_num.data,
      joinBy: {
        sourceField: 'code',
        geoField: 'adcode',
      },
    },
    viewLevel: {
      level: 'country',
      adcode: 100000,
    },
    autoFit: true,
    color: {
      field: 'value',
      value: ['#B8E1FF', '#7DAAFF', '#3D76DD', '#0047A5', '#001D70'],
      scale: {
        type: 'linear',
      },
    },
    style: {
      opacity: 1,
      stroke: '#ccc',
      lineWidth: 0.6,
      lineOpacity: 1,
    },
    label: {
      visible: true,
      field: 'name',
      style: {
        fill: '#000',
        opacity: 0.8,
        fontSize: 10,
        stroke: '#fff',
        strokeWidth: 1.5,
        textAllowOverlap: false,
        padding: [5, 5],
      },
    },
    state: {
      active: {
        stroke: 'black',
        lineWidth: 1,
      },
    },
    tooltip: {
      items: ['name', 'adcode', 'value'],
    },
    zoom: {
      position: 'bottomright',
    },
    legend: {
      position: 'bottomleft',
    },
  };
  return (
    <StatisticCard
      title="全国各省使用次数"
      style={{ height: '600px' }}
      chart={
        <div style={{ height: 530 }}>
          <ChoroplethMap {...config} />
        </div>
      }
    />
  );
};

export default MapChart;
