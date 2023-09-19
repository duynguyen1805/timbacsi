

import axios from "axios";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { GetServerSideProps } from "next";
import { SearchPhone, SearchPhone1 } from "@/service/userService";

interface codeProductProps {
  phoneNumber: string | null;
  // temp: string | null | undefined;

}

const lichsu = ({ phoneNumber }: codeProductProps) => {
  interface History {
    id: number;
    username: string;
    password: string;
    ngay: Date;
    hovaten: string;
    name_bacsi: any;
    chandoan: string;
    donthuoc: string;
    ketquaCLS: string;
  }
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

  //   const [sdt1, setSdt] = useState("");
  //console.log("sdt1", phoneNumber)

  // let phoneNumber = "+84366655650";
  let temp: any
  let sdt: any
  if (phoneNumber) {
    temp = phoneNumber?.split("+84");
    sdt = "0" + temp[1]
  }
  //  sdt = "0" + temp[1];
  // console.log("sdt_temp", "0"+temp[1]/)
  console.log("sdt", sdt);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [temp1, setTemp1] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [ngayfrm, setNgayfrm] = useState(new Date())
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [benhnhan, setBenhnhan] = useState<Benhnhan[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [info, setItems] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [userData, setUserData] = useState<History[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  let ngayy: string;
  let time: string;
  let ngaygio: string;
  let i = 1;
  const handleFormatDateTime = async (date: Date) => {
    console.log("asda", date)
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    const hours = new Date(date).getHours();
    const minute = new Date(date).getMinutes();
    const second = new Date(date).getSeconds();
    // const day = new Date(date).getDate();
    ngayy = day + "/" + month + "/" + year
    time = hours + ":" + minute + ":" + second
    ngaygio = ngayy + " " + time
    console.log("day", day)
    console.log("month", month)
    console.log("year", year)
    console.log("hours", hours)
    console.log("minute", minute)
    console.log("second", second)
    console.log("ngayy", ngayy)
    //  console.log("ngay1", ngay1)
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // for(i;i<2;i++){
    const getUserdata = async () => {

      //lay all history
      try {
        const params = {
          key: sdt,
        };
        const reqData = await SearchPhone1(params);
        const res: History[] = reqData.historys;
        setUserData(res);


      } catch (error) {
        console.log(error);
      }
      try {
        const params = {
          key: sdt,
        };

        console.log("search", params);
        const response = await SearchPhone(params);
        setItems(response)
        const res: Benhnhan[] = response.thongtinbenhnhans;
        console.log("check api search: ", response);
        console.log("length", res.length);
        console.log("items", info);
        setBenhnhan(res);
      } catch (error) {
        console.log(error);
      }
      // lay all thongtinbenhnhan

      // try {
      //   const params = {
      //     key: sdt,
      //   };

      //   console.log("search", params);
      //   const response = await SearchPhone(params);
      //   setItems(response)
      //   const res: Benhnhan[] = response.thongtinbenhnhans;
      //   console.log("check api search: ", response);
      //   console.log("length", res.length);
      //   console.log("items", info);
      //   setBenhnhan(res);


      // } catch (error) {
      //   console.log(error);

      // }


      //  catch (error) {
      //   console.log(error);
      // }
      // for(i;i<2;i++){
      // localStorage.setItem('thongtinbenhnhan', JSON.stringify(info));

      // }


    }; 
    getUserdata();
    // }
    localStorage.setItem('thongtinbenhnhan', JSON.stringify(info));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    localStorage.setItem('thongtinbenhnhan', JSON.stringify(info));
  }, [info]);


  return (
    <main>
      <Header />
      <title>Lịch sử</title>/
      <center>
        <div className="bg-green-500 h-8 uppercase text-xl">
          lịch sử khám bệnh
        </div>
        <div className="row p-5">
          <table className=" border-separate border border-slate-400 w-full  ">
            <thead>
              <tr>
                {/* <th className="border border-slate-300">#</th> */}
                <th className="border border-slate-300">#</th>
                <th className="border border-slate-300">Ngày</th>
                <th className="border border-slate-300">Họ và tên</th>
                <th className="border border-slate-300">Bác sĩ</th>
                <th className="border border-slate-300">Chẩn đoán</th>
                <th className="border border-slate-300">Đơn thuốc</th>
                <th className="border border-slate-300">Kết quả CLS</th>
                {/* <th className="border border-slate-300">{sdt}</th> */}

              </tr>
            </thead>
            <tbody>
              {userData.map((item) => (
                // setDate(item.ngay),
                <>
                  <tr key={item.id}>
                  <td className="border border-slate-300 text-center">{item.id}</td>

                    {/* <div className="text-center"> */}
                    <td className="border border-slate-300 text-center">
                      <div className="text-center" {...handleFormatDateTime(item.ngay)}>{time}</div>
                      <div className="text-center">{ngayy}</div>
                    </td>
                    {/* </div> */}


                    <td className="border border-slate-300 pl-5">{item.hovaten}</td>
                    <td className="border border-slate-300 pl-5">{item.name_bacsi}</td>
                    <td className="border border-slate-300 pl-5">{item.chandoan}</td>
                    <td className="border border-slate-300 pl-5">{item.donthuoc}</td>
                    <td className="border border-slate-300 pl-5">{item.ketquaCLS}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<codeProductProps> = async (
  context
) => {
  // const {phoneNumber} = context.query;


  const { phoneNumber } = context.query;

  return {
    props: {
      phoneNumber: phoneNumber as string | null
    }
  }
}


export default lichsu;






