import React, { useState } from "react";
import PageModule from "../components/PageModule";

export default function Cate(props) {
    const scrollToTag = (tag) => {
        let element = document.getElementById(tag);
        if (element) {
            if (tag === "Front")
                element.scrollIntoView({ behavior: "smooth", block: "end" });
            else
                element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <PageModule page="Cate">
            <>
                <div className="bg-gray-100 py-1">
                    {/* 前端内容展示 */}
                    <div className="my-2 sm:my-4">
                        {/* title */}
                        <div
                            className="sticky top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-20 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 cursor-pointer"
                            id="Front"
                            onClick={() => {
                                scrollToTag("Front");
                            }}
                        >
                            前端 Front-end
                        </div>
                        <div className="h-96"></div>
                        <div className="h-96"></div>
                    </div>
                    {/* 后端内容展示 */}
                    <div className="my-2 sm:my-4">
                        {/* title */}
                        <div
                            className="sticky top-0 flex justify-center sm:justify-start sm:py-1 sm:top-14 sm:px-20 lg:px-32 xl:px-40 text-lg font-mono bg-white duration-300 cursor-pointer"
                            id="Back"
                            onClick={() => {
                                scrollToTag("Back");
                            }}
                        >
                            后端 Back-end
                        </div>
                        <div className="h-96"></div>
                        <div className="h-96"></div>
                    </div>
                </div>
            </>
        </PageModule>
    );
}

// <div className="w-full h-screen">
//                             {/* title */}
//                             <div className="sticky top-0 sm:top-14">
//                                 <span className="cursor-pointer px-2 py-1">
//                                     {item.cateName}
//                                 </span>
//                             </div>
//                         </div>
