import React from "react";
import InlineStyleRenderer from "./InlineStyleRenderer";

export default function Paragraph(props) {
    const { value, tag } = props;
    switch (tag) {
        case "br":
            // 换行
            return <br />;
        case "dv":
            // 分割
            return (
                <p className="border-t border-blue-500 h-auto my-1 rounded-full select-none" />
            );
        default:
            // 一般情况
            return (
                <p className="mb-1 break-words">
                    <InlineStyleRenderer value={value} />
                </p>
            );
    }
}
