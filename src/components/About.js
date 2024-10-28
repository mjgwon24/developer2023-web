/**
 * About 컴포넌트
 * @author 김진수
 * @since 2024.09.17
 * @lastmodified 2024.09.20
 */
import React from "react";
import '../css/style.css';  // CSS 파일을 불러옴
import '../css/practice.css';
import img from '../images/practice/img.png';
import img2 from '../images/practice/img2.png';

function About() {
    return (
        <div className="text-align-center padding85-0">
            {/* 제목 */}
            <div className="display-flex flex-direction-column gap-05r margin-bottom-70">
                <h2 className="font-size-36 weight-700">끊임없이 만들어지는 우리의 이야기</h2>
            </div>

            {/* 첫 번째 섹션: 이미지와 텍스트를 가로로 배치 */}
            <div className="section" style={{marginBottom: "40px"}}>
                <img src={img} alt="팀 활동 이미지" className="image" style={{marginRight: "60px"}}/>
                <div className="text">
                    <p><span className="weight-600">DEVELOPER</span>는</p>
                    <p>개발자의 꿈을 가진, 성장하고 싶은 대학생을 위한</p>
                    <p><span className="weight-600">IT 학술 동아리</span>입니다.</p>
                    <p><br/>틀에 박힌 딱딱한 공부가 아닌,</p>
                    <p>직접 창작하고 개발하는 <span className="weight-600">프로젝트형 활동방식</span>을 추구하여</p>
                    <p>스스로의 역량을 계속해서 발전시킬 기회를 제공합니다.</p>
                </div>
            </div>

            {/* 두 번째 섹션: 이미지와 텍스트를 좌우 반전하여 배치 */}
            <div className="section reverse">
                <img src={img2} alt="발표 이미지" className="image"/>
                <div className="text" style={{marginLeft: "20px"}}>
                    <p>팀원들과 함께 원하는 개발 프로젝트를 진행하고,</p>
                    <p>발표를 통해 다른 팀들과 피드백을 하며 성장하세요.</p>
                    <p><br/>자유롭게 열려있는 분위기 속에서 팀원들과</p>
                    <p><span className="weight-600">협업 활동</span>을 통해<span className="weight"> 실력 상승</span>을 경험해 보세요!</p>
                </div>
            </div>
        </div>
    );
}

export default About;
