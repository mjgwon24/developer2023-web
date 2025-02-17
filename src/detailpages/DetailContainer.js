import React from "react";

/**
 * DetailContainer 컴포넌트
 * @author 김진수
 * @since 2024.10.31
 * @lastmodified 2024.11.01
 */

const DetailContainer = ({ children }) => {
    return (
        <div className="detail-container-outside">
            {React.Children.map(children, (child) => {
                let backgroundColor = "#000000"; // 기본 배경색

                if (child.type && child.type.name === "ProjectIntroduce") {
                    backgroundColor = "#000000";
                }

                return (
                    <div style={{ backgroundColor }}>
                        <div className="detail-container">
                            {child}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DetailContainer;
