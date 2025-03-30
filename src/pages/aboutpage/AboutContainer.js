import React from "react";

/**
 * AboutContainer
 * @author 김진수
 * @since 2024.11.26
 * @lastmodified 2024.11.01
 */

const AboutContainer = ({ children }) => {
    return (
        <div className="pb-10 pt-20">
            {React.Children.map(children, (child) => {
                let backgroundColor = "#000000"; // 기본 배경색

                // 각 child의 타입에 따라 배경색을 변경
                if (child.type && child.type.name === "AboutAchievement") {
                    backgroundColor = "#191919";
                }

                // 개별 child를 배경색을 가진 div로 감싸고, .main-container 스타일 유지
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

export default AboutContainer;
