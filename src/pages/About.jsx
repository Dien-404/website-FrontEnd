import React from "react";

function Line(props) {
    return <div className="md:py-1">{props.content}</div>;
}

const introduce = [
    "这是迪恩的个人博客网站",
    "博客内容主要以前端开发为主",
    "主要介绍设计想法",
    "博客内容仅为作者个人经验之谈",
    "本站最大限度给予访客互相交流的功能",
    "望各位程序员能在艰难困苦中负重前行",
];

const myIntroduce = [
    "Dien(匿名)",
    "00后 广东东莞",
    "汕头大学 计算机系",
    "习惯性写bug代码",
];

export default function About(props) {
    return (
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
                    {introduce.map((item) => (
                        <Line key={item} content={item} />
                    ))}
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
                    {myIntroduce.map((item) => (
                        <Line key={item} content={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
