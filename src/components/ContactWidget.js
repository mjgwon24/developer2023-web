import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'; // 전화 아이콘
import kakaoLogo from '../images/backgroundAndPicture/kakao_logo.png';

const ContactWidget = () => {
    const [isCardVisible, setIsCardVisible] = useState(false);

    // 위젯 클릭 시 연락처 카드 표시/숨김
    const toggleCardVisibility = () => {
        setIsCardVisible(!isCardVisible);
    };

    return (
        <>
            {/* 메일 버튼 */}
            <div style={styles.widgetButton} onClick={toggleCardVisibility}>
                <FontAwesomeIcon icon={faEnvelope} style={styles.mailIcon} />
            </div>
            {/* 연락처 카드 */}
            {isCardVisible && (
                <div style={styles.cardContainer}>
                    <h2 style={styles.header}>문의하기</h2>
                    <p style={styles.description}>문의사항이 있으실 경우 아래로 연락 주세요!</p>
                    <div style={styles.contactBox}>
                        <FontAwesomeIcon icon={faPhoneAlt} style={styles.contactIcon} />
                        <span style={styles.contactText}>010-1234-5678</span>
                    </div>
                    <a
                        href="https://open.kakao.com/o/some-link" // 오픈채팅 URL
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.kakaoButton}
                    >
                        <img
                            src={kakaoLogo} // 로컬에 저장한 이미지 경로
                            alt="KakaoTalk"
                            style={styles.kakaoIcon}
                        />
                        카카오톡으로 문의하기
                    </a>
                    <button style={styles.closeButton} onClick={toggleCardVisibility}>X</button>
                </div>
            )}
        </>
    );
};

// 스타일 정의
const styles = {
    widgetButton: {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '60px',
        height: '60px',
        backgroundColor: '#6200ea',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    mailIcon: {
        color: 'white',
        fontSize: '26px', // 원하는 크기로 변경 가능
    },
    cardContainer: {
        position: 'fixed',
        bottom: '100px',
        right: '20px',
        width: '300px',
        height: '190px',
        padding: '20px',
        background: '#fff',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
    },
    header: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    description: {
        fontSize: '14px',
        color: '#3B3B3B',
        marginBottom: '20px',
    },
    contactBox: {
        backgroundColor: '#f0f0f0',
        padding: '10px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',

    },
    contactIcon: {
        fontSize: '24px',
        marginRight: '10px',
        color: '#333',
    },
    contactText: {
        fontSize: '18px',
        color: '#191919'
    },
    kakaoButton: {
        backgroundColor: '#fee500',
        color: 'black',
        textDecoration: 'none',
        padding: '12px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
    },
    kakaoIcon: {
        width: '20px',
        marginRight: '10px',
    },
    closeButton: {
        backgroundColor: '#ff4d4d',
        color: 'white',
        border: 'none',
        width: '30px',
        height: '30px',
        borderRadius: '5px',
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
    },
};

export default ContactWidget;
