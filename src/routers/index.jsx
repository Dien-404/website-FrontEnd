import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Cate from "../pages/Cate";
import Feedback from "../pages/Feedback";
import Welcome from "../pages/Welcome";
import Admin from "../pages/Admin";
import User from "../pages/User";
// const Router = () => {
//     return (
// <BrowserRouter>
//     <Routes>
//         <Route index element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/cate" element={<Cate />} />
//         <Route path="/feedback" element={<Feedback />} />
//     </Routes>
// </BrowserRouter>
//     );
// };

// export default Router;

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/cate" element={<Cate />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </BrowserRouter>
    );
}
