import React from "react";

export default function Code(props) {
    const { value } = props;
    return (
        <div
            className={`bg-gray-100 rounded whitespace-pre
            ${value.length !== 0 && "p-5"}`}
        >
            {value.map((item, index) => (
                <div key={JSON.stringify(item) + index}>{item}</div>
            ))}
        </div>
    );
}
