import { Link } from "react-router-dom";
import './Common.css'

function PageNotFound() {
    function test() {
        console.log("###");
    }
    return (
        <div>
            <header className="App-header">
                <h1>404 NOT FOUND</h1>
            </header>
            <body className='App body'>
            </body>
        </div>
    );
}

export default PageNotFound;