import React from "react";
import InlineStyleRenderer from "./InlineStyleRenderer";

export default function List(props) {
    const { value, tag } = props;
    /*
        value：Array数据结构
        tag：List列表的类型
            false：无序列表
            true：有序列表
    */
    return (
        <div>
            {/* 此处为一个列表块 */}
            {value.map((item, index) => (
                <div key={JSON.stringify(item) + index}>
                    {/* 此处为列表块中的一行 item */}
                    <span className="whitespace-pre text-indigo-500 mr-1">
                        {tag === true ? index + 1 : "-"}
                    </span>
                    <InlineStyleRenderer value={item} />
                </div>
            ))}
        </div>
    );
}
