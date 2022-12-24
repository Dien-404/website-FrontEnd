import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MyContext } from "../routers/index";
import { http, GETUSER } from "../utils/request";

export default function User() {
    const navigate = useNavigate();
    const { loginUser, setLoginUser } = useContext(MyContext);
    const [user, setUser] = useState({});
    const { email, photo, name } = user;
    // 注销
    function handleLogout() {
        // 清除token
        localStorage.removeItem("token");
        // 清除userContext
        setLoginUser({});

        setTimeout(() => {
            // 重导航
            navigate("/welcome");
        }, 300);
        alert("注销成功");
    }

    useEffect(() => {
        (async () => {
            if (loginUser.email !== undefined) {
                const res = await http.post(GETUSER);
                if (res.status === 200) {
                    setUser(res.data.data);
                    console.log(res.data.data);
                }
            }
        })();
    }, [loginUser]);

    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className="">目前暂未支持其他操作，敬请谅解</div>

            <div className="">{email}</div>
            <div className="">{photo}</div>
            <div className="">{name}</div>
            <div
                className="px-1 rounded ring-1 ring-indigo-500 hover:bg-indigo-500 duration-300 select-none cursor-pointer"
                onClick={() => {
                    handleLogout();
                }}
            >
                注销
            </div>
        </div>
    );
}
