import React, { useState } from "react";
import { Link } from "react-router-dom";

import ScrollBarBeauty from "./ScrollBarBeauty";

// 网页端NavLink
function WebNavLink(props) {
    return (
        <Link className="p-2 hover:text-white" to={props.to}>
            {props.content}
        </Link>
    );
}

// 网页端NarBar
function WebNavBar() {
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
                <WebNavLink to="/welcome" content="账号" />
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
function MobileNavBar() {
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
                            <svg
                                t="1644504873338"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="3304"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M242.858667 183.04L512 452.266667l269.141333-269.141334a42.325333 42.325333 0 0 1 59.733334 59.818667L571.904 512l269.141333 269.141333a42.325333 42.325333 0 0 1-59.818666 59.733334L512 571.904 242.858667 840.96a42.325333 42.325333 0 0 1-59.733334-59.818667L452.096 512 183.04 242.858667a42.325333 42.325333 0 0 1 59.818667-59.733334z"
                                    p-id="3305"
                                    data-spm-anchor-id="a313x.7781069.0.i8"
                                    className="selected"
                                    fill="#ffffff"
                                ></path>
                            </svg>
                        </div>
                        <div className="p-1">
                            <svg
                                t="1644497438888"
                                className="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="2061"
                                width="24"
                                height="24"
                            >
                                <path
                                    d="M79.954 686.724h864.092v85.945h-864.092zM79.954 469.027h864.092v85.945h-864.092zM79.954 251.331h864.092v85.943h-864.092z"
                                    fill="#ffffff"
                                    p-id="2062"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
                {/* LOGO */}
                <div className="text-white">
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
                    <Link
                        className="mx-1 p-1"
                        to="/welcome"
                        onClick={() => {
                            setIsMenuOn(false);
                        }}
                    >
                        <svg
                            t="1644498563724"
                            className="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="15970"
                            width="24"
                            height="24"
                        >
                            <path
                                d="M672.956416 871.064576l176.67584 0c48.72704 0 88.231936-39.5008 88.231936-88.231936 0-17.8944-5.327872-34.540544-14.478336-48.44544l-20.570112-35.204096c-32.789504-47.8208-80.41984-134.765568-85.219328-271.644672-6.877184-195.913728-89.36448-295.589888-202.789888-312.774656l-0.789504-2.02752c0-51.443712-41.704448-93.142016-93.147136-93.142016l-12.250112 0c-51.443712 0-93.147136 41.699328-93.147136 93.142016l-0.789504 2.02752c-113.421312 17.184768-195.908608 116.861952-202.784768 312.774656-4.804608 136.879104-52.429824 223.822848-85.224448 271.644672l-20.564992 35.204096c-9.155584 13.904896-14.483456 30.55104-14.483456 48.44544 0 48.73216 39.50592 88.231936 88.237056 88.231936l178.67776 0c51.091456 0 67.400704 47.473664 67.400704 47.473664 17.57184 35.15904 53.89312 59.305984 95.879168 59.305984 23.3472 0 44.9536-7.465984 62.55616-20.143104 14.749696-10.625024 26.677248-24.911872 34.464768-41.5232C618.841088 916.179968 628.942848 871.975936 672.956416 871.064576z"
                                p-id="15971"
                                data-spm-anchor-id="a313x.7781069.0.i8"
                                className="selected"
                                fill="#ffffff"
                            ></path>
                        </svg>
                    </Link>
                    {/* 账户 */}
                    <Link
                        className="mx-1 p-1"
                        to="/welcome"
                        onClick={() => {
                            setIsMenuOn(false);
                        }}
                    >
                        <svg
                            t="1644498263382"
                            className="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="11372"
                            width="24"
                            height="24"
                        >
                            <path
                                d="M626.568192 981.999616l-23.379968 0-36.857856 0.283648L68.137984 982.283264l0-23.989248c0 0-10.815488-134.006784 186.535936-168.308736 0 0 150.230016-20.28032 160.748544-61.595648 0 0 5.732352-4.596736 1.502208-52.578304-9.017344-102.161408-75.86816-150.234112-102.909952-189.293568-27.041792-39.063552-29.293568-84.13184-29.293568-84.13184 0-11.264 4.716544-15.391744 12.560384-22.626304 9.696256-8.950784 6.786048-18.4576 4.934656-28.52864-7.04512-38.23616-7.666688-99.662848-0.970752-138.138624 1.502208-45.820928 43.56608-82.625536 43.56608-82.625536 7.892992-6.695936 15.803392-14.062592 21.343232-22.898688 1.547264-2.460672 2.970624-5.09952 3.8144-7.897088 3.16928-10.548224-7.560192-18.292736-5.407744-29.51168 1.942528-10.116096 19.280896-10.61376 29.766656-11.164672 23.614464-1.243136 47.347712-2.172928 70.925312-0.366592C641.71008 72.155136 699.725824 137.1136 699.725824 137.1136c13.73696 16.449536 22.787072 36.566016 28.23168 57.184256 1.630208 6.16448 3.028992 12.45696 3.785728 18.79552 5.501952 31.602688 5.481472 64.559104 3.770368 96.494592-0.815104 15.22688-2.584576 30.215168-4.819968 45.282304-1.17248 7.8848-0.571392 15.222784 4.70016 21.523456 4.4032 5.271552 9.44128 8.95488 11.60192 15.881216 1.011712 3.238912 1.275904 6.736896 1.275904 10.112 0 0-2.255872 45.068288-29.297664 84.13184-27.041792 39.059456-93.893632 87.13216-102.905856 189.293568-4.23424 47.981568 1.502208 52.578304 1.502208 52.578304 10.514432 41.314304 160.748544 61.595648 160.748544 61.595648 199.55712 37.010432 186.53184 168.308736 186.53184 168.308736l0 23.989248-131.3792 0 20.70016-0.283648L836.49536 982.00064l-36.64384 0L626.568192 982.00064 626.568192 981.999616z"
                                p-id="11373"
                                data-spm-anchor-id="a313x.7781069.0.i2"
                                className="selected"
                                fill="#ffffff"
                            ></path>
                        </svg>
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
    return (
        <div className="w-full shrink-0 fixed z-30 bg-black text-gray-300 font-bold select-none duration-300">
            {/* web端 */}
            <WebNavBar />
            {/* 移动端 */}
            <MobileNavBar />
        </div>
    );
}
