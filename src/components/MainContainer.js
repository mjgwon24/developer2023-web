import React from "react";

const MainContainer = ({ children }) => {
    return (
        <div className="main-container-outside">
            {React.Children.map(children, (child) => {
                let backgroundColor = "#ffffff"; // 기본 배경색

                // 각 child의 타입에 따라 배경색을 변경
                if (child.type && child.type.name === "About") {
                    backgroundColor = "#191919";
                } else if (child.type && child.type.name === "Team") {
                    backgroundColor = "#000000";
                } else if (child.type && child.type.name === "Project") {
                    backgroundColor = "#191919";
                } else if (child.type && child.type.name === "StackUpPage") {
                    backgroundColor = "#000000";
                }

                // 개별 child를 배경색을 가진 div로 감싸고, .main-container 스타일 유지
                return (
                    <div style={{ backgroundColor }}>
                        <div className="main-container">
                            {child}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MainContainer;
