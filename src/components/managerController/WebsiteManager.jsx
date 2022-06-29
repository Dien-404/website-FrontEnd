import React from "react";
import styled from "styled-components";

const ScrollBeauty = styled.div`
    ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.3125rem;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 0.3125rem;
        :hover {
            background-color: gray;
        }
    }
    ::-webkit-scrollbar-button {
        display: none;
    }
`;

export default function WebsiteManager(props) {
    return (
        <ScrollBeauty className={`flex flex-col w-full h-full overflow-auto`}>
            {/* 上层总览 */}
            <div
                className="h-1/2 flex flex-col sm:flex-row"
                style={{ minHeight: "18.75rem" }}
            >
                {/* 近期网页浏览量 */}
                <div className="ring-1 flex justify-center items-center basis-2/3">
                    近期网页浏览量
                </div>
                {/* 用户活跃度排行 */}
                <div className="ring-1 flex justify-center items-center basis-1/3">
                    用户活跃度排行
                </div>
            </div>
            {/* 下层总览 */}
            <div
                className="h-1/2 flex flex-col sm:flex-row"
                style={{ minHeight: "18.75rem" }}
            >
                {/* 受欢迎（浏览）帖子榜单 */}
                <div className="ring-1 flex justify-center items-center basis-1/3">
                    受欢迎（浏览）帖子榜单
                </div>
                {/* 评论最多帖子榜单 */}
                <div className="ring-1 flex justify-center items-center basis-1/3">
                    评论最多帖子榜单
                </div>
                {/* 最不受欢迎（不喜欢）帖子榜单 */}
                <div className="ring-1 flex justify-center items-center basis-1/3">
                    最不受欢迎（不喜欢）帖子榜单
                </div>
            </div>
        </ScrollBeauty>
    );
}
