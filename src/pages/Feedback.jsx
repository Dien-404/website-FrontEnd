import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { MyContext } from "../routers/index";

import { http, FEEDBACK } from "../utils/request";
import { FeedbackL, FeedbackR } from "../assets/SVG";

const Scrollbar = styled.textarea`
    ::-webkit-scrollbar {
        display: none;
    }
`;
export default function Feedback() {
    const { loginUser, showAlert } = useContext(MyContext);
    const [contact, setContact] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setContact(loginUser.email ?? contact);
    }, [loginUser]);

    async function handleSubmit() {
        if (
            contact.match(
                /(^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$)|(^1[3456789]\d{9}$)/
            ) === null
        ) {
            showAlert(2000, "请输入正确的邮件格式或手机号码");
        } else if (content === "") {
            showAlert(2000, "反馈内容不可为空哦");
        } else {
            const res = await http.post(FEEDBACK, {
                action: "feedback",
                contact,
                text: content,
            });
            if (res.status === 200) {
                showAlert(2000, "邮件发送成功");
            } else {
                showAlert(2000, "邮件发送失败");
            }
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center md:flex-row md:justify-evenly p-2">
            <div className="hidden md:flex justify-center items-center grow max-w-xs lg:max-w-sm h-full">
                {/* 左侧插画 */}
                <FeedbackL />
            </div>
            {/* Show*/}
            <div className="flex flex-col justify-center items-center bg-white/60 w-full sm:w-auto md:max-w-md lg:max-w-lg sm:p-5 md:shadow-xl md:rounded-md duration-500">
                {/* title */}
                <div className="flex justify-center text-xl font-bold tracking-wide select-none mb-5 sm:mb-10">
                    纳谏如流
                </div>
                {/* Main */}
                <div className="w-full sm:w-auto flex flex-col justify-center items-center">
                    {/* Email地址 */}
                    <div className="flex flex-col w-5/6 sm:w-auto md:flex-row md:my-1">
                        <div className="w-20 select-none">发送至：</div>
                        <div className="sm:w-96 md:w-80 lg:w-96">
                            <input
                                className="outline-none border border-black rounded-sm w-full px-1 cursor-default bg-gray-200"
                                type="text"
                                readOnly="readonly"
                                value="dien404@163.com"
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col w-5/6 sm:w-auto md:flex-row md:my-1">
                        <div className="w-20 select-none">联系方式：</div>
                        <div className="sm:w-96 md:w-80 lg:w-96">
                            <input
                                className="outline-none border border-black rounded-sm w-full px-1"
                                type="text"
                                value={contact}
                                placeholder="仅支持邮箱或手机号码"
                                onChange={(e) => {
                                    setContact(e.target.value);
                                }}
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col w-5/6 sm:w-auto md:flex-row md:my-1">
                        <div className="w-20 select-none">反馈信息：</div>
                        <div className="sm:w-96 md:w-80 lg:w-96">
                            <Scrollbar
                                className="outline-none border border-black rounded-sm w-full px-1 resize-none"
                                rows="8"
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    {/* Submit */}
                    <div className="">
                        <div
                            className="px-1 ring-1 ring-blue-300 hover:bg-blue-300 duration-300 select-none cursor-pointer rounded"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            提交
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center grow max-w-xs lg:max-w-sm h-full">
                {/* 右侧插画 */}
                <FeedbackR />
            </div>
        </div>
    );
}
