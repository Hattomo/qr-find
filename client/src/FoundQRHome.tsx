import axios from "axios";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Common.css'
import './FoundQRHome.css';
import config from './config.json';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function FoundQRHome() {
    function test() {
        console.log(state);
    }
    const duration = 6000;
    const state = useLocation();
    const [message, setmessage] = useState("");
    console.log(state.state)

    function handleChange(event: any) {
        setmessage(event.target.value);
    }

    const [snacks_state, set_snacks_state] = useState({
        success: false,
        waiting: false,
        error: false,
    })

    const [snacks_error_msg, set_snacks_error_msg] = useState(
        "Error Occured! 😱"
    );

    const snackstatehandleOpen = (state: string) => {
        set_snacks_state({ ...snacks_state, [state]: true });
    }

    const snackstatehandleClose = (state: string) => {
        set_snacks_state({ ...snacks_state, [state]: false });
    }

    function post_data() {
        if (message === "" || state === null) {
            set_snacks_error_msg("QR Code or message is empty! 😱");
            snackstatehandleOpen("error");
            console.log("QR Code or message is empty! 😱");
            return;
        }
        snackstatehandleOpen("waiting");
        const post_config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        axios.post(config.send_api, { memo: message, id: "1c49d1c20ab4f2780408f957f7df56ab9b603b6774a0cd1123a66572b145ce6c" }, post_config)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setmessage("");
                    snackstatehandleOpen("success");
                }
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    set_snacks_error_msg("QR Code Not Found! 😱");
                    snackstatehandleOpen("error");
                } else {
                    set_snacks_error_msg("Error Occured! 😱 Please try again later");
                    snackstatehandleOpen("error");
                }
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
                <Snackbar
                    open={snacks_state.error}
                    autoHideDuration={duration}
                    onClose={() => snackstatehandleClose("error")}
                >
                    <Alert onClose={() => snackstatehandleClose("error")} severity="error" sx={{ width: '100%' }}>
                        {snacks_error_msg}
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={snacks_state.success}
                    autoHideDuration={duration}
                    onClose={() => snackstatehandleClose("success")}
                >
                    <Alert onClose={() => snackstatehandleClose("success")} severity="success" sx={{ width: '100%' }}>
                        Your data has been sent successfully! Thank you 😊
                    </Alert>
                </Snackbar>

                <Snackbar
                    open={snacks_state.waiting}
                    autoHideDuration={duration}
                    onClose={() => snackstatehandleClose("waiting")}
                >
                    <Alert onClose={() => snackstatehandleClose("waiting")} severity="info" sx={{ width: '100%' }}>
                        Sending your data 🐳 Just waiting ...
                    </Alert>
                </Snackbar>
            </body>
        </>
    );
}

export default FoundQRHome;
