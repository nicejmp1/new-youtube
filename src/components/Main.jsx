import React from "react";

const Main = ({ children, isSidebarVisible }) => {
    return (
        <main id="main" role="main" className={isSidebarVisible ? 'sidebar-visible' : ''}>
            {children}
        </main>
    );
};

export default Main;
