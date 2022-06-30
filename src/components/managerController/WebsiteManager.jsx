import React from "react";

export default function WebsiteManager(props) {
    return (
        <div className={`flex flex-col w-full h-full`}>
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
        </div>
    );
}
