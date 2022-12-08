import React from "react";

export default function Code(props) {
    const { value } = props;
    return (
        <div
            className={`bg-slate-800 text-orange-400 rounded-md whitespace-pre
            ${value.length !== 0 && "p-5"}`}
        >
            {value.map((item, index) => (
                <div>{item}</div>
            ))}
        </div>
    );
}
