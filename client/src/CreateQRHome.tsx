import { Link } from "react-router-dom";
import './CreateQRHome.css';

function CreateQRHome() {
    function test() {
        console.log("###");
    }
    return (
        <div>
            <header className="App-header">
                <h1>QR Create</h1>
            </header>
            <body className='App body'>
                <Link to="/FoundQRHome">
                    <button className="FindPageButton" onClick={test}>Go to found page
                    </button>
                </Link>
                <input type="email" placeholder="Input your mail📩"></input>
                <button className='MakeQRButton' onClick={test}>Make QR</button>
            </body>
        </div>
    );
}

export default CreateQRHome;
