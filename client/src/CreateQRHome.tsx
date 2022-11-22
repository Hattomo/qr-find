import { Link } from "react-router-dom";
import './Common.css'
import './CreateQRHome.css';
import axios from "axios";
import { useState } from "react";
import config from './config.json';

function CreateQRHome() {
    const [state, setstate] = useState({
        email: "",
        memo: ""
    });

    function post_data() {
        const post_config = {
            headers: {
                "Content-type": "application/json",
            },
        };
        console.log(state);
        axios.post(config.create_api, { email: state.email, memo: state.memo }, post_config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleChange = (e: any) => {
        console.log(e.target)
        const { name, value } = e.target
        setstate({ ...state, [name]: value })
        console.log(state)
    }

    function test() {
        console.log("test");
    }

    return (
        <>
            <header className="App-header">
                <h1>QR Create</h1>
                <Link to="/FoundQRHome">
                    <button className="FindPageButton" onClick={test}>Found QR →
                    </button>
                </Link>
            </header>
            <body className='App body'>
                <div className="input-form">
                    <h3>Input Mail Address</h3>
                    <input name="email" type="email" placeholder="Input your mail📩" value={state.email} onChange={(e) => handleChange(e)}></input>
                    <h3>Input Memo</h3>
                    <textarea name="memo" placeholder="Input memo &#10;ex. Macbook" value={state.memo} onChange={(e) => handleChange(e)}></textarea>
                </div>
                <Link to="/QRGenerateHome">
                    <button className='MakeQRButton' onClick={post_data} >Make QR</button>
                </Link>
            </body>
        </>
    );
}

export default CreateQRHome;
