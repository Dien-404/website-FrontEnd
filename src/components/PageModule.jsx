import React, { useState } from "react";
import Narbar from "./Narbar";
import ICP from "./ICP";

export default function PageModule(props) {
    const [menu, setMenu] = useState(false);
    return (
        <div
            className={`w-full h-screen max-h-screen flex flex-col items-center font-serif
        `}
        >
            {/* 导航栏 */}
            <Narbar page={props.page} menu={menu} setMenu={setMenu} />
            {/* 内容项 */}
            <div
                className={`w-full h-full flex flex-col justify-between grow mt-11 sm:mt-14 overflow-y-scroll sm:overflow-visible`}
            >
                <div className="grow bg-gray-100 sm:p-3">
                    <div className="bg-white h-full sm:p-2">
                        {props.children}
                    </div>
                </div>
                {/* ICP */}
                <ICP />
            </div>
        </div>
    );
}
