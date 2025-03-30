import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import vectorRight from '../images/icon/vector_right_white.png';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


/**
 * Header.js
 * @since 2024.9.12
 * @lastmodified 2025.03.30
 * Author 임석진, 권민지
 */

const Header = ({ style = { background: "rgb(0 0 0)" }, onJoinClick }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);

    const animateHeader = () => {
        gsap.fromTo(
            headerRef.current,
            { y: -100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            }
        );
    };

    const handleLinkHover = (element, isEntering) => {
        gsap.killTweensOf(element);
        gsap.to(element, {
            scale: isEntering ? 1.02 : 1,
            duration: 0.2,
            ease: "power1.out",
            overwrite: true
        });
    };

    useEffect(() => {
        animateHeader();

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);

        const handleMouseEvents = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                handleLinkHover(e.target, e.type === 'mouseenter');
            }
        };

        const headerElement = headerRef.current;
        headerElement.addEventListener("mouseenter", handleMouseEvents, { capture: true });
        headerElement.addEventListener("mouseleave", handleMouseEvents, { capture: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            headerElement.removeEventListener("mouseenter", handleMouseEvents, { capture: true });
            headerElement.removeEventListener("mouseleave", handleMouseEvents, { capture: true });
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="fixed w-full px-4 md:px-6 py-4 z-50 transition-all duration-300 will-change-transform"
            style={{ ...style, backfaceVisibility: 'hidden' }}
        >
            <nav className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between relative">
                    <a
                        href="/"
                        className="md:text-xl frank-800 font-bold text-white transition-colors"
                    >
                        DEVELOPER
                    </a>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2"
                        >
                            {isMenuOpen ? (
                                <XMarkIcon className="w-6 h-6 text-white" />
                            ) : (
                                <Bars3Icon className="w-6 h-6 text-white" />
                            )}
                        </button>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex items-center space-x-8">
                            {[
                                { path: '/about', label: 'About' },
                                { path: '/member', label: 'Member' },
                                { path: '/project', label: 'Project' },
                            ].map(({ path, label }) => (
                                <li key={path}>
                                    <a
                                        href={path}
                                        className={`text-base hover:text-purple-500 transition-colors
                                    ${location.pathname.startsWith(path)
                                            ? 'text-purple-500 weight-500'
                                            : 'text-white weight-400'}`}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={onJoinClick}
                            className="flex items-center space-x-2 px-4 py-2 rounded-xl
                        bg-gradient-to-r from-purple-500 to-blue-500
                        hover:from-purple-600 hover:to-blue-600
                        transform hover:scale-105 transition-all
                        text-white text-base weight-500"
                        >
                            <span>가입하러 가기</span>
                            <img
                                src={vectorRight}
                                className="w-4 h-4 object-contain"
                                alt="arrow icon"
                            />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-full bg-black bg-opacity-95 rounded-lg shadow-lg py-4 px-4 z-50 transition-all duration-300 border-b border-gray-800">
                        <ul className="flex flex-col space-y-4">
                            {[
                                { path: '/about', label: 'About' },
                                { path: '/member', label: 'Member' },
                                { path: '/project', label: 'Project' },
                            ].map(({ path, label }) => (
                                <li key={path} className="w-full">
                                    <a
                                        href={path}
                                        className={`block text-center py-2 text-sm hover:text-purple-500 transition-colors
                                    ${location.pathname.startsWith(path)
                                            ? 'text-purple-500 weight-500'
                                            : 'text-white weight-400'}`}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                            <li className="pt-2">
                                <button
                                    onClick={onJoinClick}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
                                bg-gradient-to-r from-purple-500 to-blue-500
                                hover:from-purple-600 hover:to-blue-600
                                transform transition-all
                                text-white text-sm weight-500"
                                >
                                    <span>가입하러 가기</span>
                                    <img
                                        src={vectorRight}
                                        className="w-4 h-4 object-contain"
                                        alt="arrow icon"
                                    />
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;