import React from "react";
import BasicPage from "../components/BasicPage";

export default function About(props) {
    return (
        <BasicPage page="About">
            <>
                <div className="h-full flex flex-col p-2 sm:p-5">
                    {/* title */}
                    <div>
                        <div className="text-xl font-bold tracking-wide border-b border-gray-400 select-none w-full sm:w-max">
                            关于本站
                        </div>
                    </div>
                    {/* content */}
                    <div className="h-full flex justify-center items-center flex-col md:flex-row">
                        <div className="flex flex-col justify-center items-center my-3 md:mx-5 lg:mx-10">
                            <div className="md:py-1">
                                这是迪恩的个人博客网站
                            </div>
                            <div className="md:py-1">
                                博客内容主要以前端开发为主
                            </div>
                            <div className="md:py-1">主要介绍设计想法</div>
                            <br className="hidden md:block" />
                            <div className="md:py-1">
                                博客内容仅为作者个人经验之谈
                            </div>
                            <div className="md:py-1">
                                本站最大限度给予访客互相交流的功能
                            </div>
                            <div className="md:py-1">
                                望各位程序员能在艰难困苦中负重前行
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center my-3 md:mx-5 lg:mx-10">
                            <div
                                className="w-28 h-28 bg-cover bg-center rounded-full"
                                style={{
                                    backgroundImage:
                                        "url(https://s2.loli.net/2022/02/16/1of8TQhdDu4yCME.jpg)",
                                }}
                            />
                            <br className="hidden md:block" />
                            <div className="md:py-1">Dien(匿名)</div>
                            <div className="md:py-1">00后 广东东莞</div>
                            <div className="md:py-1">非双一流院校 计算机系</div>
                            <div className="md:py-1">习惯性写bug代码</div>
                        </div>
                    </div>
                </div>
            </>
        </BasicPage>
    );
}
