import React from "react";

const Footer = () => {
  return (
    <div className="relative bottom-0 w-full h-10 border-t-2 border-gray-300">
      <div className="pt-2 pb-2 bg-white ">
        {/* <div className={styles.image}></div> */}
        <div className="h-6 text-black text-base text-center pt-[1px]">
          © 2020 by{" "}
          <a
            className="text-indigo-700"
            href="https://tpsoftct.vn"
            target="_blank"
          >
            TPSoft
          </a>{" "}
          | Điện thoại hỗ trợ: 0919 118 187
        </div>
      </div>
    </div>
  );
};

export default Footer;
