import React from "react";

/**
 * AboutContainer
 * @author 김진수
 * @since 2024.11.26
 * @lastmodified 2025.03.30
 */

const AboutContainer = ({ children }) => {
    return (
        <div className="pb-10 pt-20">
            {React.Children.map(children, (child) => {
                let backgroundColor = "#000000";

                if (child.type && child.type.name === "AboutAchievement") {
                    backgroundColor = "#191919";
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

export default AboutContainer;
