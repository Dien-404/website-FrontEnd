import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
    display: flex;
    align-items: center;
    width: "100%";
    height: 3.5rem;
    padding: 0 0.25rem;
    border-bottom: 0.0625rem solid rgba(255, 255, 255, 1);
`;

export default function Menu() {
    return (
        <>
            <div className={`overflow-y-scroll px-2`}>
                <Card>
                    <Link
                        className="w-full h-full flex items-center justify-between"
                        to="/"
                    >
                        <span>首页</span>
                        <span>&gt;</span>
                    </Link>
                </Card>
                <Card>
                    <Link
                        className="w-full h-full flex items-center justify-between"
                        to="/cate"
                    >
                        <span>分类</span>
                        <span>&gt;</span>
                    </Link>
                </Card>
                <Card>
                    <Link
                        className="w-full h-full flex items-center justify-between"
                        to="/about"
                    >
                        <span>关于</span>
                        <span>&gt;</span>
                    </Link>
                </Card>
                <Card>
                    <Link
                        className="w-full h-full flex items-center justify-between"
                        to="/feedback"
                    >
                        <span>反馈</span>
                        <span>&gt;</span>
                    </Link>
                </Card>
            </div>
        </>
    );
}
