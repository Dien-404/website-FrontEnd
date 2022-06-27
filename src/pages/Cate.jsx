import React, { useState, useEffect } from "react";
import PageModule from "../components/PageModule";
import CateBlock from "../components/CateBlock";

export default function Cate(props) {
    // 响应式帖子坐标
    const [position, setPosition] = useState({
        Front: undefined,
        Back: undefined,
    });
    const [cateCount, setCateCount] = useState(undefined);
    useEffect(() => {
        setCateCount([
            { kind: "前端", cateId: 1, cate: "React", count: 4 },
            { kind: "前端", cateId: 2, cate: "JavaScript", count: 4 },
            { kind: "后端", cateId: 3, cate: "Mysql", count: 0 },
        ]);
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
                            className="sticky top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-24 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 select-none sm:cursor-pointer"
                            id="Front"
                            onClick={() => {
                                scrollToTag("Front");
                            }}
                        >
                            前端 Front-end
                        </div>
                        {/* content */}
                        <div className="sm:py-1 sm:top-14 sm:px-24 lg:px-32 xl:px-40 h-auto duration-500">
                            {cateCount?.map(
                                (item) =>
                                    item.kind === "前端" && (
                                        <CateBlock
                                            cateId={item.cateId}
                                            cate={item.cate}
                                            count={item.count}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                    {/* 后端内容展示 */}
                    <div className="py-2 sm:py-4">
                        {/* title */}
                        <div
                            className="sticky top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-24 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 select-none sm:cursor-pointer"
                            id="Back"
                            onClick={() => {
                                scrollToTag("Back");
                            }}
                        >
                            后端 Back-end
                        </div>
                        {/* content */}
                        <div className="sm:py-1 sm:top-14 sm:px-24 lg:px-32 xl:px-40 h-auto duration-500">
                            {cateCount?.map(
                                (item) =>
                                    item.kind === "后端" && (
                                        <CateBlock
                                            cateId={item.cateId}
                                            cate={item.cate}
                                            count={item.count}
                                        />
                                    )
                            )}
                        </div>
                    </div>
                </div>
            </>
        </PageModule>
    );
}
