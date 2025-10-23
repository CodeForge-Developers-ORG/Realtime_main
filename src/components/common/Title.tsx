import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className=" py-[30px] bg-[#FFFAED] flex items-center justify-center">
      <h1 className="text-[30px] font-[500] text-center text-[#2B2B2B]" >{title}</h1>
    </div>
  );
};

export default Title;
