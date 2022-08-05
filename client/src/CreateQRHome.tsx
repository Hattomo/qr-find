
import './CreateQRHome.css';

function CreateQRHome() {
    function test() {
        console.log("###");
    }
    return (
        <div>
            <header className="App-header">
                <h1>QR Find</h1>
            </header>
            <body className='App body'>
                <button className="FindPageButton" onClick={test}>Go to found page</button>
                <input type="email" placeholder="Input your mail📩"></input>
                <button className='MakeQRButton' onClick={test}>Make QR</button>
            </body>
        </div>
    );
}

export default CreateQRHome;
