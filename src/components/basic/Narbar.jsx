import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { MyContext } from "../../routers/index";
import ScrollBarBeauty from "./ScrollBarBeauty";
import { MenuOn, MenuOff, Notice, Account } from "../../assets/SVG";

// 网页端NavLink
function WebNavLink(props) {
    return (
        <Link className="p-2 hover:text-white" to={props.to}>
            {props.content}
        </Link>
    );
}

// 网页端NarBar
function WebNavBar(props) {
    const { email } = props;
    return (
        <div className="hidden sm:flex h-14 flex-row justify-between items-center px-3">
            {/* LOGO */}
            <div className="w-28 text-white cursor-default">
                <WebNavLink to="/" content="Dien" />
            </div>
            {/* 导航 */}
            <div className="w-auto">
                <WebNavLink to="/" content="首页" />
                <WebNavLink to="/cate" content="分类" />
                <WebNavLink to="/about" content="关于" />
                <WebNavLink to="/feedback" content="反馈" />
            </div>
            {/* 用户 */}
            <div className="w-28 flex justify-end">
                <WebNavLink
                    to={email !== undefined ? "/user" : "/welcome"}
                    content={email !== undefined ? email : "账号"}
                />
            </div>
        </div>
    );
}

// 移动端NavLink
function MobileNavLink(props) {
    return (
        <div className="flex items-center w-full h-14 p-1 border-white border-b">
            <Link
                className="w-full h-full flex items-center justify-between"
                to={props.to}
                onClick={() => {
                    props.setIsMenuOn(false);
                }}
            >
                <span>{props.content}</span>
                <span>&gt;</span>
            </Link>
        </div>
    );
}

// 移动端NavBar
function MobileNavBar(props) {
    const { email } = props;
    const [isMenuOn, setIsMenuOn] = useState(false);
    return (
        <div
            className={`flex flex-col sm:hidden duration-500 ${
                isMenuOn === false ? "h-11" : "h-screen"
            }`}
        >
            {/* 导航栏 */}
            <div className="w-full h-11 shrink-0 flex flex-row justify-between items-center px-2">
                {/* 菜单 */}
                <div className="w-20 h-8 overflow-hidden">
                    <div
                        className={`w-8 h-8 flex flex-col duration-700 ${
                            isMenuOn === false ? "-translate-y-8" : ""
                        }`}
                        onClick={() => {
                            setIsMenuOn(!isMenuOn);
                        }}
                    >
                        <div className="p-1">
                            <MenuOn />
                        </div>
                        <div className="p-1">
                            <MenuOff />
                        </div>
                    </div>
                </div>
                {/* LOGO */}
                <div className="text-white truncate">
                    <Link
                        to="/"
                        onClick={() => {
                            setIsMenuOn(false);
                        }}
                    >
                        Dien's website
                    </Link>
                </div>
                {/* 用户 */}
                <div className="w-20 flex flex-row justify-end">
                    {/* 通知 */}
                    {/* <Link
                        className="mx-1 p-1"
                        to={email !== undefined ? "/user/notice" : "/welcome"}
                        onClick={() => {
                            setIsMenuOn(false);
                        }}
                    >
                        <Notice />
                    </Link> */}
                    {/* 账户 */}
                    <Link
                        className="mx-1 p-1"
                        to={email !== undefined ? "/user" : "/welcome"}
                        onClick={() => {
                            setIsMenuOn(false);
                        }}
                    >
                        <Account />
                    </Link>
                </div>
            </div>
            {/* 菜单栏 */}
            <ScrollBarBeauty className={`overflow-y-scroll px-2`}>
                <MobileNavLink
                    to="/"
                    content="首页"
                    setIsMenuOn={setIsMenuOn}
                />
                <MobileNavLink
                    to="/cate"
                    content="分类"
                    setIsMenuOn={setIsMenuOn}
                />
                <MobileNavLink
                    to="/about"
                    content="关于"
                    setIsMenuOn={setIsMenuOn}
                />
                <MobileNavLink
                    to="/feedback"
                    content="反馈"
                    setIsMenuOn={setIsMenuOn}
                />
            </ScrollBarBeauty>
        </div>
    );
}

export default function Narbar() {
    const { loginUser } = useContext(MyContext);
    const { email } = loginUser;
    return (
        <div className="w-full shrink-0 fixed z-30 bg-black text-gray-300 font-bold select-none duration-300">
            {/* web端 */}
            <WebNavBar email={email} />
            {/* 移动端 */}
            <MobileNavBar email={email} />
        </div>
    );
}
