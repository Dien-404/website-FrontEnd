import React, { useState } from "react";
import regist from "../assets/regist.png";
import login from "../assets/login.png";

// 输入组件
function MyInput(props) {
    const { value, setValue, placeholder, pattern, maxLength, type } = props;
    return (
        <input
            className="w-full p-1 px-2 outline-none bg-transparent border-b border-white text-base placeholder:text-white placeholder:text-sm placeholder:focus:text-xs placeholder:duration-500 valid:border-green-500 invalid:border-red-500"
            required="required"
            placeholder={placeholder}
            pattern={pattern}
            type={type}
            maxLength={maxLength}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
}

export default function Welcome() {
    const [loginSeleted, setLoginSeleted] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [correctPassword, setCorrectPassword] = useState("");
    const [code, setCode] = useState("");

    // 处理登录注册切换
    function changeAndClear() {
        setEmail("");
        setPassword("");
        setCorrectPassword("");
        setCode("");
        setLoginSeleted((pre) => !pre);
    }

    // 处理提交
    function handleSubmmit() {
        if (loginSeleted) {
            const login = {
                email,
                password,
            };
            alert("此处应发送请求" + JSON.stringify(login));
        } else {
            const regist = {
                email,
                password,
                correctPassword,
                code,
            };
            alert("此处应发送请求" + JSON.stringify(regist));
        }
    }

    // 邮件
    const emailInput = (
        <div className="my-2">
            <MyInput
                placeholder="邮箱"
                pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$"
                type="text"
                value={email}
                setValue={setEmail}
            />
        </div>
    );

    // 密码
    const passwordInput = (
        <div className="my-2">
            <MyInput
                placeholder="密码"
                type="password"
                value={password}
                setValue={setPassword}
            />
        </div>
    );

    // 确认密码
    const correctPasswordInput = (
        <div className="my-2">
            <MyInput
                placeholder="确认密码"
                type="password"
                value={correctPassword}
                setValue={setCorrectPassword}
            />
        </div>
    );

    // 验证码
    const codeInput = (
        <div className="my-2 relative">
            <MyInput
                placeholder="验证码"
                type="text"
                pattern="\d{6}"
                maxLength={6}
                value={code}
                setValue={setCode}
            />
            <div
                className=" absolute top-1/4 right-0 px-1 text-sm cursor-pointer"
                onClick={() => {
                    console.log("sending code");
                }}
            >
                发送
            </div>
        </div>
    );

    // 提交
    const submmit = (
        <div className="my-2">
            <div
                className="py-0.5 px-3 rounded cursor-pointer ring-emerald-200 ring-1 hover:ring-2 duration-300"
                onClick={() => {
                    handleSubmmit();
                }}
            >
                提交
            </div>
        </div>
    );

    return (
        <div
            className="w-full min-h-screen flex justify-center items-center select-none"
            style={{
                background:
                    "linear-gradient(174deg,#8bdeda,#43add0,#998ee0,#e17dc2,#ef9393)",
            }}
        >
            {/* 宽高限制层 */}
            <div
                className="w-11/12 max-w-xs sm:w-auto sm:max-w-none bg-white/20 backdrop-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                style={{ height: "25rem" }}
            >
                {/* translate层 */}
                <div
                    className={`md:relative h-full flex flex-col md:flex-row ${
                        loginSeleted === true
                            ? ""
                            : "-translate-y-full md:-translate-y-0"
                    }`}
                >
                    {/* 遮罩层 */}
                    <div
                        className={`hidden md:block absolute z-50 sm:w-80 h-full bg-white/5 duration-500 overflow-hidden ${
                            loginSeleted === true ? "md:translate-x-full" : ""
                        }`}
                    >
                        {/* login */}
                        <img
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-300 ${
                                loginSeleted === true
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            src={login}
                            alt="login"
                        />
                        {/* regist */}
                        <img
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-500 ${
                                loginSeleted === true
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                            src={regist}
                            alt="regist"
                        />
                    </div>

                    {/* 登录 */}
                    <div
                        className={`sm:w-80 h-full shrink-0 flex flex-col items-center justify-between duration-500 transform-gpu ${
                            loginSeleted === true ? "" : "blur-3xl"
                        }`}
                    >
                        {/* 返主页 */}
                        <div className="text-xl font-bold font-serif my-5 px-2">
                            Dien's webstite
                        </div>
                        {/* 表单 */}
                        <div className="grow flex flex-col items-center justify-between text-white">
                            {/* title */}
                            <div className="text-2xl tracking-wider font-bold pt-5">
                                Login
                            </div>
                            <div className="grow flex flex-col justify-center items-center">
                                {/* 邮箱地址 */}
                                {emailInput}
                                {/* 密码 */}
                                {passwordInput}
                                {/* 忘记密码 */}
                                <div className="my-2 cursor-pointer text-xs">
                                    忘记密码?
                                </div>
                            </div>
                            {/* 提交 */}
                            {submmit}
                        </div>
                        {/* 转注册 */}
                        <div className="w-full m-1 flex justify-end text-xs">
                            尚未有账号？去
                            <div
                                className="w-auto px-2 cursor-pointer"
                                onClick={() => {
                                    changeAndClear();
                                }}
                            >
                                注册
                            </div>
                        </div>
                    </div>

                    {/* 注册 */}
                    <div
                        className={`sm:w-80 h-full shrink-0 flex flex-col items-center justify-between duration-500 transform-gpu ${
                            loginSeleted === true ? "blur-3xl" : ""
                        }`}
                    >
                        {/* 返主页 */}
                        <div className="text-xl font-bold font-serif my-5 px-2">
                            Dien's webstite
                        </div>
                        {/* 表单 */}
                        <div className="grow flex flex-col items-center justify-between text-white">
                            {/* title */}
                            <div className="text-2xl tracking-wider font-bold pt-5">
                                Regist
                            </div>
                            <div className="grow flex flex-col justify-center items-center">
                                {/* 邮箱地址 */}
                                {emailInput}
                                {/* 密码 */}
                                {passwordInput}
                                {/* 确认密码 */}
                                {correctPasswordInput}
                                {/* 验证码 */}
                                {codeInput}
                            </div>
                            {/* 提交 */}
                            {submmit}
                        </div>
                        {/* 转登录 */}
                        <div className="w-full m-1 flex justify-end text-xs">
                            已有账号？去
                            <div
                                className="w-auto px-2 cursor-pointer"
                                onClick={() => {
                                    changeAndClear();
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
