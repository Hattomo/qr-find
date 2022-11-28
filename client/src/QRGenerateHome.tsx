import { Link, useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import './Common.css'
import './FoundQRHome.css';
import { CreateApiResponse } from "./ApiResponse";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function QRGenerateHome() {

    const location = useLocation();
    const location_state = location.state as CreateApiResponse;
    return (
        <>
            <header className="App-header">
                <h1>QR Generate</h1>
                <Link to="/CreateQRHome">
                    <button className="CreatePageButton">Create QR →</button>
                </Link>
            </header>
            <body className='App body'>
                <h3>Print QR Code</h3>
                <QRCode title="QR" size={256} value={location_state.data.qr_id} level="L" bgColor="#EDF0F8" />
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    onClose={() => { }}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Just create QR Code for You 🎉
                    </Alert>
                </Snackbar>
            </body>
        </>
    );
}

export default QRGenerateHome;
