import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import regist from "../assets/regist.png";
import login from "../assets/login.png";

import { MyContext } from "../routers/index";

import { http, SENDCODE, LOGIN, REGIST } from "../utils/request";

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
    const { setLoginUser, showAlert } = useContext(MyContext);
    const navigate = useNavigate();
    const [loginSeleted, setLoginSeleted] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [correctPassword, setCorrectPassword] = useState("");
    const [code, setCode] = useState("");
    const [isSend, setIsSend] = useState(0);

    // 处理验证码发送倒计时
    useEffect(() => {
        setTimeout(() => {
            if (isSend > 0) {
                setIsSend((pre) => pre - 1);
            }
        }, 1000);
    }, [isSend]);

    // 处理登录注册切换
    function changeAndClear() {
        setEmail("");
        setPassword("");
        setCorrectPassword("");
        setCode("");
        setLoginSeleted((pre) => !pre);
    }

    // 处理提交
    async function handleSubmmit() {
        if (loginSeleted) {
            // 登录
            const login = {
                email,
                pwd: password,
            };
            try {
                const res = await http.post(LOGIN, login);
                if (res.status === 200) {
                    setTimeout(() => {
                        navigate("/", { replace: true });
                    }, 1000);
                    showAlert(2000, "登录成功");
                    window.localStorage.setItem("token", res.data.token);
                    setLoginUser(res.data.data);
                }
            } catch (err) {
                showAlert(2000, "登录失败");
            }
        } else {
            // 注册
            const regist = {
                email,
                pwd: password,
                npwd: correctPassword,
                code,
            };
            try {
                const res = await http.post(REGIST, regist);
                if (res.status === 200) {
                    showAlert(2000, "注册成功");
                }
            } catch (err) {
                showAlert(2000, "注册失败");
            }
        }
    }

    // 验证码发送
    async function handleCode() {
        if (
            email.match(
                /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/
            ) === null
        ) {
            showAlert(2000, "邮箱格式不正确");
        } else {
            const res = await http.post(SENDCODE, { email });
            if (res.status === 200) {
                setIsSend(60);
                showAlert(2000, "验证码发送成功");
            } else if (res.status === 204) {
                setIsSend(60);
                showAlert(2000, "请稍后再试");
            } else {
                showAlert(2000, "验证码发送失败");
            }
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
                pattern=".{8,16}"
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
                pattern=".{8,16}"
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
                className={`absolute top-1/4 right-0 px-1 text-sm ${
                    isSend !== 0 ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() => {
                    if (isSend === 0) {
                        handleCode();
                    }
                }}
            >
                {isSend === 0 ? "发送验证码" : `请等候${isSend}秒`}
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
