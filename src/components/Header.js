import React from "react";
import '../css/style.css'
import '../css/style2.css'
import vectorRight from '../images/icon/vector_right_white.png'
import { Link } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ style = {background: "rgb(0 0 0)"} }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // 가입 페이지로 이동
    const handleJoinClick = () => {
        navigate('/join');
    };

    return (
        <header className="header-layout" style={{...style}}>
            <nav>
                <ul className="display-flex justify-between margin-0">
                    <li>
                        <a className="header-developer" href="/">DEVELOPER</a>
                    </li>

                    <div className="display-flex gap-1r">

                        <li>
                            <a className={`hover-color-purple
                                ${location.pathname.startsWith('/about') ? 'color-purple weight-500' : 'color-white weight-400'}`}
                               href="/About">About</a>
                        </li>

                        <li>
                            <a className={`hover-color-purple
                                ${location.pathname.startsWith('/member') ? 'color-purple weight-500' : 'color-white weight-400'}`}
                               href="/member">Member</a>
                        </li>
                        <li>
                            <a className={`hover-color-purple
                                ${location.pathname.startsWith('/project') ? 'color-purple weight-500' : 'color-white weight-400'}`}
                               href="/project">Project</a>
                        </li>

                        <button
                            className="color-white padding10-16 radius-8 weight-500 display-flex gap-5p hover-pointer hover-color-white10"
                            onClick={handleJoinClick}
                            style={{
                                background: 'linear-gradient(to bottom, #d946ef, #3376fa)', // 그라데이션 적용
                                border: 'none', // 필요에 따라 테두리 제거
                                transition: 'background 0.3s ease', // 부드러운 배경색 전환
                            }}
                        >
                            <p className="color-white">가입하러 가기</p> {/* 글씨 색을 하얀색으로 지정 */}
                            <img src={vectorRight} className="width-12" alt="arrow icon"/>
                        </button>

                    </div>
                </ul>
            </nav>
        </header>
    );
}

export default Header;