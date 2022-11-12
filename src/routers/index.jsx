// 依赖导入
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = lazy(() => {
    return import("../pages/App");
});

// Routes 页面懒加载
// 主页
const Home = lazy(() => {
    return import("../pages/Home");
});
// 分类
const About = lazy(() => {
    return import("../pages/About");
});
// 关于
const Cate = lazy(() => {
    return import("../pages/Cate");
});
// 反馈
const Feedback = lazy(() => {
    return import("../pages/Feedback");
});

const Articles = lazy(() => {
    return import("../pages/Articles");
});

const AllArticle = lazy(() => {
    return import("../components/AllArticle");
});

const ArticleId = lazy(() => {
    return import("../components/ArticleId");
});

// 注册及登录界面
const Welcome = lazy(() => {
    return import("../pages/Welcome");
});
// 管理
const WebsiteManager = lazy(() => {
    return import("../components/managerController/WebsiteManager");
});
const UserManager = lazy(() => {
    return import("../components/managerController/UserManager");
});
const PostManager = lazy(() => {
    return import("../components/managerController/PostManager");
});
const ConsumeManager = lazy(() => {
    return import("../components/managerController/ConsumeManager");
});
// 用户
// const User = lazy(() => {
//     return import("../pages/User");
// });

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className="w-screen h-screen flex justify-center items-center">
                        loading...
                    </div>
                }
            >
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<Home />}></Route>
                        <Route path="cate" element={<Cate />} />
                        <Route path="about" element={<About />} />
                        <Route path="articles" element={<Articles />}>
                            <Route index element={<AllArticle />} />
                            <Route path=":id" element={<ArticleId />} />
                        </Route>
                        <Route path="/feedback" element={<Feedback />} />
                        <Route path="/welcome" element={<Welcome />} />
                    </Route>
                    <Route path="/admin">
                        <Route path="" element={<Navigate to="website" />} />
                        <Route path="website" element={<WebsiteManager />} />
                        <Route path="user" element={<UserManager />} />
                        <Route path="post" element={<PostManager />} />
                        <Route path="consume" element={<ConsumeManager />} />
                    </Route>
                    <Route
                        path="*"
                        element={
                            <div className="w-screen h-screen flex justify-center items-center">
                                404
                            </div>
                        }
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
