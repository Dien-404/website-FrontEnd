import React from "react";

export default function Content(props) {
    const { isPost, className, style } = props;
    return (
        <div
            className={`w-full sm:max-w-xl md:max-w-3xl ${
                isPost === true
                    ? "lg:max-w-3xl xl:max-w-4xl"
                    : "lg:max-w-5xl xl:max-w-6xl"
            } duration-500 ${className} `}
            style={style}
        >
            {props.children}
        </div>
    );
}
