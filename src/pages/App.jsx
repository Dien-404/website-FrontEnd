import React, { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";

import Narbar from "../components/basic/Narbar";
import ICP from "../components/basic/ICP";

import { MyContext } from "../routers/index";
import { http, INDEX } from "../utils/request";

export default function App() {
    const { loginUser, setLoginUser } = useContext(MyContext);
    useEffect(() => {
        (async () => {
            if (localStorage.getItem("token") && loginUser === undefined) {
                const res = await http.post(INDEX);
                if (res.status === 200) {
                    setLoginUser(res.data.email);
                }
            }
        })();
    }, [loginUser]);

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
                    <Outlet />
                </div>
                {/* ICP */}
                <ICP />
            </div>
        </div>
    );
}
