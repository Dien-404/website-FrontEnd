import React from "react";
import InlineStyleRenderer from "./InlineStyleRenderer";

export default function Title(props) {
    const { tag, value } = props;
    return (
        <div
            className={`font-bold cursor-default truncate mb-1 text-indigo-500 hover:text-teal-500 duration-300
            ${
                tag === "first" &&
                "text-3xl pl-4 mb-4 border-l-4 border-teal-500"
            }
            ${tag === "second" && "text-2xl"}
            ${tag === "third" && "text-xl"}
            ${tag === "default" && "text-lg"}`}
        >
            <InlineStyleRenderer value={value} />
        </div>
    );
}
