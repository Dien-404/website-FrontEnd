// 依赖导入
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
// Routes 页面加载
import Home from "../pages/Home";
import About from "../pages/About";
import Cate from "../pages/Cate";
import Feedback from "../pages/Feedback";
import Welcome from "../pages/Welcome";
import Admin from "../pages/Admin";
import User from "../pages/User";

export const ToastContext = React.createContext(undefined);

export default function Router() {
    const [toastContext, setToastContext] = useState("");
    const [isShowToast, setIsShowToast] = useState(false);
    const showToast = (context) => {
        setToastContext(context);
        setIsShowToast(true);
        setTimeout(() => {
            setIsShowToast(false);
        }, 2000);
    };
    return (
        <BrowserRouter>
            <CSSTransition
                in={isShowToast}
                timeout={200}
                classNames="Fade"
                unmountOnExit
            >
                <div
                    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center bg-gray-100 px-5 py-2 shadow-lg rounded font-semibold"
                    style={{ zIndex: "999" }}
                >
                    {toastContext}
                </div>
            </CSSTransition>
            <ToastContext.Provider value={showToast}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cate" element={<Cate />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </ToastContext.Provider>
        </BrowserRouter>
    );
}
