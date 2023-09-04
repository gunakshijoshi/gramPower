
import Chart from 'react-google-charts'
import React, { useEffect, useState } from 'react'

const LineChart = () => {
  const [allData, setallData] = useState([])
  const fetchData = () => {
    fetch('http://127.0.0.1:8000/devicestatus/fetchdevicedetails/')
      .then((response) => response.json())
      .then((data) => {
        const allData = data.devicedata;
        setallData(allData)
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
      console.log("time")
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  console.log(allData)


  console.log(allData)
  const chartData = [['Time', 'Avg Current', 'Avg Voltage', { role: 'tooltip' }]];

  allData.forEach((device) => {
    const tooltip = `${device.devicename}\nAvg Current: ${device.avgcurrent}\nAvg Voltage: ${device.avgvoltage}`;
    chartData.push([device.lastdatapoint, device.avgcurrent, device.avgvoltage, tooltip]);
  });


  console.log(chartData)

  const LineChartOptions = {
    hAxis: {
      title: 'Time',
    },
    vAxis: {
      title: 'Value',
    },
    series: {
      0: { curveType: 'function', color: 'blue' }, // Avg Current
      1: { curveType: 'function', color: 'gray' }, // Avg Voltage
    },
  }


  return (
    <div className="container mt-5">
      <Chart
        width={'700px'}
        height={'410px'}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={chartData}
        options={LineChartOptions}
        rootProps={{ 'data-testid': '2' }}
      />
    </div>
  )


};

export default LineChart;
