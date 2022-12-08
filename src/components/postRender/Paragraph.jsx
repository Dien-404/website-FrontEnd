import React from "react";
import InlineStyleRenderer from "./InlineStyleRenderer";

export default function Paragraph(props) {
    const { value } = props;
    return (
        <p className="mb-1 break-words">
            <InlineStyleRenderer value={value} />
        </p>
    );
}
