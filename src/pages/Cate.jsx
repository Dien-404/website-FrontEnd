import React, { useEffect, useState } from "react";
import CateBlock from "../components/postController/CateBlock";
import Content from "../components/basic/Content";

import { http, GETCATES } from "../utils/request";

export default function Cate(props) {
    const [cates, setCates] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await http.post(GETCATES);
            console.log(res);
            if (res.status === 200) {
                setCates(res.data.data);
            } else {
                console.log("wrong");
            }
        })();
    }, []);

    return (
        <div className="bg-gray-100 flex flex-col items-center">
            {cates.map((cateItem) => (
                <div
                    key={cateItem.cate}
                    className="w-full flex flex-col items-center py-2 sm:py-4"
                >
                    {/* title */}
                    <div className="sticky z-20 top-0 w-full flex justify-center items-center sm:py-1 sm:top-14 text-lg font-mono bg-white select-none duration-300">
                        <Content className=" flex justify-center sm:justify-start">
                            {cateItem.cate}
                        </Content>
                    </div>

                    <Content className="sm:py-1 sm:top-14 h-auto duration-500 flex-col items-center flex sm:block">
                        {cateItem.details.map((subclassItem) => (
                            <CateBlock
                                key={subclassItem.subclass + subclassItem.count}
                                cate={cateItem.cate}
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
