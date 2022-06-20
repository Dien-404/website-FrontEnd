import React, { useState } from "react";
import PageModule from "../components/PageModule";

export default function Cate(props) {
    const [category, setCategory] = useState([
        { cateName: "前端", cateBlock: ["Basic", "React", "Debug"] },
        { cateName: "后端", cateBlock: ["Basic", "Nodejs", "Debug"] },
    ]);
    return (
        <PageModule page="Cate">
            <>
                <div className="flex flex-col h-full">
                    {category.map((item) => (
                        <div className="w-full h-screen">
                            {/* title */}
                            <div className="sticky top-0 sm:top-14">
                                <span className="cursor-pointer px-2 py-1">
                                    {item.cateName}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        </PageModule>
    );
}
