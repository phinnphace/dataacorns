import React from 'react';

const SurveyDesign: React.FC = () => {
  return (
    <div className="w-full h-[calc(100vh-3.5rem)] bg-[#F4F2ED] overflow-hidden">
      <iframe
        id="survey-design-frame"
        src="/mayo_sogi_case_study.html"
        title="SOGI Data Collection Case Study"
        className="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
  );
};

export default SurveyDesign;
