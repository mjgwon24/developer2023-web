import React from "react";


const Footer = () => {
    return (
        <footer className="absolute bottom-0 w-full">
            <div className="flex flex-col items-center justify-center gap-2 py-6 px-4"
                 style={{background: "rgb(34 47 63)"}}>
                <div>
                    <p className="text-white md:text-xl frank-700 text-center">DEVELOPER</p>
                </div>
                <p className="text-center weight-400 text-xs md:text-sm text-[#bdbdbd]">
                    &copy; {new Date().getFullYear()} DEVELOPER. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;