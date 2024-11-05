
import React, { useEffect, useState } from 'react';
import '../css/main_background.css'; // 메인 백그라운드 스타일 추가

/**
 * ContactWidget
 * @since 2024.10.10
 * @author 임석진
 */


const MainBackground = () => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const text = `  if user == "developer":
    input("Keep coding,
        keep learning,
        keep growing!")
    print("Success is your life!")
else:
    print("Curiosity is the first step.")`;

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100); // 100ms 간격으로 문자 출력

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []); // 빈 배열로 모든 렌더링에 대해 실행

    return (
        <div className="main-background">
            <div className="left-container">
                <p className="white-text">개발을 통해 성장하는 우리들의 이야기</p>
                <div className="developer-text">DEVELOPER</div>
            </div>

            <div className="right-container">
                <div className="code-output fade-in">
                    <pre
                        style={{
                            position: "relative",
                            color: "rgba(88, 237, 36, 0.52)",
                            fontFamily: "'Frank Ruhl Libre', serif",
                            fontSize: "56px",
                            fontStyle: "normal",
                            fontWeight: 900,
                            lineHeight: "normal",
                            zIndex: 10

                        }}
                    >
                        {displayedText}
                    </pre>
                </div>
            </div>
        </div>
    );
}

export default MainBackground;

