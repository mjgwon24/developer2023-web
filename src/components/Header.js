import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import vectorRight from '../images/icon/vector_right_white.png';
import { useLocation } from "react-router-dom";

/**
 * Header.js
 * @since 2024.9.12
 * @lastmodified 2024.12.05
 * Author 임석진
 */

const Header = ({ style = { background: "rgb(0 0 0)" }, onJoinClick }) => {
    const headerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        gsap.fromTo(
            headerRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out" }
        );

        const links = headerRef.current.querySelectorAll("a, button");
        links.forEach((link) => {
            link.addEventListener("mouseenter", () => {
                gsap.to(link, { scale: 1.1, duration: 0.3, ease: "power3.out" });
            });
            link.addEventListener("mouseleave", () => {
                gsap.to(link, { scale: 1, duration: 0.3, ease: "power3.out" });
            });
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("mouseenter", null);
                link.removeEventListener("mouseleave", null);
            });
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="header-layout"
            style={{ ...style }}
        >
            <nav>
                <ul className="display-flex justify-between margin-0">
                    <li>
                        <a className="header-developer" href="/">DEVELOPER</a>
                    </li>

                    <div className="display-flex gap-1r">
                        <li>
                            <a
                                className={`hover-color-purple
                                ${location.pathname.startsWith('/about') ? 'color-purple weight-500' : 'color-white weight-400'}`}
                                href="/about"
                            >
                                About
                            </a>
                        </li>

                        <li>
                            <a
                                className={`hover-color-purple
                                ${location.pathname.startsWith('/member') ? 'color-purple weight-500' : 'color-white weight-400'}`}
                                href="/member"
                            >
                                Member
                            </a>
                        </li>
                        <li>
                            <a
                                className={`hover-color-purple
                                ${location.pathname.startsWith('/project') ? 'color-purple weight-500' : 'color-white weight-400'}`}
                                href="/project"
                            >
                                Project
                            </a>
                        </li>

                        <button
                            className="color-white padding10-16 radius-12 weight-500 display-flex gap-5p hover-pointer hover-color-white10"
                            onClick={onJoinClick}
                            style={{
                                background: 'linear-gradient(to bottom, #d946ef, #3376fa)',
                                border: 'none',
                                transition: 'background 0.3s ease',
                            }}
                        >
                            <p className="color-white">가입하러 가기</p>
                            <img src={vectorRight} className="arrow-icon" alt="arrow icon" />
                        </button>
                    </div>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
