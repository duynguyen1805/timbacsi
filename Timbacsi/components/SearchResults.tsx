import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import axios from "axios";
import BookingModal from "./modal/BookingModal";
import stethoscope from "../assets/icon/stethoscope.png";
import building from "../assets/icon/building.png";
import location from "../assets/icon/location.png";
import telephone from "../assets/icon/telephone.png";
import thumbsup from "../assets/icon/thumbs-up.png";
import Head from "next/head";
import Modal from "./modal/Modal";
import { API_appraisePhongKham } from "@/service/userService";

interface Props {
  id: number;
  fullname: string;
  name_clinic: string;
  phonenumber: string;
  address: string;
  CM_heart: number;
  CS_heart: number;
  TĐ_heart: number;
  distance: number;
  duration: number;
  url_map: string;
  refersh: () => any;
}

const SearchResults: React.FC<Props> = ({
  id,
  fullname,
  name_clinic,
  phonenumber,
  address,
  CM_heart,
  CS_heart,
  TĐ_heart,
  distance,
  duration,
  url_map,
  refersh,
}) => {
  interface Benhnhan {
    id: number;
    Ho: string;
    Ten: string;
    Ngaysinh: Date;
    Dienthoai: string;
    Gioitinh: any;
    Diachi: string;
    Trieuchung: string;
  }

  const [showModal, setShowModal] = useState(false);
  const [sdt, setSDT] = useState<any>();

  useEffect(() => {
    const thongtinbenhnhan1 = JSON.parse(
      localStorage.getItem("thongtinbenhnhan") || "{}"
    );
    if (Object.keys(thongtinbenhnhan1).length === 0) {
      console.log("true");
    } else {
      console.log("false");
      const res: Benhnhan[] = thongtinbenhnhan1.thongtinbenhnhans;
      res.map((item) => {
        setSDT(item.Dienthoai);
      });
    }
  }, []);

  const handleDanhgiaPK = async (
    sdtBN: string,
    idBS: number,
    typeheart: string
  ) => {
    const response = await API_appraisePhongKham(sdtBN, idBS, typeheart);
    if (response) {
      refersh();
    }
    console.log(response.appraise.message);
  };

  return (
    <>
      <Head>
        <title>Tìm Bác sĩ - Kết quả tìm kiếm</title>
      </Head>
      <div className="h-[360px] w-[450px] mt-5 rounded-[10px] bg-[white]">
        <div className="uppercase h-[60px] text-center text-[15px] font-semibold text-[black] flex justify-center items-center py-2 rounded-[5px_5px_0_0] bg-[#A3D8Ec]">
          {name_clinic}
        </div>
        <div className="h-[200px] text-lg text-[black] ml-2.5 pt-2 rounded-[0_0_5px_5px] bg-[white]">
          <div className="h-auto flex gap-2.5 mt-[5px]">
            <Image
              src={stethoscope}
              alt="icon"
              className="h-[25px] w-[25px] mt-1.5"
            />
            <div className="text-[red] text-[22px]">{fullname}</div>
          </div>
          <div className="h-auto flex gap-2.5 mt-[5px]">
            <Image src={building} alt="icon" className="h-[25px] w-[25px] " />
            <div className="">{name_clinic}</div>
          </div>
          <div className="h-auto flex gap-2.5 mt-[5px]">
            <Image
              src={telephone}
              alt="icon"
              className="h-[25px] w-[25px] mt-1.5"
            />
            <div className="">{phonenumber}</div>
          </div>
          <div className="h-auto flex gap-2.5 mt-[5px]">
            <Image
              src={location}
              alt="icon"
              className="h-[25px] w-[25px] mt-1.5"
            />
            <div className="">
              {address} | {(distance / 1000).toFixed(1)} km -{" "}
              {(duration / 60).toFixed(0)} phút đi xe |
              <a
                href={url_map}
                target="_blank"
                className="text-blue-600 cursor-pointer"
              >
                {" "}
                Chỉ đường
              </a>
            </div>
          </div>
        </div>
        <div className="h-[100px] w-full flex">
          <div className="w-6/12">
            <div className="text-xl flex gap-2.5 ml-[5px] mt-0.5">
              <Image
                src={thumbsup}
                alt="icon"
                className="h-[30px] w-[30px] fade-in"
                onClick={() => {
                  handleDanhgiaPK(sdt, id, "CM");
                }}
              />
              CM: {CM_heart.toLocaleString("VI-vi")}
            </div>
            <div className="text-xl flex gap-2.5 ml-[5px] mt-0.5">
              <Image
                src={thumbsup}
                alt="icon"
                className="h-[30px] w-[30px] fade-in"
                onClick={() => {
                  handleDanhgiaPK(sdt, id, "CS");
                }}
              />
              CS: {CS_heart.toLocaleString("VI-vi")}
            </div>
            <div className="text-xl flex gap-2.5 ml-[5px] mt-0.5">
              <Image
                src={thumbsup}
                alt="icon"
                className="h-[30px] w-[30px] fade-in"
                onClick={() => {
                  handleDanhgiaPK(sdt, id, "TĐ");
                }}
              />
              TĐ: {TĐ_heart.toLocaleString("VI-vi")}
            </div>
          </div>
          <div className="w-6/12">
            <button
              className="text-[white] ml-[38%] mt-[50px] px-[15px] py-1.5 rounded-[3px] border-[none] bg-[green] outline-none"
              onClick={() => setShowModal(true)}
            >
              Đặt lịch khám
            </button>
          </div>
        </div>
      </div>
      <Modal
        iddv={id}
        fullname={fullname}
        name_clinic={name_clinic}
        onClose={() => setShowModal(false)}
        show={showModal}
      ></Modal>
    </>
  );
};

export default SearchResults;
