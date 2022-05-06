import React from "react";
// import React, { useState } from "react";
import Lottie from "react-lottie";

export default function LottieController(props) {
    // const [isStopped, setIsStopped] = useState(true);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: props.animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div
        // onMouseOver={() => {
        //     setIsStopped(false);
        // }}
        >
            <Lottie
                options={defaultOptions}
                height={300}
                width={300}
                // isStopped={isStopped}
            />
        </div>
    );
}
