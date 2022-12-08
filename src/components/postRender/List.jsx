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
                <div>
                    {/* 此处为列表块中的一行 item */}
                    <span className="whitespace-pre text-indigo-500">
                        {tag === true ? index + 1 + ". " : "-  "}
                    </span>
                    <InlineStyleRenderer value={item} />
                </div>
            ))}
        </div>
    );

    // // 以下仅渲染列表行，不包含在一个列表块中
    // return value.map((item, index) => (
    //     <div>
    //         <span className="whitespace-pre text-indigo-500">
    //             {props.tag === true ? index + 1 + ". " : "-  "}
    //         </span>
    //         {/* {item} */}
    //         <InlineStyleRenderer value={item} />
    //     </div>
    // ));
}
