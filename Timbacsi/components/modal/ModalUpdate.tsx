import React, { useEffect, useState, useRef, ChangeEvent, BaseSyntheticEvent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateAppointment, SearchId, SearchLichkham, SearchLichkhamID, SearchPhone, UpdateInf, searchBookingID } from "@/service/userService";
import { error } from "console";
// import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";

interface listBooking {
  id: number;
  iddv: number;
  idbn: number;
  hoten: string;
  sdt: string;
  diachi: string;
  Trieuchung: string;
  ngaykham: string;
  gioitinh: string;
  ngaysinh: string;
  buoikham: string;
  ngaydat: string;

  time: string;
  stt: number;
  active: number;
}



type Props = {
  fullname: string;
  name_clinic: string;
  iddv: number;
  id: number;
  idbenhnhan: number;
  show: any;
  onClose: any;
  // day: number;
  // month: number;
  // year: number;
  data: listBooking;
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
  id,
  // day,
  // month,
  // year,
  data,
  iddv,
  idbenhnhan,
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
    Trieuchung: string;
  }
  interface Booking {
    id: number;
    iddv: number;
    idbn: number;
    hoten: string;
    sdt: string;
    diachi: string;
    Trieuchung: string;
    ngaykham: Date;
    gioitinh: string;
    ngaysinh: string;
    buoikham: string;
    time: string;
    stt: number;
    active: number;
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
    Trieuchung: string;
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
  const [booking, setBooking] = useState<Booking[]>([]);

  const [lichkham, setLichkham] = useState<Lichkham[]>([]);
  // const [hosodv, setHosodv] = useState<HoSoDonVi[]>([]);


  const [date, setDate] = useState(new Date());

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
  const [css_sa, setCss_sa] = useState("");
  const [css_tr, setCss_tr] = useState("");
  const [css_ch, setCss_ch] = useState("");
  // const [active, setActive] = useState(Number);


  const [loading, setLoading] = useState(false);


  const [isBrowser, setIsBrowser] = useState(false);
  // console.log("iddv", iddv)
  // console.log("idbenhnhan", idbenhnhan)
  console.log("ngaykham12", data.ngaydat)
  // console.log("buoikhammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", buoikham)

  const date1 = new Date(data.ngaykham);
  const day = date1.getDate();
  const month = date1.getMonth(); // từ 0 đến 11
  const year = date1.getFullYear();

  console.log("buoikham", css_sa)
      console.log("buoikham", css_tr)
      console.log("buoikham", css_ch)



  useEffect(() => {
    const getUserdata = async () => {
      // let ngay_temp: string;
      // let thang_temp: string;
      // let nam_temp: string;
      // let temp: string[];
      // const x: number;
      // let y: number;
      // let z: number;
      //get all booking

      //  console.log("startdate1", fullDate_1)

      try {
        const params = {
          key: id,
        };
        console.log("search", params);
        const response1 = await searchBookingID(params);

        const res: Booking[] = response1.bookings;
        console.log("check api search1: ", response1);
        console.log("length1", res.length);
        setBooking(res);
        // console.log("ádadas2", res)
        res.map((res) => (
          setSdt(res.sdt),
          setGT(res.gioitinh),
          setName(res.hoten),
          setNgaysinh(res.ngaysinh),
          setDiachi(res.diachi),
          setTrieuchung(res.Trieuchung),
          // setNgaysinh1(res.ngaykham.toString()),

          setNgaykham(data.ngaykham),
          setDate(res.ngaykham),
          setStt(res.stt),
          // console.log("stttttttttttttttttttttttttttttttttttt", Ngaysinh1),


          // temp = ngaykham.split("-"),

          // nam_temp = temp[0],
          // ngay_temp = temp[2],
          // thang_temp = temp[1],
          //  day = date.getDate(),
          //  month = date.getMonth() + 1, // từ 0 đến 11
          //  year = date.getFullYear(),

          startDate.setDate(day),
          startDate.setMonth(month),
          startDate.setFullYear(year),

          //  x = +ngay_temp,
          //  y = Number(thang_temp),
          //  z = Number(nam_temp),


          // fullDate_1 = ngay,
          // setStartDate(fullDate_1),

          // setNgaykham(res.ngaykham),
          // setStartDate(res.ngaykham),
          // setNgaysinh1(Ngaysinh.toString()),
          // const abc = ngaysinh.toISOString();
          // console.log("ẻ", Ngaysinh.toString()),
          setBuoikham(res.buoikham)
          // console.log("temp", temp),

          // setIdbn(res.id),
          // console.log("ngaykham", ngaykham),
          // console.log("ngay_temp", ngay_temp),
          // console.log("thang_temp", thang_temp),
          // console.log("nam_temp", nam_temp),
          // console.log("name", name),
          // console.log("gt", gt),
          // console.log("ngaysinh", Ngaysinh),
          // console.log("trieuchung", trieuchung),
          // console.log("diachi", diachi),
          // // console.log("buoikhammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm", buoikham),
          // console.log("ngaykham", res.ngaykham)



        )
        );

        try {
          const params1 = {
            id: idbenhnhan,
          };
          console.log("search", params1);
          const response1 = await SearchId(params1);

          const res1: Benhnhan[] = response1.thongtinbenhnhans;
          console.log("check api search2: ", response1);
          console.log("length1", res1.length);
          setBenhnhan(res1);
          console.log("ádadas2", res1)
          res1.map((res1) => (
            setIdbn(res1.id),
            setName(res1.Ho + " " + res1.Ten),
            setSdt(res1.Dienthoai)



          )
          );
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
      handlSearchDate2(data.ngaykham)
      setIsBrowser(true);
      if(data.buoikham == "SA"){
         setCss_sa("true")
      } else if(data.buoikham == "TR"){
        setCss_tr("true")

      }
      else{
        setCss_ch("true")

      }
      // console.log("buoikham", css_sa)
      // console.log("buoikham", css_tr)
      // console.log("buoikham", css_ch)


    };
    getUserdata();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleUpdateBooking = async (e: BaseSyntheticEvent) => {
    // console.log("id", data.id);
    // console.log("idbn", idbn);
    // console.log("iddv", iddv);
    // console.log("sdt", sdt);
    // console.log("hoten", name);
    // console.log("ngaysinh", Ngaysinh);
    // console.log("gt", gt);
    // console.log("diachi", diachi);
    // console.log("trieuchung", trieuchung);
    // console.log("ngaykham", data.ngaykham);
    // console.log("ngaydat", datekham);
    // console.log("buoikham", buoikham);
    // console.log("timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", data.time)
    // console.log("stt", stt)
    console.log("id", data.id);
    console.log("idbn", idbn);
    console.log("iddv", iddv);
    console.log("sdt", sdt);
    console.log("hoten", name);
    console.log("ngaysinh", Ngaysinh);
    console.log("gt", gt);
    console.log("diachi", diachi);
    console.log("trieuchung", trieuchung);
    console.log("ngaykham", data.ngaykham);
    // console.log("ngaydat", new Date());
    console.log("buoikham", buoikham);
    console.log("timeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", data.time)
    console.log("stttttttttttttttttttttttttttttttttttt", stt)
    const ngaydatfr = new Date();
    const ngaydatformat = ngaydatfr.getFullYear() + "-" + (ngaydatfr.getMonth() + 1) + "-" + ngaydatfr.getDate()
    console.log("ngaykhammmmmmmmmmmmmmmmmmmmmm", data.ngaykham);
    console.log("ngaykhammmmmmmmmmmmmmmmmmmmmmmmupdate", ngaykham);

    console.log("ngaydatformat", ngaydatformat);

    let temp = ("Xác nhận đặt lịch khám tại " + fullname + " ngày: " + ngaykhamfm + " buổi: " + buoikham + ", STT: " + (stt + 1));
    console.log("mess1", temp)
    let res = await UpdateInf(
      {
        id: data.id,
        iddv: iddv,
        idbn: idbn,
        sdt: sdt,
        gioitinh: gt,
        hoten: name,
        ngaysinh: Ngaysinh,
        diachi: diachi,
        trieuchung: trieuchung,
        // ngaydat: ngaydatformat,
        ngaydat: new Date(),
        ngaydatUpdate: ngaydatformat,
        buoikham: buoikham,
        stt: stt,
        time: data.time,
        ngaykham: data.ngaykham,
        ngaykhamUpdate: ngaykham

      });
    if (res && res.errCode === 0) {
      // setMessage("Xác nhận đặt lịch khám tại " + tendv + " ngày: " + ngaykhamfm + " buổi: " + buoikham + ", STT: " + (stt + 1));
      console.log("res.errCode", res.errCode)


      alert("Update lịch thành công")
      // setLoading(true);
      // setError(false);
      // setSuccess(false);


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
      handleCloseClick();
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
    setBuoikham("")

    // setStartDate(date);
    setStartDate(date)
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
        key: data.iddv,
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
  const handlSearchDate2 = async (date: string) => {

    // // setStartDate(date);

    // // console.log("date", startDate);
    // // setDatekham(date)

    // // const key = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    // // const keyfm = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()

    // // console.log("key", key)
    // setNgaykham(key);
    // // setNgaykhamfm(keyfm);

    // // console.log("key", key)
    // // setStartDate(key );
    try {

      const params = {
        key: data.ngaykham,
      };
      console.log("searchdate", params);
      const response = await SearchLichkham(params);
      const res2: Lichkham[] = response.lichkhams;
      console.log("check api searchdate: ", response);
      console.log("length", res2.length);
      setLichkham(res2);
      console.log(res2)
      if (res2.length > 0) {
        try {

          const params = {
            key: data.ngaykham,
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
        setTrieuchung(res1.Trieuchung),
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
          setTrieuchung(res.Trieuchung),
          setIdbn(res.id)
        )
        );
      }

      if (res.length == 0) {
        // setIdbn()
        setName("")
        setGT("")
        setNgaysinh(new Date)
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
    // setName("")
    // setSdt("")
    // setGT("")    
    // setNgaysinh(new Date())
    // setStartDate(new Date())
    // setDiachi("")
    // setTrieuchung("")
    // setBuoikham("")
    // setNgaykham("")
    // setLichkham([])
    // setBenhnhan([])
    // setBenhnhan1([])

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
                    value={sdt}
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
                    placeholder="DD/MM/YYYY"
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

                                <button className={css_sa =="true" ? "bg-blue-500 rounded-lg h-9 w-80 focus:bg-blue-400" : "bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400"}
                                 onClick={() => setStt(lichkhams.slsaHientai)} >
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
                                <button className={css_tr =="true" ? "bg-blue-500 rounded-lg h-9 w-80 focus:bg-blue-400" : "bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400"}>
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
                                <button className={css_ch =="true" ? "bg-blue-500 rounded-lg h-9 w-80 focus:bg-blue-400" : "bg-slate-200 rounded-lg h-9 w-80 focus:bg-blue-400"}>
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
                onClick={handleUpdateBooking}
              // onSubmit={sendMessage}
              >
                <p className="">Cập nhật</p>
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