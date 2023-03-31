import React, { useState, useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { MyContext } from "../routers/index";
import { http, GETUSER } from "../utils/request";
import ScrollBarBeauty from "../components/basic/ScrollBarBeauty";
import FreezeScroll from "../components/basic/FreezeScroll";
import { WebData, UserControl, PostControl, WebControl } from "../assets/SVG";

// 导航
function Navi(props) {
    const navigate = useNavigate();
    return (
        <div className="h-14 flex justify-between px-3 shrink-0 items-center font-serif font-bold text-white bg-black">
            <span
                className="cursor-pointer"
                onClick={() => {
                    // 刷新页面操作
                    window.location.reload();
                }}
            >
                Dien's website Management System
            </span>
            <span
                className="cursor-pointer"
                onClick={() => {
                    navigate("/");
                }}
            >
                Back
            </span>
        </div>
    );
}

// 菜单列表选择项
function MenuFunc(props) {
    const { func, svg, to } = props;
    return (
        <Link
            className="flex flex-row justify-between items-center h-6 truncate cursor-pointer mx-1 sm:my-1 text-sm sm:text-base hover:text-indigo-400 duration-300"
            to={to}
        >
            <div className="flex flex-row items-center mr-2 lg:mr-4">
                {/* svg 图 */}
                <span className="mr-1 lg:mr-2">
                    {svg === undefined || svg === "" ? "图" : svg}
                </span>
                {/* func 功能 */}
                <span>{func}</span>
            </div>
            {/* 箭头 */}
            <div>{">"}</div>
        </Link>
    );
}

// 菜单
function Menu(props) {
    const funcList = [
        // { func: "网站数据", svg: <WebData />, to: "webdata" },
        { func: "帖子管理", svg: <PostControl />, to: "post" },
        { func: "用户管理", svg: <UserControl />, to: "user" },
        // { func: "网站管理", svg: <WebControl />, to: "web" },
    ];

    return (
        <ScrollBarBeauty className="flex flex-row justify-evenly sm:flex-col sm:justify-start overflow-auto bg-white rounded shrink-0">
            {funcList.map((item) => (
                <MenuFunc
                    func={item.func}
                    svg={item.svg}
                    to={item.to}
                    key={item.func}
                />
            ))}
        </ScrollBarBeauty>
    );
}

export default function Admin() {
    const { showAlert } = useContext(MyContext);
    const navigate = useNavigate();
    // 独立权限管理
    const [adminEmail, setAdminEmail] = useState("");
    const [auth, setAuth] = useState(999);

    function rejectVisit() {
        navigate("/");
        showAlert(2000, "拒绝访问");
    }

    async function fetchUserAuth() {
        try {
            const res = await http.post(GETUSER);
            if (res.status === 200) {
                const { email, auth } = res.data.data;
                setAdminEmail(email);
                setAuth(auth);
            } else {
                rejectVisit();
            }
        } catch {
            rejectVisit();
        }
        // const res = await http.post(GETUSER);
        // if (res.status === 200) {
        //     const { email, auth } = res.data.data;
        //     setAdminEmail(email);
        //     setAuth(auth);
        // } else {
        //     rejectVisit();
        // }
    }

    useEffect(() => {
        (async () => {
            await fetchUserAuth();
            if (auth < 5) {
                rejectVisit();
            }
        })();
    }, [auth, adminEmail]);

    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-gray-200 select-none">
            {/* 导航 */}
            <Navi />
            {/* Menu and Outlet */}
            <FreezeScroll className="flex flex-col sm:flex-row p-2">
                <Menu />
                <div className="flex grow mt-2 sm:mt-0 sm:ml-3 bg-white rounded">
                    <FreezeScroll className="flex w-full h-full">
                        <ScrollBarBeauty className="overflow-auto w-full p-1">
                            <Outlet />
                        </ScrollBarBeauty>
                    </FreezeScroll>
                </div>
            </FreezeScroll>
        </div>
    );
}
