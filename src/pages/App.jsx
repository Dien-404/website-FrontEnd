import React from "react";
import { Outlet } from "react-router-dom";
import Narbar from "../components/Narbar";
import ICP from "../components/ICP";

export default function App(props) {
    return (
        <div
            className={`w-full h-screen max-h-screen flex flex-col items-center font-serif
        `}
        >
            {/* 导航栏 */}
            <Narbar />
            {/* 内容项 */}
            <div
                className={`w-full h-full flex flex-col justify-between grow mt-11 sm:mt-14 overflow-y-scroll sm:overflow-visible`}
            >
                <div className="grow bg-white">
                    <Outlet />
                </div>
                {/* ICP */}
                <ICP />
            </div>
        </div>
    );
}
