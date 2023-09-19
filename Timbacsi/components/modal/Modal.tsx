import React, { useEffect, useState, useRef, ChangeEvent, BaseSyntheticEvent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateAppointment, SearchId, SearchLichkham, SearchLichkhamID, SearchPhone } from "@/service/userService";
import { error } from "console";
// import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";




type Props = {
  fullname: string;
  name_clinic: string;
  iddv: number;
  show: any;
  onClose: any;
};
export type thongtinbenhnhan = {
  id: number;
  Ho: string;
  Ten: string;
  Dienthoai: string;
  Gioitinh: string;
  Diachi: string;
  Hovaten: string;
};
const Modal = ({
  show,
  iddv,
  name_clinic,
  fullname,
  onClose,
}: Props) => {

  interface Benhnhan {
    id: number;
    Ho: string;
    Ten: string;
    Ngaysinh: Date;
    Dienthoai: string;
    Gioitinh: any;
    Diachi: string;
    // Trieuchung: string;
  }

  interface Benhnhan1 {

    id: number;
    sdt: string;
    Ho: string;
    Ten: string;
    Ngaysinh: Date;
    Dienthoai: string;
    Gioitinh: any;
    Diachi: string;
    // Trieuchung: string;
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
    batdausa: string,
    batdautr: string,
    batdauch: string,
    ketthucsa: string,
    ketthuctr: string,
    ketthucch: string,
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

  // interface HovaTen {
  //   ho: string;
  //   ten: String;
  // }
  // interface HoSoDonVi {
  //   iddv: number;
  //   tendv: string;
  //   tenbs: string;

  // }
  const [searchkey, setSearchkey] = useState("");
  const [benhnhan, setBenhnhan] = useState<Benhnhan[]>([]);
  const [benhnhan1, setBenhnhan1] = useState<Benhnhan1[]>([]);
  const [lichkham, setLichkham] = useState<Lichkham[]>([]);
  // const [hosodv, setHosodv] = useState<HoSoDonVi[]>([]);



  const [startDate, setStartDate] = useState(new Date());
  // const [day, setDay] = useState(new Date());
  const [idbn, setIdbn] = useState(Number);

  const [sdt, setSdt] = useState("");

  const [name, setName] = useState("");
  const [Ngaysinh, setNgaysinh] = useState<any>()
  const [Ngaysinh1, setNgaysinh1] = useState("");

  const [datekham, setDatekham] = useState(new Date());

  const [gt, setGT] = useState("");
  const [diachi, setDiachi] = useState("");
  const [trieuchung, setTrieuchung] = useState("");
  const [ngaykham, setNgaykham] = useState(String);
  const [buoikham, setBuoikham] = useState(String);
  const [stt, setStt] = useState(Number);
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState(String);

  const [ngaykhamfm, setNgaykhamfm] = useState(String);




  // const [idbn, setIdbn] = useState("");

  const [dodaimang, setDodaimang] = useState(Number);

  const [sang, setSang] = useState("");
  const [trua, setTrua] = useState("");
  const [chieu, setChieu] = useState("");

  const [startsa, setStartsa] = useState("");
  const [starttr, setStarttr] = useState("");
  const [startch, setStartch] = useState("");
  const [endsa, setEndsa] = useState("");
  const [endtr, setEndtr] = useState("");
  const [endch, setEndch] = useState("");
  const [time, setTime] = useState("");


  const [slsa, setSlsa] = useState(Number);
  const [sltr, setSltr] = useState(Number);
  const [slch, setSlch] = useState(Number);
  // const [active, setActive] = useState(Number);


  const [loading, setLoading] = useState(false);


  const [isBrowser, setIsBrowser] = useState(false);
  // console.log(buoikham)
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // const getLichKham = () => {
  //   {
  //     lichkham && lichkham.length > 0
  //       ? (
  //         lichkham.map((lichkhams) => {
  //           if (buoikham == "Sáng") {
  //             setStt(lichkhams.slsaHientai)
  //             setTime(startsa + "-" + endsa)
  //             console.log("tes1", time);
  //             console.log("tes2", stt);

  //           }
  //           if (buoikham == "Trưa") {
  //             setStt(lichkhams.sltrHientai)
  //             setTime(starttr + "-" + endtr)
  //           }
  //           if (buoikham == "Chiều") {
  //             setStt(lichkhams.slchHientai)
  //             setTime(startch + "-" + endch)
  //           }
  //         })
  //       ) : null
  //   }
  // }

  const handleCreateBooking = async (e: BaseSyntheticEvent) => {
    console.log("idbn", idbn);
    console.log("iddv", iddv);
    console.log("sdt", sdt);
    // console.log("gioitinh", buoikham);

    console.log("name_clinic", name_clinic);
    console.log("fullname", fullname);
    console.log("hoten", name);
    console.log("ngaysinh", Ngaysinh);
    console.log("gt", gt);
    console.log("diachi", diachi);
    console.log("trieuchung", trieuchung);
    console.log("ngaykham", ngaykham);
    console.log("ngaydat", datekham);
    console.log("buoikham", buoikham);
    console.log("startsa", startsa);
    console.log("ád", time);
    console.log("buoikdhgadáádsdam", endsa);
    // console.log("tendv", tendv);
    console.log("ngaykhamfm", ngaykhamfm);
    // setMessage("Xác nhận đặt lịch khám tại " + tendv + " ngày: " + ngaykhamfm + " buổi: " + buoikham + ", STT: " + (stt + 1))
    // console.log("mess0",message)


    // setSdt("+84166655650")
    // console.log("sdt84", sdt)

    // let sdt_temp =sdt.split("+84");
    // console.log("sdt_temp", "0"+sdt_temp[1])

    console.log("buoi", sang, trua, chieu);
    // if (buoikham == "Sáng") {
    //   console.log("buoikhamsa", buoikham);

    //   // setStt(slsa);
    //   // setTime(startsa);
    // }
    // else if (buoikham == "Trưa") {
    //   console.log("buoikhamtr", buoikham);

    //   // setStt(sltr);
    //   setTime("ádasd");
    //   console.log("buoikhamch", setTime(starttr));

    // }
    // else {
    //   console.log("buoikhamch", setTime(startsa));

    //   // setStt(slch);
    //   // setTime(startch);
    // }

    // setTime("ádas")
    // setActive(1)
    console.log("time", time)
    console.log("stt", stt)
    let temp = ("Xác nhận đặt lịch khám tại " + fullname + " ngày: " + ngaykhamfm + " buổi: " + buoikham + ", STT: " + (stt + 1));
    console.log("mess1", temp)
    let res = await CreateAppointment(
      {
        iddv: iddv,
        sdt: sdt,
        gt: gt,
        hoten: name,
        ngaysinh: Ngaysinh,
        diachi: diachi,
        trieuchung: trieuchung,
        ngaydat: new Date(),
        buoikham: buoikham,
        stt: stt + 1,
        // time: time,
        // active: active,
        ngaykham: ngaykham
        // name_clinic: name_clinic,
        // fullname: fullname,
        // idbn: idbn,

      });
    // console.log("active", active)
    if (res && res.errCode === 0) {
      // setMessage("Xác nhận đặt lịch khám tại " + tendv + " ngày: " + ngaykhamfm + " buổi: " + buoikham + ", STT: " + (stt + 1));
      // console.log("mess2",message)


      alert("Đặt lịch thành công")
      setLoading(true);
      // setError(false);
      // setSuccess(false);

// gui tn thong bao dat lich thanh cong ve sdt (su dung twilio)
      // const res1 = await fetch('/api/sendMessage', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },

      //   body: JSON.stringify({ message: temp }),

      // });
      // const apiResponse = await res1.json();



      handleCloseClick();
    } else {
      // format.error("Booking a new appointment error !");
      // }
      console.log(res)
      alert("Đặt lịch không thành công")
      // handleCloseClick();
    };

  };

  // const handleSetSTT = async () => {
  //   try {

  //     const params = {
  //       key: ngaykham,
  //     };
  //     console.log("searchdate", params);
  //     const response = await SearchLichkham(params);
  //     const res2: Lichkham[] = response.lichkhams;
  //     console.log("check api searchdate: ", response);
  //     console.log("length", res2.length);
  //     setLichkham(res2);
  //     console.log(res2)

  //     res2.map((res2) => (

  //       setSang(res2.sang),
  //       setTrua(res2.trua),
  //       setChieu(res2.chieu),
  //       setSlsa(res2.slsaHientai),
  //       setSltr(res2.sltrHientai),
  //       setSlch(res2.slchHientai),
  //       console.log("slsa", slsa),
  //       console.log("sltr", sltr),
  //       console.log("slch", slch)


  //     )
  //     );


  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const handlSearchLichkham = async () => {
  //   try {

  //     const params = {
  //       key: iddv,
  //     };
  //     console.log("searchdate", params);
  //     const response = await SearchLichkhamID(params);
  //     const res2: Lichkham[] = response.lichkhams;
  //     console.log("check api searchdate: ", response);
  //     console.log("length", res2.length);
  //     setLichkham(res2);
  //     console.log(res2)




  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  const handlSearchDate = async (date: Date) => {
    console.log("dateeeeeeeeeeeeeeeeeee", date);


    setStartDate(date);

    console.log("date", startDate);
    setDatekham(date)

    const key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    const keyfm = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()

    // console.log("key", key)
    setNgaykham(key);
    setNgaykhamfm(keyfm);

    console.log("key", key)
    // setStartDate(key );
    try {

      const params = {
        key: iddv,
      };
      console.log("searchdate", params);
      const response = await SearchLichkhamID(params);
      const res2: Lichkham[] = response.lichkhams;
      console.log("check api searchdate: ", response);
      console.log("length", res2.length);
      setLichkham(res2);
      console.log(res2)
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
          console.log(res2)

          res2.map((res2) => (
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

    // try {

    //   const params = {
    //     key: key,
    //   };
    //   console.log("searchdate", params);
    //   const response = await SearchLichkham(params);
    //   const res2: Lichkham[] = response.lichkhams;
    //   console.log("check api searchdate: ", response);
    //   console.log("length", res2.length);
    //   setLichkham(res2);
    //   console.log(res2)

    //   res2.map((res2) => (
    //     setSang(res2.sang),
    //     setTrua(res2.trua),
    //     setChieu(res2.chieu),
    //     setSlsa(res2.slsaHientai),
    //     setSltr(res2.sltrHientai),
    //     setSlch(res2.slchHientai)
    //   )
    //   );


    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onChang = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setGT(e.target.value)

  }

  const handleSetTT = async (id: number) => {
    setDodaimang(1)
    setName("")
    setGT("")

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
      console.log("ádadas2", res1)

      res1.map((res1) => (
        setSdt(res1.Dienthoai),
        setGT(res1.Gioitinh),
        setName(res1.Ho + " " + res1.Ten),
        setHo(res1.Ho),
        setTen(res1.Ten),


        setNgaysinh(res1.Ngaysinh),
        // setNgaysinh1(Ngaysinh.toString()),
        // const abc = ngaysinh.toISOString();
        // console.log("ẻ", Ngaysinh.toString()),
        setDiachi(res1.Diachi),
        // setTrieuchung(res1.Trieuchung),
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
  // const handleOnchangeDate = async (e: ChangeEvent<HTMLInputElement>) => {
  //  setNgaysinh(e.target.value);
  // }




  const handlechange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchkey(e.target.value);
    setSdt(e.target.value),
      console.log("sdt", searchkey)
    setName("")
    setGT("")

    setDiachi("")
    setTrieuchung("")

    try {
      const params = {
        key: e.target.value,
      };

      console.log("search", params);
      const response = await SearchPhone(params);
      const res: Benhnhan[] = response.thongtinbenhnhans;
      console.log("check api search: ", response);
      console.log("length", res.length);
      setDodaimang(res.length)
      // dodaimang = res.length;
      console.log("dodaimang", dodaimang);
      setBenhnhan(res);

      if (res.length == 1) {
        res.map((res) => (
          setSdt(res.Dienthoai),
          setGT(res.Gioitinh),

          setName(res.Ho + " " + res.Ten),
          setHo(res.Ho),
          setTen(res.Ten),

          setNgaysinh(res.Ngaysinh),
          setDiachi(res.Diachi),
          // setTrieuchung(res.Trieuchung),
          setIdbn(res.id)
        )
        );
      }

      if (res.length == 0) {
        // setIdbn()
        setName("")
        setGT("")
        // setNgaysinh(new Date)
        setDiachi("")
        setTrieuchung("")
        // setIdbn()
        console.log("ádasd", diachi)
      }
    } catch (error) {
      console.log(error);

    }
    console.log("name", name),
      console.log("gt", gt),
      console.log("ngsinh", Ngaysinh)


  };

  // const handleCloseClick = (e: ChangeEvent<HTMLInputElement>) => {
  const handleCloseClick = () => {

    // window.location.reload()
    // e.preventDefault();
    onClose();
    setName("")
    setSdt("")
    setGT("")    
    setNgaysinh(new Date())
    setStartDate(new Date())
    setDiachi("")
    setTrieuchung("")
    setBuoikham("")
    setNgaykham("")
    setLichkham([])
    setBenhnhan([])
    setBenhnhan1([])

    console.log("ádasd", diachi)

  };

  const modalContent = show ? (

    <StyledModalOverlay>
      { }
      <StyledModal className="  w-[500px]  rounded-lg ">
        <StyledModalHeader className=" bg-blue-300  ">
          <div className="flex text-xl p-2">
            <span className=" text-center uppercase w-full">
              {name_clinic}
              <br />
              {fullname}
            </span>

            <button
              // href="#"
              className="rounded-full text-center h-7 w-7 bg-gray-300"
              onClick={handleCloseClick}
            >
              x
            </button>
          </div>
        </StyledModalHeader>
        {
          // title  && 
          (
            <StyledModal>
              {/* {title} */}
              {/* <div></div> */}
            </StyledModal>
          )}
        <StyledModalBody className="bg-gray-300 ">
          <div className="modal ">
            <div className="modal-body-tren bg-white m-3 p-4 rounded-md">
              <div className="grid grid-cols-5 pl-4">
                <div className="col-span-1">
                  <p className="">Điện thoại</p>
                </div>
                <div className="col-span-4 pl-4">
                  <input
                    className=" border-slate-500 font-bold border-dotted w-full border-b-2"
                    type="text"
                    placeholder="NHẬP CHÍNH XÁC SỐ ĐIỆN THOẠI"
                    onChange={handlechange}
                  // ref={inputRef}
                  ></input>
                  <div className=" a" >
                    {
                      benhnhan && dodaimang > 1
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
                        : null
                    }
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 py-4">
                <div className="col-span-1 my-auto text-right">
                  <p className="datlich_text_desktop">Họ tên </p>
                </div>
                <div className="col-span-4 pl-7">
                  <input
                    className="Ho w-full  border-slate-500 border-dotted font-bold border-b-2 "
                    placeholder="NHẬP CHÍNH XÁC HỌ TÊN"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >

                  </input>
                </div>
              </div>

              <div className="grid grid-cols-5 ">
                <div className="col-span-1 my-auto text-right">
                  <p className="datlich_text_desktop">Ngày sinh </p>
                </div>
                <div className="col-span-4 pl-7">
                  <input
                    id="ngaysinh"
                    className=" font-bold form-control ngaysinh_edit txt_date w-full border-slate-500 border-dotted  border-b-2"
                    data-date-format="dd-MM-yy"
                    type="date"
                    // clearIcon={null}
                    // placeholder="DD/MM/YYYY"
                    data-inputmask-alias="date"
                    data-inputmask-inputformat="dd-mm-yyyy"
                    data-mask=""
                    im-insert="false"
                    value={Ngaysinh}
                    // onChange={(Ngaysinh: Date) => handleOnchangeDate((Ngaysinh))}
                    onChange={(event) => setNgaysinh(event.target.value)}
                  ></input>
                </div>
              </div>
              <div className="grid grid-cols-5 py-2">
                <div className="col-span-1 pl-5">
                  <p className="datlich_text_desktop text-right">Giới tính</p>
                </div>
                <div className="col-span-4 mx-10 ">
                  <input onChange={onChang} type="radio" value="Nam" name='gt' checked={gt === "Nam"} /> Nam
                  <input className="ml-9" onChange={onChang} type="radio" value="Nu" name='gt' checked={gt === "Nu"} /> Nữ
                </div>
                {/* </Radio.Group> */}
              </div>

              <div className="grid grid-cols-5 ">
                <div className="col-span-1 my-auto text-right ">
                  <p className="datlich_text_desktop text-right">Địa chỉ</p>
                </div>
                <div className="col-span-4 pl-7  ">
                  <input
                    type="text"
                    className="w-full border-slate-500 border-dotted  border-b-2"
                    placeholder=""
                    value={diachi}
                    onChange={(e) => setDiachi(e.target.value)}

                  ></input>
                </div>
              </div>

              <div className="grid grid-cols-5 py-4">
                <div className="col-span-1 my-auto text-right">
                  <p className="datlich_text_desktop">Triệu chứng</p>
                </div>
                <div className="col-span-4 pl-7 ">
                  <input
                    type="text"
                    className=" border-slate-500 border-dotted w-full border-b-2"
                    placeholder=""
                    value={trieuchung}
                    onChange={(e) => setTrieuchung(e.target.value)}

                  ></input>
                </div>
              </div>
            </div>
            <div className="modal-body-tren bg-white m-3 p-4 rounded-md">
              <div className="grid grid-cols-5">
                <div className="col-span-1 text-right">
                  <p className="datlich_text_desktop    ">Ngày khám</p>
                </div>
                <div className="col-span-4 pl-7 ">
                  <div

                    className=" border-slate-500 border-dotted font-bold border-b-2"
                  >
                    <DatePicker
                      className=""
                      // type="datetime"
                      selected={startDate}
                      // onChange={handlSearchLichkham}
                      onChange={(date: Date) => handlSearchDate((date))}
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
                {/* <option className="btn">dfghj</option>
              <option>dfghj</option>
              <option>dfghj</option> */}


                <div >
                  <div className="lichkham">
                    {lichkham && lichkham.length > 0
                      ? (
                        lichkham.map((lichkhams, index) => {

                          if (lichkhams.sang == "ONL") {
                            // setBuoikham(lichkhams.mabuoisa)
                            return (
                              <div className="col-span-4 pl-7 "
                                key={index}
                                onClick={() => setBuoikham("SA")}


                              >

                                <button className="bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400" onClick={() => setStt(lichkhams.slsaHientai)} >
                                  {/* <button className="bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400" onClick={() => getLichKham()} > */}

                                  <p className="btn-khunggio flex w-full "
                                  // onClick={handleTest}
                                  >
                                    <p className="h-9 w-[60px] text-left pl-3 pt-1">Sáng</p>
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

                      )

                      : null}
                  </div>
                  <div className="lichkham">
                    {lichkham && lichkham.length > 0
                      ? (
                        lichkham.map((lichkhams, index) => {

                          if (lichkhams.trua == "ONL") {
                            // setBuoikham("Trưa")
                            return (
                              <div className="col-span-4 pl-7 p-2"
                                key={index}
                                onClick={() => setBuoikham("TR")}
                              >
                                <button className="bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400" onClick={() => setStt(lichkhams.sltrHientai)}>
                                  <p className="btn_khunggio flex  w-full  " >
                                    <p className="h-9 w-[60px] text-left pl-3 pt-1 ">Trưa</p>
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
                      )
                      : null}
                  </div>
                  <div className="lichkham">
                    {lichkham && lichkham.length > 0
                      ? (
                        lichkham.map((lichkhams, index) => {

                          if (lichkhams.chieu == "ONL") {
                            // setBuoikham("Chiều")
                            return (
                              <div className="col-span-4 pl-7"
                                key={index}
                                onClick={() => setBuoikham("CH")}
                              >
                                <button className="bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400 " onClick={() => setStt(lichkhams.slchHientai)}>
                                  <p className="btn_khunggio flex  w-full ">
                                    <p className="h-9 w-[60px] text-left pl-3 pt-1">Chiều</p>
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

                      )

                      : null}
                  </div>
                  {/* <a onClick={handleConfirmBooking}>click</a> */}

                </div>

                {/* <div className="col-span-4 pl-[117px]">
                <div className="bg-slate-200 rounded-lg h-9 w-80 ">
                  <button className="btn_khunggio flex  w-full ">
                    <p className="h-9 w-[60px] text-left pl-3 pt-1">
                      Chiều
                    </p>
                    <p className="w-[190px] h-9 pt-1 text-left">
                      17:00 - 20:00
                    </p>
                    <p className="bg-gray-600 rounded-r-lg pt-1 h-9 w-[70px]">
                      17/60
                    </p>
                  </button>
                </div>
              </div> */}
              </div>
            </div>
            <div className=" text-right m-3 pb-2">
              <button className="bg-blue-400 w-20 rounded-lg h-9 "
                onClick={handleCreateBooking}
              // onSubmit={sendMessage}
              >
                <p className="">Đặt lịch</p>
              </button>
            </div>
          </div>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root') as HTMLElement
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 1px;
`;

const StyledModalHeader = styled.div`
  /* display: flex;
  justify-content: flex-end;
  font-size: 25px; */
`;

const StyledModal = styled.div`
  /* background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px; */
`;
const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;