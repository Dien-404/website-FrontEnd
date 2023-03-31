import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MyContext } from "../routers/index";
import { http, GETUSER, UPDATEPHOTO, UPDATENAME } from "../utils/request";

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
    const { setLoginUser, showAlert } = useContext(MyContext);
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState("");
    const [userName, setUserName] = useState("");
    const [auth, setAuth] = useState(0);

    function rejectVisit() {
        navigate("/welcome");
        showAlert(2000, "您未登录");
    }

    // 处理确认信息（更改名字）
    async function handleSure() {
        const isUpdate = await http.post(UPDATENAME, { newName: userName });
        if (isUpdate.status === 200) {
            showAlert(1000, "修改成功");
            getUserDetail();
        } else {
            showAlert(2000, "修改失败");
        }
    }
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
        showAlert(2000, "注销成功");
    }

    // 更换头像
    async function handleUpdatePhoto(e) {
        // handleUploadPhoto
        if (e.target.files.length !== 0) {
            const formData = new FormData();
            formData.append("avater", e.target.files[0]);
            // 发送请求
            const res = await http.post(UPDATEPHOTO, formData);
            if (res.status === 200) {
                getUserDetail();
            }
        }
    }

    // 获取用户信息
    async function getUserDetail() {
        try {
            const res = await http.post(GETUSER);
            if (res.status === 200) {
                const { email, photo, name, auth } = res.data.data;
                setEmail(email);
                setPhoto(photo);
                setUserName(name);
                setAuth(auth);
            }
        } catch {
            rejectVisit();
        }
    }

    // 仅从 MyContext 中读取 userContext 获取用户信息
    useEffect(() => {
        (async () => {
            await getUserDetail();
        })();
    }, [email]);

    return (
        <div className="h-full flex flex-col items-center justify-center py-4">
            {/* 账户信息 */}
            <div className="mb-4 text-lg font-bold font-mono text-rose-300 select-none">
                {email}
            </div>
            {/* 头像 */}
            <div
                className="relative flex justify-center items-center w-28 h-28 bg-cover bg-center rounded-full cursor-pointer ring-1 ring-black"
                style={{ backgroundImage: `url(${photo})` }}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => {
                        handleUpdatePhoto(e);
                    }}
                />
            </div>
            <div className="select-none text-gray-300">点击更换头像</div>
            <div className="flex flex-col my-10 items-center">
                <div className="flex flex-row my-1">
                    <label className="mr-2 flex items-center">昵称</label>
                    <input
                        type="text"
                        className="ring-1 p-1 px-2 ring-rose-300 focus:ring-2 focus:rounded outline-none duration-300"
                        maxLength={12}
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    />
                </div>
                {/* <div className="flex flex-row my-1 text-gray-400">
                    <label className="mr-2 flex items-center">
                        想要修改密码，请点击
                    </label>
                    <div className="underline cursor-pointer hover:text-black duration-300">
                        here
                    </div>
                </div> */}
            </div>
            <div className="flex flex-row">
                <div className={`mr-4 ${auth > 5 ? "flex" : "hidden"}`}>
                    <MyButton
                        handleClick={() => {
                            navigate("/admin");
                        }}
                        label="Admin"
                    />
                </div>
                <MyButton
                    handleClick={() => {
                        handleSure();
                    }}
                    label="确认更改"
                />
                <div className="mx-2" />
                <MyButton
                    handleClick={() => {
                        handleLogout();
                    }}
                    label="注销"
                />
            </div>
        </div>
    );
}
