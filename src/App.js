import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Search from "./components/Search";

import Home from "./pages/Home";
import Mymusic from "./pages/Mymusic";
import ChartList from "./pages/ChartList";
import PlayList from "./pages/PlayList";
import MusicPlayerProvider from "./context/MusicPlayerProvider";
import SearchPage from "./pages/SearchPage";
import Footer from "./components/Footer";

const App = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    return (
        <MusicPlayerProvider>
            <BrowserRouter>
                <Header />
                <Aside isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
                <Main isSidebarVisible={isSidebarVisible}>
                    <Search />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/mymusic" element={<Mymusic />} />
                        <Route path="/playlist/:id" element={<PlayList />} />
                        <Route path="/chart/:id" element={<ChartList />} />
                        <Route path="/search/:searchKeyword" element={<SearchPage />} />
                    </Routes>
                </Main>
                <Footer />
            </BrowserRouter>
        </MusicPlayerProvider>
    );
};

export default App;
