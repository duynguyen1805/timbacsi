import React from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleZaloLogin = () => {
    router.push("/zalo-login");
  };
  const handleLogin = () => {
    router.push("/signInOTP");
  };
  const handleLogo = () => {
    router.push("/");
  };

  return (
    <div className="h-[67px] w-full bg-[white] px-2.5 py-0">
      <div className="w-full h-[67px] flex">
        <div className="w-[30%] flex">
          <div
            className="h-[67px] w-full cursor-pointer mt-2.5 bg-[url('../public/logo.png')] bg-no-repeat"
            onClick={handleLogo}
          ></div>
        </div>

        <div className="w-[70%] flex items-center justify-end">
          <div className="h-5 min-w-[67.109px] inline-flex items-center bg-[#03a5fa] relative cursor-pointer no-underline whitespace-nowrap mr-[30px] px-3 py-3 rounded-[3px]">
            <div
              className="h-[34px] w-10 bg-[2px_2px] bg-[url('../public/zalo.png')] bg-no-repeat"
              onClick={handleZaloLogin}
            ></div>
            <div
              className="text-white leading-5 text-xs"
              onClick={handleZaloLogin}
            >
              Quan tâm
            </div>
          </div>
          <div
            className="h-3/6 w-8 cursor-pointer bg-[url('../public/login.png')] bg-no-repeat"
            onClick={handleLogin}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
