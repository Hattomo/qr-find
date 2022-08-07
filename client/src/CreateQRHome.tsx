import { Link } from "react-router-dom";
import './Common.css'
import './CreateQRHome.css';

function CreateQRHome() {
    function test() {
        console.log("###");
    }
    return (
        <div>
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
                    <input type="email" placeholder="Input your mail📩"></input>
                    <h3>Input Memo</h3>
                    <textarea placeholder="Input memo &#10;ex. Macbook"></textarea>
                </div>
                <Link to="/QRGenerateHome">
                    <button className='MakeQRButton' onClick={test}>Make QR</button>
                </Link>
            </body>
        </div>
    );
}

export default CreateQRHome;
