import React from "react";
import localFont from "next/font/local";

const Sinoreta = localFont({
  src: "../../public/fonts/Sinoreta_PERSONAL_USE_ONLY.otf",
});

type Props = {};

const Landing: React.FC<Props> = (props: Props) => {
  return (
    <div className="w-11/12 mx-auto h-[20vh] py-16 flex flex-col justify-between items-center">
      <h1 style={Sinoreta.style} className="text-5xl lg:text-6xl">
        Image Gallery
      </h1>
    </div>
  );
};

export default Landing;
