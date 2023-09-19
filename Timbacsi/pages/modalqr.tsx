/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import Header from "@/components/Header";
import { BaseSyntheticEvent, ChangeEvent, useState } from "react";
import Router from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "axios";
// import { push } from "connected-react-router";
import router from "next/router";
import { GetServerSideProps } from "next";
import QRCode from "react-qr-code";
import {
  CreateAppointment,
  SearchId,
  SearchLichkham,
  SearchLichkhamID,
  SearchPhone,
} from "@/service/userService";
interface codeProductProps {
  iddv: string | null;
}

const modalqr = ({ iddv }: codeProductProps) => {
  interface Benhnhan {
    id: number;
    Ho: string;
    Ten: string;
    Ngaysinh: Date;
    Dienthoai: string;
    Gioitinh: any;
    Diachi: string;
  }
  interface Benhnhan1 {
    id: number;
    Ho: string;
    Ten: string;
    Ngaysinh: Date;
    Dienthoai: string;
    Gioitinh: any;
    Diachi: string;
  }
  interface Lichkham {
    id: number;
    iddv: number;
    mabuoisa: string;
    mabuoitr: string;
    mabuoich: string;
    sang: string;
    trua: string;
    chieu: string;
    batdausa: string;
    batdautr: string;
    batdauch: string;
    ketthucsa: string;
    ketthuctr: string;
    ketthucch: string;
    slsa: number;
    sltr: number;
    slch: number;
    slsaHientai: number;
    sltrHientai: number;
    slchHientai: number;
    ngay: Date;
    chovuotsa: number;
    chovuottr: number;
    chovuotch: number;
  }
  const [benhnhan, setBenhnhan] = useState<Benhnhan[]>([]);
  const [lichkham, setLichkham] = useState<Lichkham[]>([]);

  const [searchkey, setSearchkey] = useState("");
  const [sdt, setSdt] = useState("");
  const [name, setName] = useState("");
  const [gt, setGT] = useState("");
  const [diachi, setDiachi] = useState("");
  const [trieuchung, setTrieuchung] = useState("");
  const [dodaimang, setDodaimang] = useState(Number);
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState(String);
  const [Ngaysinh, setNgaysinh] = useState<any>();
  const [idbn, setIdbn] = useState(Number);
  const [startDate, setStartDate] = useState(new Date());
  const [datekham, setDatekham] = useState(new Date());
  const [ngaykhamfm, setNgaykhamfm] = useState(String);
  const [ngaykham, setNgaykham] = useState(String);
  const [sang, setSang] = useState("");
  const [trua, setTrua] = useState("");
  const [chieu, setChieu] = useState("");

  const [startsa, setStartsa] = useState("");
  const [starttr, setStarttr] = useState("");
  const [startch, setStartch] = useState("");
  const [endsa, setEndsa] = useState("");
  const [endtr, setEndtr] = useState("");
  const [endch, setEndch] = useState("");
  const [slsa, setSlsa] = useState(Number);
  const [sltr, setSltr] = useState(Number);
  const [slch, setSlch] = useState(Number);
  const [buoikham, setBuoikham] = useState(String);
  const [stt, setStt] = useState(Number);

  const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchkey(e.target.value);
    setSdt(e.target.value), console.log("sdt", searchkey);
    setName("");
    setGT("");

    setDiachi("");
    setTrieuchung("");

    try {
      const params = {
        key: e.target.value,
      };

      console.log("search", params);
      const response = await SearchPhone(params);
      const res: Benhnhan[] = response.thongtinbenhnhans;
      console.log("check api search: ", response);
      console.log("length", res.length);
      setDodaimang(res.length);
      console.log("dodaimang", dodaimang);
      setBenhnhan(res);

      if (res.length == 1) {
        res.map(
          (res) => (
            setSdt(res.Dienthoai),
            setGT(res.Gioitinh),
            setName(res.Ho + " " + res.Ten),
            setHo(res.Ho),
            setTen(res.Ten),
            setNgaysinh(res.Ngaysinh),
            setDiachi(res.Diachi),
            setIdbn(res.id)
          )
        );
      }

      if (res.length == 0) {
        setName("");
        setGT("");
        setDiachi("");
        setTrieuchung("");
        console.log("ádasd", diachi);
      }
    } catch (error) {
      console.log(error);
    }
    console.log("name", name),
      console.log("gt", gt),
      console.log("ngsinh", Ngaysinh);
  };
  const handleSetTT = async (id: number) => {
    setDodaimang(1);
    setName("");
    setGT("");

    // key = id;
    console.log("id", id);

    try {
      const params1 = {
        id: id,
      };
      console.log("search", params1);
      const response1 = await SearchId(params1);

      const res1: Benhnhan1[] = response1.thongtinbenhnhans;
      console.log("check api search: ", response1);
      console.log("length1", res1.length);
      setBenhnhan(res1);
      console.log("ádadas2", res1);

      res1.map(
        (res1) => (
          setSdt(res1.Dienthoai),
          setGT(res1.Gioitinh),
          setName(res1.Ho + " " + res1.Ten),
          setHo(res1.Ho),
          setTen(res1.Ten),
          setNgaysinh(res1.Ngaysinh),
          setDiachi(res1.Diachi),
          setIdbn(res1.id),
          console.log("name", name),
          console.log("gt", gt),
          console.log("ngaysinh", Ngaysinh),
          console.log("trieuchung", trieuchung),
          console.log("diachi", diachi)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setGT(e.target.value);
  };
  const handlSearchDate = async (date: Date) => {
    setStartDate(date);

    console.log("date", startDate);
    setDatekham(date);

    const key =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const keyfm =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    setNgaykham(key);
    setNgaykhamfm(keyfm);

    console.log("key", key);
    let key1 = Number(iddv);
    if (key1) {
      try {
        const params = {
          key: key1,
        };
        console.log("searchdate", params);
        const response = await SearchLichkhamID(params);
        const res2: Lichkham[] = response.lichkhams;
        console.log("check api searchdate: ", response);
        console.log("length", res2.length);
        setLichkham(res2);
        console.log(res2);
        if (res2.length > 0) {
          try {
            const params = {
              key: key,
            };
            console.log("searchdate", params);
            const response = await SearchLichkham(params);
            const res2: Lichkham[] = response.lichkhams;
            console.log("check api searchdate: ", response);
            console.log("length", res2.length);
            setLichkham(res2);
            console.log(res2);

            res2.map(
              (res2) => (
                setSang(res2.sang),
                setTrua(res2.trua),
                setChieu(res2.chieu),
                setSlsa(res2.slsaHientai),
                setSltr(res2.sltrHientai),
                setSlch(res2.slchHientai),
                setStartsa(res2.batdausa),
                setStartch(res2.batdauch),
                setStarttr(res2.batdautr),
                setEndsa(res2.ketthucsa),
                setEndtr(res2.ketthuctr),
                setEndch(res2.ketthucch)
              )
            );
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCreateBooking = async (e: BaseSyntheticEvent) => {
    let temp =
      "Xác nhận đặt lịch khám tại " +
      "fullname" +
      " ngày: " +
      ngaykhamfm +
      " buổi: " +
      buoikham +
      ", STT: " +
      (stt + 1);
    console.log("mess1", temp);

    if (iddv) {
      let iddv_num = Number(iddv);
      let res = await CreateAppointment({
        iddv: iddv_num,
        sdt: sdt,
        gt: gt,
        hoten: name,
        ngaysinh: Ngaysinh,
        diachi: diachi,
        trieuchung: trieuchung,
        ngaydat: new Date(),
        buoikham: buoikham,
        stt: stt + 1,
        ngaykham: ngaykham,
      });

      if (res && res.errCode === 0) {
        alert("Đặt lịch thành công");
        handleCloseClick();
      } else {
        console.log(res);
        alert("Đặt lịch không thành công");
      }
    }
  };
  const handleCloseClick = () => {
    window.location.reload();
    setName("");
    setGT("");
    setDiachi("");
    setTrieuchung("");
    console.log("ádasd", diachi);
  };
  return (
    <main>
      <center>
        <div className="bg-gray-300 h-full">
          <p className="uppercase font-bold mt-4 pt-5">
            Phòng khám bác sĩ nào đó <br />
            Tên bác sĩ nào đó
          </p>

          <div className="form bg-white w-[400px] h-full mt-2 rounded-md">
            <div className="grid grid-cols-5 pt-3 ">
              <div className="col-span-1 ml-1">
                <p className="">Điện thoại</p>
              </div>
              <div className="col-span-4 ">
                <input
                  className=" border-slate-500 text-sm font-bold border-dotted w-64 border-b-2"
                  type="text"
                  placeholder="NHẬP CHÍNH XÁC SỐ ĐIỆN THOẠI"
                  onChange={handlechange}
                  // ref={inputRef}
                ></input>
                <div className=" a">
                  {benhnhan && dodaimang > 1
                    ? benhnhan.map((thongtinbenhnhans) => (
                        <div
                          key={thongtinbenhnhans.id}
                          // number a ={ thongtinbenhnhans.id}
                          className="aâ h-5 w-80 cursor-pointer pl-1"
                          onClick={(_e) => handleSetTT(thongtinbenhnhans.id)}
                          // onChange={handlechange}
                        >
                          {thongtinbenhnhans.Ho} {thongtinbenhnhans.Ten} (
                          {thongtinbenhnhans.id})
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 pt-3 ">
              <div className="col-span-1 my-auto text-right">
                <p className="datlich_text_desktop">Họ tên </p>
              </div>
              <div className="col-span-4 ">
                <input
                  className="Ho w-64 text-sm border-slate-500 border-dotted font-bold border-b-2 "
                  placeholder="NHẬP CHÍNH XÁC HỌ TÊN"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="grid grid-cols-5 pt-3">
              <div className="col-span-1 my-auto text-right">
                <p className="datlich_text_desktop">Ngày sinh </p>
              </div>

              <div className="col-span-4 ">
                <input
                  id="ngaysinh"
                  className=" font-bold form-control ngaysinh_edit txt_date w-64 border-slate-500 border-dotted  border-b-2"
                  data-date-format="dd-MM-yy"
                  type="date"
                  data-inputmask-alias="date"
                  data-inputmask-inputformat="dd-mm-yyyy"
                  data-mask=""
                  im-insert="false"
                  value={Ngaysinh}
                  onChange={(event) => setNgaysinh(event.target.value)}
                ></input>
              </div>
            </div>

            <div className="grid grid-cols-5 pt-3 ">
              <div className="col-span-1 my-auto text-right">
                <p className="datlich_text_desktop">Giới tính</p>
              </div>

              <div className="col-span-4 mr-32">
                <input
                  className=""
                  onChange={onChang}
                  type="radio"
                  value="Nam"
                  name="gt"
                  checked={gt === "Nam"}
                />{" "}
                Nam
                <input
                  className="ml-9"
                  onChange={onChang}
                  type="radio"
                  value="Nu"
                  name="gt"
                  checked={gt === "Nu"}
                />{" "}
                Nữ
              </div>
              {/* </Radio.Group> */}
            </div>

            <div className="grid grid-cols-5 pt-3 ">
              <div className="col-span-1 my-auto text-right ">
                <p className="datlich_text_desktop text-right">Địa chỉ</p>
              </div>
              <div className="col-span-4 ">
                <input
                  type="text"
                  className="w-64 border-slate-500 border-dotted  border-b-2"
                  placeholder=""
                  value={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="grid grid-cols-5 pt-3 ">
              <div className="col-span-1 my-auto text-right">
                <p className="datlich_text_desktop">Triệu chứng</p>
              </div>
              <div className="col-span-4 ">
                <input
                  type="text"
                  className=" border-slate-500 border-dotted w-64 border-b-2"
                  placeholder=""
                  value={trieuchung}
                  onChange={(e) => setTrieuchung(e.target.value)}
                ></input>
              </div>
            </div>
          </div>

          <div className=" bg-white mt-2 w-[400px] pt-3 rounded-md">
            <div className="grid grid-cols-5">
              <div className="col-span-1 my-auto text-right ">
                <p className="datlich_text_desktop">Ngày khám</p>
              </div>
              <div className="col-span-4">
                <div className=" border-slate-500 border-dotted w-64 font-bold border-b-2">
                  <DatePicker
                    className=""
                    selected={startDate}
                    onChange={(date: Date) => handlSearchDate(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            </div>

            <div className="khunggio grid grid-cols-5 0 py-1">
              <div className="col-span-1 text-right ">
                <p className="datlich_text_desktop text-red-600">
                  Vui lòng chọn buổi
                </p>
              </div>
              <div>
                <div className="lichkham">
                  {lichkham && lichkham.length > 0
                    ? lichkham.map((lichkhams, index) => {
                        if (lichkhams.sang == "ONL") {
                          // setBuoikham(lichkhams.mabuoisa)
                          return (
                            <div
                              className="col-span-4 pl-7 "
                              key={index}
                              onClick={() => setBuoikham("SA")}
                            >
                              <button
                                className="bg-slate-200 rounded-lg h-9 w-64 focus:bg-green-500"
                                onClick={() => setStt(lichkhams.slsaHientai)}
                              >
                                {/* <button className="bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400" onClick={() => getLichKham()} > */}

                                <p className="btn-khunggio flex w-full ">
                                  <p className="h-9 w-[80px] text-left pl-3 pt-1">
                                    Sáng
                                  </p>
                                  <p className="w-[190px] h-9 pt-1 text-left">
                                    {startsa} - {endsa}
                                  </p>
                                  <p className="bg-gray-600 rounded-r-lg pt-1 h-9 w-[70px]">
                                    {lichkhams.slsaHientai}/{lichkhams.slsa}
                                  </p>
                                </p>
                              </button>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="lichkham">
                  {lichkham && lichkham.length > 0
                    ? lichkham.map((lichkhams, index) => {
                        if (lichkhams.trua == "ONL") {
                          return (
                            <div
                              className="col-span-4 pl-7 p-2"
                              key={index}
                              onClick={() => setBuoikham("TR")}
                            >
                              <button
                                className="bg-slate-200 rounded-lg h-9 w-64 focus:bg-green-500"
                                onClick={() => setStt(lichkhams.sltrHientai)}
                              >
                                <p className="btn_khunggio flex  w-full  ">
                                  <p className="h-9 w-[80px] text-left pl-3 pt-1 ">
                                    Trưa
                                  </p>
                                  <p className="w-[190px] h-9 pt-1 text-left ">
                                    {starttr} - {endtr}
                                  </p>
                                  <p className="bg-gray-600 rounded-r-lg pt-1 h-9 w-[70px]">
                                    {lichkhams.sltrHientai}/{lichkhams.sltr}
                                  </p>
                                </p>
                              </button>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
                <div className="lichkham">
                  {lichkham && lichkham.length > 0
                    ? lichkham.map((lichkhams, index) => {
                        if (lichkhams.chieu == "ONL") {
                          return (
                            <div
                              className="col-span-4 pl-7"
                              key={index}
                              onClick={() => setBuoikham("CH")}
                            >
                              <button
                                className="bg-slate-200 rounded-lg h-9 w-64 focus:bg-green-500 "
                                onClick={() => setStt(lichkhams.slchHientai)}
                              >
                                <p className="btn_khunggio flex  w-full ">
                                  <p className="h-9 w-[80px] text-left pl-3 pt-1">
                                    Chiều
                                  </p>
                                  <p className="w-[190px] h-9 pt-1 text-left">
                                    {startch} - {endch}
                                  </p>
                                  <button className="bg-gray-600 rounded-r-lg pt-1 h-9 w-[70px] center">
                                    {lichkhams.slchHientai}/{lichkhams.slch}
                                  </button>
                                </p>
                              </button>
                            </div>
                          );
                        }
                      })
                    : null}
                </div>
              </div>
            </div>
          </div>
          <div className=" text-right m-3 pb-2">
            <button
              className="bg-blue-400 w-20 rounded-lg h-9 "
              onClick={handleCreateBooking}
            >
              <p className="">Đặt lịch</p>
            </button>
          </div>
        </div>
      </center>

      <div
        style={{
          height: "auto",
          margin: "0 auto",
          maxWidth: 64,
          width: "100%",
        }}
      >
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={"http://localhost:3000/modalqr?iddv=2"}
          viewBox={`0 0 256 256`}
        />
      </div>
    </main>
  );
};
export const getServerSideProps: GetServerSideProps<codeProductProps> = async (
  context
) => {
  const { iddv } = context.query;

  return {
    props: {
      iddv: iddv as string | null,
    },
  };
};

export default modalqr;
