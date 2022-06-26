import React, { useState, useEffect } from "react";
import PageModule from "../components/PageModule";

export default function Cate(props) {
    // 响应式帖子坐标
    const [position, setPosition] = useState({
        Front: undefined,
        Back: undefined,
    });
    useEffect(() => {
        let front = document.getElementById("Front");
        let back = document.getElementById("Back");
        setPosition({
            Front: front.offsetTop - front.offsetHeight * 2,
            Back: back.offsetTop - back.offsetHeight * 2,
        });
    }, []);
    // 帖子分类滚动函数
    const scrollToTag = (tag) => {
        let top = undefined;
        tag === "Front" ? (top = position.Front) : (top = position.Back);
        window.scrollTo({
            left: 0,
            top,
            behavior: "smooth",
        });
    };

    return (
        <PageModule page="Cate">
            <>
                <div className="bg-gray-100">
                    {/* 前端内容展示 */}
                    <div className="py-2 sm:py-4">
                        {/* title */}
                        <div
                            className="sticky top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-20 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 select-none sm:cursor-pointer"
                            id="Front"
                            onClick={() => {
                                scrollToTag("Front");
                            }}
                        >
                            前端 Front-end
                        </div>
                        <div className="h-96">
                            <div className="h-40">halo1</div>
                            <div className="h-40">halo2</div>
                        </div>
                    </div>
                    {/* 后端内容展示 */}
                    <div className="py-2 sm:py-4">
                        {/* title */}
                        <div
                            className="sticky top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-20 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 select-none sm:cursor-pointer"
                            id="Back"
                            onClick={() => {
                                scrollToTag("Back");
                            }}
                        >
                            后端 Back-end
                        </div>
                        <div className="h-96">
                            <div className="h-40">halo1</div>
                            <div className="h-40">halo2</div>
                        </div>
                    </div>
                </div>
            </>
        </PageModule>
    );
}
