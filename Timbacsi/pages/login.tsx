import Header from "@/components/Header";
import { ChangeEvent, useState } from "react";
import Router from "next/router";

import Axios from "axios";
// import { push } from "connected-react-router";
import router from "next/router";
function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [username, setUsername] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loginStatus, setLoginStatus] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // const [registerStatus, setRegisterStatus] = useState("");

  interface PhongKham {
    id: number;
    fullname: string;
    name_clinic: string;
    phonenumber: string;
    address: string;
    CM_heart: number;
    CS_heart: number;
    TĐ_heart: number;
    latitude: string;
    longitude: string;
    distance: number;
    duration: number;
    url_map: string;
  }
  //   const [userData, setUserData] = useState<PhongKham[]>([]);
  //   const [iddv, setIddv] = useState(Number);

  // const login = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   Axios.post("http://localhost:8080/api/login", {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //     if (response.data.errCode) {
  //       setLoginStatus(response.data.errCode);
  //       console.log("status2", loginStatus);
  //     } else {
  //       router.push({
  //         pathname: "/bookinglist",
  //         query: { username: username },
  //       });
  //     }
  //   });
  // };
  // // console.log("status1", loginStatus)



  const login = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    Axios.post("http://localhost:8080/api/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.errCode) {
        setLoginStatus(response.data.errCode);
        console.log("status2", loginStatus)


      } else {
        router.push({
          pathname: '/bookinglist',
          query: { username: username },
        })
      }
    })
  }
  // console.log("status1", loginStatus)

  return (
    <main>
      <Header />
      <div style={{ marginTop: 100 }}>
        <center>
          <div className='form bg-gray-200 w-80 h-64 '>
            <div className="mb-4">
              <input
                type="text"
                onChange={(e) => { setUsername(e.target.value) }}
                placeholder="Số điện thoại"
                className=" h-10 w-60 mt-4 border-red-600 border-solid bg-gray-200 border-b-2" />
              <br /><br />
              <input
                type="password"
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="Mật khẩu"
                className=" h-10 w-60 mt-4 border-red-600 border-solid bg-gray-200 border-b-2" />
              <br /><br />
              <button
                type="submit"
                onClick={login}
                className="bg-blue-400 w-60 h-10 rounded-lg font-semibold uppercase text-white hover:bg-indigo-700">
                đăng nhập
              </button>
              <h1 className="text-red-500">{loginStatus}</h1>
              <button onClick={() => Router.back()} className='text-right pt-4 pr-4'>Trở về</button>
            </div>
          </div>
    
    </center>
    </div>


    </main >
  );
}
export default login;
