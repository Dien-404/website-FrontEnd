import React, { useContext } from "react";
import PageModule from "../components/PageModule";
import { ToastContext } from "../routers/index";

export default function Home(props) {
    const showToast = useContext(ToastContext);
    return (
        <PageModule page="Home">
            <>
                <div
                    className="h-20"
                    onClick={() => {
                        showToast("click over");
                    }}
                >
                    Home1
                </div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home</div>
                <div className="h-20">Home998</div>
                <div className="h-20">Home999</div>
                <div className="h-20">Homex</div>
            </>
        </PageModule>
    );
}
