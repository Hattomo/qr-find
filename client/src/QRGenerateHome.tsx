import { Link } from "react-router-dom";
import QRCode from "react-qr-code";
import './Common.css'
import './FoundQRHome.css';

function QRGenerateHome() {
    function test() {
        console.log();
    }
    return (
        <>
            <header className="App-header">
                <h1>QR Generate</h1>
                <Link to="/CreateQRHome">
                    <button className="CreatePageButton" onClick={test}>Create QR →</button>
                </Link>
            </header>
            <body className='App body'>
                <h3>Print QR Code</h3>
                <QRCode title="QR" size={256} value="https://google.com" level="L" bgColor="#EDF0F8" />
            </body>
        </>
    );
}

export default QRGenerateHome;
