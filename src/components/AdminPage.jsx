import React, { useState, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollBarBeauty from "./ScrollBarBeauty";

export default function Admin(props) {
    const navigate = useNavigate();
    // 功能模块 && 方便管理功能项
    const [func, setFunc] = useState([
        {
            logo: (
                <svg
                    className="shrink-0"
                    t="1656399026849"
                    viewBox="0 0 1026 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2348"
                    width="20"
                    height="20"
                >
                    <path
                        d="M995.84 144.05632H30.72a30.72 30.72 0 0 0-30.72 30.72v687.24736a30.72 30.72 0 0 0 30.72 30.72H995.84a30.72 30.72 0 0 0 30.72-30.72V174.77632a30.72 30.72 0 0 0-30.72-30.72z m-30.72 61.44V327.68H61.44V205.49632H965.12zM61.44 389.12H192v442.18368H61.44V389.12zM253.44 831.30368V389.12H965.12v442.18368H253.44z"
                        fill="#000000"
                        p-id="2349"
                    ></path>
                    <path
                        d="M858.53184 470.38464l-192.24576 158.6176-183.16288-53.42208L322.4576 691.9168a30.69952 30.69952 0 0 0-6.8608 42.88512A30.64832 30.64832 0 0 0 340.50048 747.52c6.2464 0 12.55424-1.90464 17.99168-5.8368l136.2944-98.70336 185.4976 54.09792 217.35424-179.3024a30.73024 30.73024 0 0 0-39.10656-47.39072z"
                        fill="#000000"
                        p-id="2350"
                    ></path>
                </svg>
            ),
            funcName: "网页总览",
            funcId: 1,
            tag: "website",
        },
        {
            logo: (
                <svg
                    className="shrink-0"
                    t="1656399936361"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5257"
                    width="20"
                    height="20"
                >
                    <path
                        d="M511.913993 941.605241c-255.612968 0-385.311608-57.452713-385.311608-170.810012 0-80.846632 133.654964-133.998992 266.621871-151.88846L393.224257 602.049387c-79.986561-55.904586-118.86175-153.436587-118.86175-297.240383 0-139.33143 87.211154-222.586259 233.423148-222.586259l7.912649 0c146.211994 0 233.423148 83.254829 233.423148 222.586259 0 54.184445 0 214.67361-117.829666 297.412397l-0.344028 16.685369c132.966907 18.061482 266.105829 71.041828 266.105829 151.716445C897.225601 884.152528 767.526961 941.605241 511.913993 941.605241zM507.957668 141.567613c-79.470519 0-174.250294 28.382328-174.250294 163.241391 0 129.698639 34.230808 213.469511 104.584579 255.784982 8.944734 5.332437 14.277171 14.965228 14.277171 25.286074l0 59.344868c0 15.309256-11.524945 28.0383-26.662187 29.414413-144.319839 14.449185-239.959684 67.429531-239.959684 95.983874 0 92.199563 177.346548 111.637158 325.966739 111.637158 148.792206 0 325.966739-19.26558 325.966739-111.637158 0-28.726356-95.639845-81.534688-239.959684-95.983874-15.48127-1.548127-27.006215-14.621199-26.662187-30.102469l1.376113-59.344868c0.172014-10.148833 5.676466-19.437594 14.277171-24.770032 70.525785-42.487485 103.208466-123.678145 103.208466-255.784982 0-135.031077-94.779775-163.241391-174.250294-163.241391L507.957668 141.567613 507.957668 141.567613z"
                        p-id="5258"
                        fill="#000000"
                    ></path>
                </svg>
            ),
            funcName: "用户管理",
            funcId: 2,
            tag: "user",
        },
        {
            logo: (
                <svg
                    className="shrink-0"
                    t="1656399867189"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4208"
                    width="20"
                    height="20"
                >
                    <path
                        d="M51.8 896.1c0 22.6 18.3 41 41 41h738.3c22.6 0 41-18.3 41-41 0-22.6-18.3-41-41-41H92.8c-22.7 0-41 18.4-41 41zM51.8 155.2c0 22.6 18.3 41 41 41h668.1c22.6 0 41-18.3 41-41 0-22.6-18.3-41-41-41H92.8c-22.7 0-41 18.4-41 41zM388.9 737.2c19.5 19.5 51.2 19.5 70.7 0l509.3-509.3c19.5-19.5 19.5-51.2 0-70.7s-51.2-19.5-70.7 0L388.9 666.4c-19.6 19.6-19.6 51.2 0 70.8z"
                        fill="#000000"
                        p-id="4209"
                    ></path>
                    <path
                        d="M832.4 935.7c22.6 0 41-18.3 41-41V531c0-22.6-18.3-41-41-41-22.6 0-41 18.3-41 41v363.8c0 22.6 18.3 40.9 41 40.9zM91.5 935.7c22.6 0 41-18.3 41-41V156.5c0-22.6-18.3-41-41-41-22.6 0-41 18.3-41 41v738.3c0 22.6 18.3 40.9 41 40.9z"
                        fill="#000000"
                        p-id="4210"
                    ></path>
                </svg>
            ),
            funcName: "帖子管理",
            funcId: 3,
            tag: "post",
        },
        {
            logo: (
                <svg
                    className="shrink-0"
                    t="1656399960179"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6271"
                    width="20"
                    height="20"
                >
                    <path
                        d="M908.6 189.3H114.3c-48.3 0-49.4 24.9-49.4 84v510.5c0 28.1 22.6 50.9 50.5 50.9h792.2c27.9 0 50.5-22.8 50.5-50.9V273.4c0.2-28.2 11-84.1-49.5-84.1z"
                        fill="#000000"
                        p-id="6272"
                        data-spm-anchor-id="a313x.7781069.0.i18"
                    ></path>
                    <path
                        d="M370.2 308.7c-51 2.5-92.6 44.2-96 95.1-4.2 59.5 43.3 109.6 101.9 109.6 56.9 0 101.9-45.9 101.9-101.9 0.9-58.7-48.4-106.2-107.8-102.8M376.1 545.6c-67.9 0-203.8 34-203.8 101.9v51c0 9.3 7.6 17 17 17H563c9.3 0 17-7.6 17-17v-51.8c-0.1-67.1-135.9-101.1-203.9-101.1M851.7 376.6H579.9v34h271.8v-34M851.7 308.7H579.9v34h271.8v-34M851.7 444.6H715.8v33.9h135.9v-33.9"
                        fill="#ffffff"
                        p-id="6273"
                        data-spm-anchor-id="a313x.7781069.0.i19"
                    ></path>
                </svg>
            ),
            funcName: "信息管理",
            funcId: 4,
            tag: "consume",
        },
    ]);

    return (
        <div className="flex flex-col min-h-screen max-h-screen bg-gray-200 overflow-hidden select-none">
            {/* Admin Narbar */}
            <div className="flex flex-row justify-between items-center h-14 shrink-0 px-1 bg-black text-white overflow-hidden">
                {/* website logo */}
                {/* 点击刷新页面 */}
                <div
                    className="p-2 font-serif font-bold"
                    onClick={() => {
                        // 刷新页面操作
                        window.location.reload();
                    }}
                >
                    Dien's website Management System
                </div>
                {/* Account && check */}
                <div className="cursor-pointer p-2">账户</div>
            </div>
            {/* Menu && content Title && Outlet */}
            <div className="grow flex flex-col sm:flex-row sm:m-1 p-1 overflow-hidden">
                {/* Menu */}
                <ScrollBarBeauty
                    className="flex flex-col items-center w-full sm:w-36 sm:shrink-0 mb-1 sm:mb-0 bg-white rounded sm:overflow-auto"
                    style={{ minWidth: "6.25rem" }}
                >
                    {/* welcome */}
                    <div className="hidden sm:flex text-lg font-bold">
                        welcome
                    </div>
                    {/* menu funcid div */}
                    {/* 功能模块渲染 */}
                    <div className="flex flex-row sm:flex-col w-full">
                        {func?.map((item) => (
                            <div
                                className={`w-full flex flex-row justify-center sm:justify-between items-center font-mono p-1 sm:p-2 cursor-pointer
                    ${item.funcId === props.funcSelected && "text-indigo-400"}`}
                                key={item.funcName}
                                onClick={() => navigate(`../` + item.tag)}
                            >
                                <div className="flex flex-row text-sm">
                                    {/* 功能logo */}
                                    <div className="hidden sm:block">
                                        {item.logo}
                                    </div>
                                    {/* 功能名字 */}
                                    <div className="sm:mx-2">
                                        {item.funcName}
                                    </div>
                                </div>
                                <div className="hidden sm:block">&gt;</div>
                            </div>
                        ))}
                    </div>
                </ScrollBarBeauty>
                {/* 分离带 */}
                <div className="sm:w-4"></div>
                {/* show content 此处内禁止修改 */}
                <div className="flex flex-col grow bg-white rounded overflow-auto">
                    <div className="flex flex-col grow overflow-auto">
                        {/* Outlet */}
                        <div className="flex grow overflow-hidden">
                            <ScrollBarBeauty className="flex grow overflow-auto">
                                <Suspense fallback={<div>hello</div>}>
                                    {props.children}
                                    {/* {Outlet} */}
                                </Suspense>
                            </ScrollBarBeauty>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
