import React from "react";

function InlineStyle(props) {
    // const { italic, bold, code, link, value } = props;
    const { italic, bold, code, cancel, link, value } = props;
    /*
        italic：斜体
        bold：粗体
        code：行内代码
        cancel：删除线
        link：超链接
        value：文本内容
    */
    return (
        <span
            className={`whitespace-pre inline-block 
            ${bold === true || italic === true ? "text-blue-500" : ""}
            ${bold === true ? "font-bold" : ""}
            ${italic === true ? "italic" : ""}
            ${code === true ? "bg-red-100/75 rounded-md font-sans" : ""}
            ${cancel === true ? "line-through text-red-500" : ""}`}
        >
            <span className="select-none">{value !== "" && " "}</span>
            {value}
            <span className="select-none">{value !== "" && " "}</span>
        </span>
    );
}

export default function InlineStyleRenderer(props) {
    const { value } = props;
    /*
        value：Array数据结构
    */
    return value.map((item, index) => {
        if (typeof item === "string") {
            return item;
        } else if (typeof item === "object") {
            return (
                <InlineStyle
                    key={JSON.stringify(item.value) + index}
                    italic={item.italic}
                    bold={item.bold}
                    code={item.code}
                    cancel={item.cancel}
                    value={item.value}
                />
            );
        }
        return void 0;
    });
}
