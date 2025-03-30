import React from "react";
import About from "./About";
import Team from "./Team";
import Project from "./Project";
import Progress from "./Progress";

/**
 * About 컴포넌트
 * @author 김진수, 권민지
 * @since 2024.09.17
 * @lastmodified 2025.03.30
 */

const MainContainer = ({ children }) => {
    return (
        <div className="main-container-outside">
            {React.Children.map(children, (child) => {
                let backgroundColor = "#131313";

                if (child.type === About) {
                    backgroundColor = "#191919";
                } else if (child.type === Team) {
                    backgroundColor = "#000000";
                } else if (child.type === Project) {
                    backgroundColor = "#191919";
                } else if (child.type === Progress) {
                    backgroundColor = "#000000";
                }

                return (
                    <div style={{ backgroundColor }}>
                        <div className="w-full max-w-7xl mx-auto">
                            {child}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MainContainer;
