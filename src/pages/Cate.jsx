import React from "react";
import CateBlock from "../components/postController/CateBlock";
import Content from "../components/basic/Content";

export default function Cate(props) {
    const cates = [
        {
            cate: "前端 Front-end",
            details: [
                {
                    subclass: "React",
                    count: 5,
                },
                {
                    subclass: "JavaScript",
                    count: 0,
                },
            ],
        },
        {
            cate: "后端 Back-end",
            details: [
                {
                    subclass: "docker",
                    count: 0,
                },
                {
                    subclass: "mongodb",
                    count: 0,
                },
            ],
        },
        {
            cate: "其他 Others",
            details: [
                {
                    subclass: "日常",
                    count: 0,
                },
                {
                    subclass: "未分类",
                    count: 0,
                },
            ],
        },
    ];

    return (
        <div className="bg-gray-100 flex flex-col items-center">
            {cates.map((cateItem) => (
                <div className="w-full flex flex-col items-center py-2 sm:py-4">
                    {/* title */}
                    <div className="sticky z-20 top-0 w-full flex justify-center items-center sm:py-1 sm:top-14 text-lg font-mono bg-white select-none duration-300">
                        <Content className=" flex justify-center sm:justify-start">
                            {cateItem.cate}
                        </Content>
                    </div>

                    <Content className="sm:py-1 sm:top-14 h-auto duration-500 flex-col items-center flex sm:block">
                        {cateItem.details.map((subclassItem) => (
                            <CateBlock
                                subclass={subclassItem.subclass}
                                count={subclassItem.count}
                            />
                        ))}
                    </Content>
                </div>
            ))}
        </div>
    );
}
