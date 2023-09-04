import React, { useEffect, useState } from 'react';
import style from '../styles/deviceList.module.css';
import { useNavigate } from 'react-router-dom';

//Displays the Device's name ,id and status  
const DeviceList = (props) => {
    const navigate = useNavigate();
    const [deviceData, setDeviceDataNew] = useState([]);

    //user authenticaation
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn !== 'true') {
            navigate('/');
            return;
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch('http://127.0.0.1:8000/devicestatus/fetchdevicedetails/')
            .then((response) => response.json())
            .then((data) => {
                const deviceData = data.devicedata;
                setDeviceDataNew(deviceData);
            })
            .catch((error) => console.error('Error:', error));
    };
    //send selected device's data to dEviceDetails page
    const handleClick = (device) => {
        navigate('../devicedetails', { state: { data: device } });
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    return (
        <div className={style.main}>
            <div className={style['logout-button']}>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <h1 className={style['device-title']}>Registered Device List:</h1>

            <div className={style['device-list']}>
                {deviceData.map((device) => (
                    <div className={style['device-button']} key={device.id}>
                        <button onClick={() => handleClick(device)}>
                            <div className={style['device-info']}>
                                <div className={style['device-name-status']}>
                                    <span className={style['device-name']}>{device.devicename}</span>
                                    <span
                                        className={`${style['device-status']} ${device.devicestatus === 'live' ? style.live : style.down
                                            }`}
                                    >
                                        {device.devicestatus}
                                    </span>
                                </div>
                                <span className={style['device-id']}>{device.deviceid}</span>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeviceList;
