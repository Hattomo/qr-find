import { Link } from "react-router-dom";
import './Common.css'
import './FoundQRHome.css';

function FoundQRHome() {
    function test() {
        console.log("###");
    }
    return (
        <div>
            <header className="App-header">
                <h1>QR Find</h1>
                <Link to="/CreateQRHome">
                    <button className="CreatePageButton" onClick={test}>Create QR →</button>
                </Link>
            </header>
            <body className='App body'>
                <h3>Scan QR Code</h3>
                <button className='ScanQRButton' onClick={test}>Scan QR</button>
                <h3>Input messages to ower</h3>
                <textarea placeholder="Input meassage. &#10;ex. &#10; I found at starbacks in Tokyo station and delived to Tokyo police box"></textarea>
                <p></p>
                <button className='ScanQRButton' onClick={test}>Submit</button>
            </body>
        </div>
    );
}

export default FoundQRHome;
