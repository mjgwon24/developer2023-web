import React from "react";

/**
 * DetailContainer 컴포넌트
 * @author 김진수
 * @since 2024.10.31
 * @lastmodified 2024.11.01
 */

const DetailContainer = ({ children }) => {
    return (
        <div className="flex flex-col items-center w-full pt-24 md:pt-40 pb-20">
            {React.Children.map(children, (child) => {
                let backgroundColor = "#000000"; // 기본 배경색

                if (child.type && child.type.name === "ProjectIntroduce") {
                    backgroundColor = "#000000";
                }

                return (
                    <div style={{ backgroundColor }}>
                        <div className="md:w-[1000px]">
                            {child}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DetailContainer;
