import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="h-12 py-[40px] bg-[#FFFAED] flex items-center justify-center">
      <h1 className="text-3xl font-[500] text-center text-[#2B2B2B]" >{title}</h1>
    </div>
  );
};

export default Title;
