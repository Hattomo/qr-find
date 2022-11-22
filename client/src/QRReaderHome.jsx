import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import './Common.css'
import './QRReaderHome.css'

const CreateQRHome = (props) => {
    const [data, setData] = useState('No result');
    const navigate = useNavigate();
    const handleScan = data => {
        // console.log(data)
    }
    const handleError = err => {
        // console.error(err)
    }
    console.log(data)
    if (data !== 'No result') {
        navigate('/FoundQRHome', { state: { data: data } })
    }
    return (
        <>
            <header className='App-header'>
                <h1>QR Reader</h1>
            </header>
            <body>
                <h3>Scan QR Code</h3>
                <QrReader className='QRcodeReader'
                    scanDelay={1000}
                    onScan={handleScan}
                    onError={handleError}
                    onResult={(result, error) => {
                        if (!!result) {
                            setData(result?.text);
                        }
                        if (!!error) {
                            // console.info(error);
                        }
                    }}
                />
                <p>{data}</p>
            </body>
        </>
    );
};

export default CreateQRHome;
