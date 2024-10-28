import React, { useEffect, useState } from 'react';
import '../css/style.css'; // 기본 스타일 추가
import '../css/join.css'; // 기본 스타일 추가

/**
 * ContactWidget
 * @since 2024.10.10
 * @author 임석진
 * npm install-icons --save
 */


const JoinPage = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(true); // 페이지 진입 시 팝업을 자동으로 표시
    const isJoinPeriod = false; // 가입 기간 설정

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

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="join-page">
            <div className="left-container">
                <p className="white-text">개발을 통해 성장하는 우리들의 이야기</p>
                <div className="developer-text">DEVELOPER</div>
            </div>

            <div className="right-container">
                <div className="code-output fade-in">
                    <pre>
                        {displayedText}
                    </pre>
                </div>
            </div>

            {/* 팝업 */}
            {isJoinPeriod === false && isPopupVisible && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h2 style={styles.popupHeader}>가입 신청이 불가능합니다!</h2>
                        <p>현재는 가입 신청이 불가능합니다. 다음 가입 기간은 2025년 1월 28일부터 2025년 2월 14일입니다.</p>
                        <button style={styles.popupButton} onClick={handleClosePopup}>닫기</button>
                    </div>
                </div>
            )}
        </div>
    );
}

// 팝업 스타일 정의
const styles = {
    popupOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 어두운 배경
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        width: '300px',
    },
    popupHeader: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
    },
    popupButton: {
        backgroundColor: '#a852ff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px',
    }
};

export default JoinPage;

