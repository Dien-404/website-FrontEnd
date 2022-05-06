import React, { useState } from "react";
import { Link } from "react-router-dom";
import LottieController from "../components/LottieController";
import login from "../assets/login.json";
import regist from "../assets/regist.json";

export default function Welcome() {
    const [seleted, setSeleted] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Correct, setCorrect] = useState("");
    return (
        <div
            className="w-full min-h-screen flex justify-center items-center select-none"
            style={{
                background:
                    "linear-gradient(174deg,#8bdeda,#43add0,#998ee0,#e17dc2,#ef9393)",
            }}
        >
            {/* 宽高限制层 */}
            <div className="w-11/12 max-w-xs sm:w-auto sm:max-w-none h-96 bg-white/20 backdrop-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                {/* translate层 */}
                <div
                    className={`md:relative h-full flex flex-col md:flex-row ${
                        seleted === true
                            ? ""
                            : "-translate-y-full md:-translate-y-0"
                    }`}
                >
                    {/* 遮罩层 */}
                    <div
                        className={`hidden md:flex absolute z-50 sm:w-80 h-full bg-white/5 duration-500 justify-center items-center ${
                            seleted === true ? "md:translate-x-full" : ""
                        }`}
                    >
                        <LottieController
                            animationData={seleted === true ? login : regist}
                        />
                    </div>
                    {/* 登录 */}
                    <div
                        className={`sm:w-80 h-full shrink-0 flex flex-col items-center justify-between duration-500 transform-gpu ${
                            seleted === true ? "" : "blur-3xl"
                        }`}
                    >
                        {/* 返主页 */}
                        <Link
                            className="text-xl font-bold font-serif my-5 px-2 cursor-pointer"
                            to="/"
                        >
                            Dien's webstite
                        </Link>
                        {/* 表单 */}
                        <div className="grow flex flex-col items-center justify-between py-5 text-white">
                            {/* title */}
                            <div className="text-2xl tracking-wider font-bold">
                                Login
                            </div>
                            <div className="grow flex flex-col justify-center items-center">
                                {/* 邮箱地址 */}
                                <div className="my-2">
                                    <input
                                        className="w-full p-1 px-2 outline-none bg-transparent border-b border-white placeholder:text-white placeholder:text-sm placeholder:focus:text-xs placeholder:duration-500 valid:border-green-500 invalid:border-red-500"
                                        required="required"
                                        placeholder="邮箱"
                                        pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$"
                                        type="text"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* 密码 */}
                                <div className="my-2">
                                    <input
                                        className="w-full p-1 px-2 outline-none bg-transparent border-b border-white placeholder:text-white placeholder:text-sm placeholder:focus:text-xs placeholder:duration-500"
                                        placeholder="密码"
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* 忘记密码 */}
                                <div className="my-2 cursor-pointer text-xs">
                                    忘记密码?
                                </div>
                            </div>

                            {/* 提交 */}
                            <div className="my-2">
                                <div className="py-0.5 px-3 rounded cursor-pointer ring-emerald-200 ring-1 hover:ring-2 duration-300">
                                    提交
                                </div>
                            </div>
                        </div>
                        {/* 转注册 */}
                        <div className="w-full m-1 flex justify-end text-xs">
                            尚未有账号？去
                            <div
                                className="w-auto px-2 cursor-pointer"
                                onClick={() => {
                                    setSeleted(false);
                                }}
                            >
                                注册
                            </div>
                        </div>
                    </div>
                    {/* 注册 */}
                    <div
                        className={`sm:w-80 h-full shrink-0 flex flex-col items-center justify-between duration-500 transform-gpu ${
                            seleted === true ? "blur-3xl" : ""
                        }`}
                    >
                        {/* 返主页 */}
                        <Link
                            className="text-xl font-bold font-serif my-5 px-2 cursor-pointer"
                            to="/"
                        >
                            Dien's webstite
                        </Link>
                        {/* 表单 */}
                        <div className="grow flex flex-col items-center justify-between py-5 text-white">
                            {/* title */}
                            <div className="text-2xl tracking-wider font-bold">
                                Regist
                            </div>
                            <div className="grow flex flex-col justify-center items-center">
                                {/* 邮箱 */}
                                <div className="my-2">
                                    <input
                                        className="w-full p-1 px-2 outline-none bg-transparent border-b border-white placeholder:text-white placeholder:text-sm placeholder:focus:text-xs placeholder:duration-500 valid:border-green-500 invalid:border-red-500"
                                        required="required"
                                        placeholder="邮箱"
                                        pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$"
                                        type="text"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* 密码 */}
                                <div className="my-2">
                                    <input
                                        className="w-full p-1 px-2 outline-none bg-transparent border-b border-white placeholder:text-white placeholder:text-sm placeholder:focus:text-xs placeholder:duration-500"
                                        placeholder="密码"
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                {/* 确认密码 */}
                                <div className="my-2">
                                    <input
                                        className="w-full p-1 px-2 outline-none bg-transparent border-b border-white placeholder:text-white placeholder:text-sm placeholder:focus:text-xs placeholder:duration-500"
                                        placeholder="确认密码"
                                        type="password"
                                        value={Correct}
                                        onChange={(e) => {
                                            setCorrect(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* 提交 */}
                            <div className="my-2">
                                <div className="py-0.5 px-3 rounded cursor-pointer ring-emerald-200 ring-1 hover:ring-2 duration-300">
                                    提交
                                </div>
                            </div>
                        </div>
                        {/* 转登录 */}
                        <div className="w-full m-1 flex justify-end text-xs">
                            已有账号？去
                            <div
                                className="w-auto px-2 cursor-pointer"
                                onClick={() => {
                                    setSeleted(true);
                                }}
                            >
                                登录
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
