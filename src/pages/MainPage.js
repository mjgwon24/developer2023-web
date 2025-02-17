import React from 'react';
import MainBanner from "../components/MainBanner";
import MainContainer from "../components/MainContainer";
import Project from "../components/Project";
import About from "../components/About";
import Team from "../components/Team";
import Progress from "../components/Progress";

const MainPage = () => {
    return (
        <div className='mainpage'>
            <MainBanner />
            <MainContainer>
                <About />
                <Team />
                <Project />
                <Progress />
            </MainContainer>
        </div>
    );
};

export default MainPage;
