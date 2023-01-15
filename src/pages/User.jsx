import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MyContext } from "../routers/index";
import { http, GETUSER } from "../utils/request";

// 用户信息更改
function LabelAndInput(props) {
    const { value, setValue, label } = props;
    return (
        <div className="flex flex-row my-1">
            <label className="mr-2">{label}</label>
            <input
                type="text"
                className="ring-1 p-1 ring-rose-300 focus:ring-2 outline-none duration-300"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
        </div>
    );
}

// button
function MyButton(props) {
    const { handleClick, label } = props;
    return (
        <div
            className="px-1 rounded ring-1 ring-indigo-500 hover:bg-indigo-500 duration-300 select-none cursor-pointer"
            onClick={() => {
                handleClick();
            }}
        >
            {label}
        </div>
    );
}

export default function User() {
    // 重定向
    const navigate = useNavigate();
    // Mycontext读取
    const { loginUser, setLoginUser } = useContext(MyContext);
    const [user, setUser] = useState({});
    const { email, photo, name } = user;
    const [userName, setUserName] = useState(name);
    const [userPwd, setUserPwd] = useState("");

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

    // 仅从 MyContext 中读取 userContext 获取用户信息
    useEffect(() => {
        (async () => {
            if (loginUser.email !== undefined) {
                const res = await http.post(GETUSER);
                if (res.status === 200) {
                    setUser(res.data.data);
                }
            }
        })();
    }, [loginUser]);

    return (
        <div className="h-full flex flex-col items-center justify-center py-4">
            {/* 账户信息 */}
            <div className="mb-4 text-lg font-bold font-mono text-rose-300 select-none">
                {email}
            </div>
            {/* 头像 */}
            <div
                className="flex justify-center items-center w-28 h-28 rounded-full ring-1"
                onClick={() => {
                    // URL
                }}
            />
            <label>头像</label>
            <div className="flex flex-col my-10">
                <div className="flex flex-row my-1">
                    <label className="mr-2 flex items-center">昵称</label>
                    <input
                        type="text"
                        className="ring-1 p-1 ring-rose-300 focus:ring-2 focus:rounded outline-none duration-300"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                </div>
                <div className="flex flex-row my-1">
                    <label className="mr-2 flex items-center">密码</label>
                    <input
                        type="password"
                        className="ring-1 p-1 ring-rose-300 focus:ring-2 focus:rounded outline-none duration-300"
                        value={userPwd}
                        onChange={(e) => {
                            setUserPwd(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-row">
                <MyButton handleClick={() => {}} label="确认更改" />
                <div className="mx-2"></div>
                <MyButton handleClick={handleLogout} label="注销" />
            </div>
        </div>
    );
}
