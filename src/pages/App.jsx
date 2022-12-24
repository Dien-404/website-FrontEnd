import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import Narbar from "../components/basic/Narbar";
import ICP from "../components/basic/ICP";

export default function App() {
    const location = useLocation();
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
                <div className="grow">
                    <SwitchTransition mode="out-in">
                        <CSSTransition
                            appear
                            key={location.key}
                            timeout={300}
                            classNames="fade"
                            nodeRef={null}
                        >
                            <Outlet />
                        </CSSTransition>
                    </SwitchTransition>
                </div>
                {/* ICP */}
                <ICP />
            </div>
        </div>
    );
}
