import { Link, useNavigate } from "react-router-dom";
import './Common.css'
import './CreateQRHome.css';
import axios from "axios";
import { useState } from "react";
import config from './config.json';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import './ApiResponse';
import { CreateApiResponse } from "./ApiResponse";


function CreateQRHome() {

    const navigate = useNavigate();
    const duration = 6000;
    const [state, setstate] = useState({
        email: "",
        memo: ""
    });

    const [snacks_state, set_snacks_state] = useState({
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

    const texthandleChange = (e: any) => {
        const { name, value } = e.target
        setstate({ ...state, [name]: value })
    }

    function make_qr(): void {
        if (state.email === "" || state.memo === "") {
            set_snacks_error_msg("Email or Memo is empty! 😱");
            snackstatehandleOpen("error");
            console.log("Email or Memo is empty! 😱");
            return;
        }
        snackstatehandleOpen("waiting");

        const post_config = {
            headers: {
                "Content-type": "application/json",
            },
            setTimeout: 6000,
        };
        axios.post(config.create_api, { email: state.email, memo: state.memo }, post_config)
            .then(function (response) {
                const res: CreateApiResponse = { status: response.status, data: { qr_id: response.data.Result.ID, email: state.email, memo: state.memo } };
                console.log(response);
                if (res.status === 200) {
                    setstate({ email: "", memo: "" });
                    navigate("/QRGenerateHome", { state: res});
                }
            })
            .catch(function (error) {
                console.log(error);
                set_snacks_error_msg("Error Occured! 😱 Please try again later");
                snackstatehandleOpen("error");
            });
    }

    return (
        <>
            <header className="App-header">
                <h1>QR Create</h1>
                <Link to="/FoundQRHome">
                    <button className="FindPageButton">Found QR →
                    </button>
                </Link>
            </header>
            <body className='App body'>
                <div className="input-form">
                    <h3>Input Mail Address</h3>
                    <input required name="email" type="email" placeholder="Input your mail📩" value={state.email} onChange={(e) => texthandleChange(e)}></input>
                    <h3>Input Memo</h3>
                    <textarea required name="memo" placeholder="Input memo &#10;ex. Macbook" value={state.memo} onChange={(e) => texthandleChange(e)}></textarea>
                </div>
                <button className='MakeQRButton' onClick={make_qr} >Make QR</button>

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
                    open={snacks_state.waiting}
                    autoHideDuration={duration}
                    onClose={() => snackstatehandleClose("waiting")}
                >
                    <Alert onClose={() => snackstatehandleClose("waiting")} severity="info" sx={{ width: '100%' }}>
                        Creating QR Code 🐳 Just waiting ...
                    </Alert>
                </Snackbar>
            </body>
        </>
    );
}

export default CreateQRHome;
