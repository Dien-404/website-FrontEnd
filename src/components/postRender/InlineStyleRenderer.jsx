import React from "react";

function InlineStyle(props) {
    // const { italic, bold, code, link, value } = props;
    const { italic, bold, code, value } = props;
    /*
        italic：斜体
        bold：粗体
        code：行内代码
        link：超链接
        value：文本内容
    */
    return (
        <span
            className={`whitespace-pre 
            ${(bold === true || italic === true) && "text-lime-500"}
            ${bold === true && "font-bold"}
            ${italic === true && "italic"}
            ${code === true && "bg-red-100/75 rounded-md font-sans"}`}
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
    return value.map((item) => {
        if (typeof item === "string") {
            return item;
        } else if (typeof item === "object") {
            return (
                <InlineStyle
                    key={item.value}
                    italic={item.italic}
                    bold={item.bold}
                    code={item.code}
                    value={item.value}
                />
            );
        }
        return void 0;
    });
}
