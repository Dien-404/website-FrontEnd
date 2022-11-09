import React, { useState, useEffect } from "react";
import CateBlock from "../components/CateBlock";

export default function Cate(props) {
    const [cateCount, setCateCount] = useState(undefined);

    useEffect(() => {
        setCateCount([
            { kind: "前端", cateId: 1, cate: "React", count: 5 },
            { kind: "前端", cateId: 2, cate: "JavaScript", count: 4 },
            { kind: "后端", cateId: 3, cate: "Mysql", count: 0 },
        ]);
    }, []);

    return (
        <div className="bg-gray-100">
            {/* 前端内容展示 */}
            <div className="py-2 sm:py-4">
                {/* title */}
                <div className="sticky z-20 top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-24 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 select-none">
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
            <></>
            {/* 后端内容展示 */}
            <div className="py-2 sm:py-4">
                {/* title */}
                <div className="sticky z-20 top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-24 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 select-none">
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
    );
}
