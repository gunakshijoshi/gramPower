import React, { useEffect } from 'react';
import style from '../styles/deviceDetails.module.css';
import LineChart from './LineChart';
import LoginForm from './LoginForm';
import { useNavigate, useLocation } from 'react-router-dom';


//Display Details for a device using data coming from DeviceList.js
const DeviceDetails = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  
  //checks basic user authentication
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/');
      return;
    }
  }, []);
  const deviceData = location.state?.data || null;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div>
      <div className={style['logout-button']}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={style['tables-container']}>
        <table className={style.table}>
          <tbody>
            <tr>
              <td>Device ID</td>
              <td>{deviceData.deviceid}</td>
            </tr>
            <tr>
              <td>Device Name</td>
              <td>{deviceData.devicename}</td>
            </tr>
          </tbody>
        </table>
        <table className={style.table}>
          <tbody>
            <tr>
              <td>Device Status</td>
              <td>{deviceData.devicestatus}</td>
            </tr>
            <tr>
              <td>Last Data Point</td>
              <td>{deviceData.lastdatapoint}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={style.row}>
        <div className={style.column}>
          <p>Average Current</p>
          <p>{deviceData.avgcurrent}</p>
        </div>
        <div className={style.column}>
          <p>Average Voltage</p>
          <p>{deviceData.avgvoltage}</p>
        </div>
        <div className={style.column}>
          <p>Total Consumption</p>
          <p>{deviceData.totalconsumptions}</p>
        </div>
      </div>
      <div className={style['line-chart-container']}>
        <LineChart />
      </div>
    </div>
  );
};

export default DeviceDetails;
