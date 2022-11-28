import { CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import './Common.css'

function Loading() {
    const override: CSSProperties = {
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"
    };
    return (
        <>
            <ScaleLoader color="#005FB0"
                cssOverride={override}/>
        </>
    );
}

export default Loading;
