import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Common.css'
import './FoundQRHome.css';
import config from './config.json';

function FoundQRHome() {
    function test() {
        console.log(state);
    }
    const state = useLocation();
    const [message, setmessage] = useState("");
    console.log(state.state)
    function handleChange(event: any) {
        setmessage(event.target.value);
    }

    function post_data() {
        const post_config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        axios.post(config.send_api, { memo: "wwww", id: "0402d1de05b8720dda9c750142f80ffcd3e34c90170975d6cc61793" }, post_config)
            .then(function (response) {
                console.log(response);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <>
            <header className="App-header">
                <h1>QR Find</h1>
                <Link to="/CreateQRHome">
                    <button className="CreatePageButton" onClick={test}>Create QR →</button>
                </Link>
            </header>
            <body className='App body'>
                <h3>Scan QR Code</h3>
                <Link to="/QRReaderHome">
                    <button className='ScanQRButton' onClick={test}>Scan QR</button>
                </Link>
                <h3>Input messages to ower</h3>
                <textarea required placeholder="Input meassage. &#10;ex. &#10; I found at starbacks in Tokyo station and delived to Tokyo police box" value={message} onChange={(e) => handleChange(e)}></textarea>
                <p></p>
                <button className='ScanQRButton' onClick={post_data}>Submit</button>
                <p></p>
            </body>
        </>
    );
}

export default FoundQRHome;
