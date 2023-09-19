import {
  API_receivePatient,
  SearchId,
  searchhsdv,
  searchhsdvID,
} from "@/service/userService";
import { useEffect, useState } from "react";
import ModalUpdate from "./modal/ModalUpdate";

interface InforBNdatlich {
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

interface Props {
  data: InforBNdatlich;
  refersh: () => any;
}

const Listbooking: React.FC<Props> = ({ data, refersh }) => {
  const [isOpen, setState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(Number);
  const [iddv, setIddv] = useState(Number);
  const [idbn, setIdbn] = useState(Number);
  const [fullname, setFullname] = useState("");
  const [name_clinic, setName_clinic] = useState("");

  const [userData, setUserData] = useState<PhongKham[]>([]);
  const [benhnhan, setBenhnhan] = useState<Benhnhan[]>([]);

  const [name, setName] = useState("");
  const [Ngaysinh, setNgaysinh] = useState<any>();
  const [Ngaysinh1, setNgaysinh1] = useState("");
  const [sdt, setSdt] = useState("");
  const [ho, setHo] = useState("");
  const [ten, setTen] = useState(String);
  const [gt, setGT] = useState("");
  const [diachi, setDiachi] = useState("");
  const [trieuchung, setTrieuchung] = useState("");

  const handleReceive = async () => {
    const response = await API_receivePatient(data.id);
    // setResponse(response.booking.errCode);
    refersh();
  };

  const handleOpenModal = async () => {
    //search thông tin đơn vị
    try {
      const params = {
        key: data.iddv,
      };
      const response = await searchhsdvID(params);
      const res2: PhongKham[] = response.User;

      setUserData(res2);
      res2.map(
        (res2) => (
          setId(res2.id),
          setFullname(res2.fullname),
          setName_clinic(res2.name_clinic)
        )
      );
    } catch (error) {
      console.log(error);
    }

    //search thông tin bệnh nhân
    try {
      const params1 = {
        id: data.idbn,
      };
      const response1 = await SearchId(params1);

      const res1: Benhnhan[] = response1.thongtinbenhnhans;

      setBenhnhan(res1);

      res1.map(
        (res1) => (
          setSdt(res1.Dienthoai),
          setGT(res1.Gioitinh),
          setName(res1.Ho + " " + res1.Ten),
          setHo(res1.Ho),
          setTen(res1.Ten),
          setNgaysinh(res1.Ngaysinh),
          setDiachi(res1.Diachi),
          setTrieuchung(res1.Trieuchung),
          setIdbn(res1.id)
        )
      );
    } catch (error) {
      console.log(error);
    }
    setShowModal(true);
  };

  const date = new Date(data.ngaysinh);
  const day = date.getDate();
  const month = date.getMonth() + 1; // từ 0 đến 11
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return (
    <div className="mb-5 shadow-md mx-3">
      <div className="h-auto bg-white rounded-lg">
        <div className="px-3 py-2 flex flex-col space-y-1">
          <p className="font-bold text-xl">
            {data.stt} | {data.hoten}
          </p>
          <p className="font-thin text-lg">
            {data.sdt} | {formattedDate} | {data.gioitinh}
          </p>
          <p className="font-thin text-lg">{data.diachi}</p>
          <div className="flex space-x-3 items-center">
            <p className="font-thin text-lg text-green-600 mr-2">
              {data.buoikham} - {data.stt}
            </p>
            <button
              className={`bg-green-700 text-white rounded-full h-8 w-24 ${
                data.active === 1 && `opacity-60`
              }`}
              onClick={handleReceive}
              disabled={data.active === 1}
            >
              {data.active === 1 ? "Đã nhận" : "Tiếp nhận"}
            </button>
            <button
              onClick={handleOpenModal}
              className="bg-blue-300 text-black rounded-full h-8 w-24"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
      <ModalUpdate
        data={data}
        id={data.id}
        iddv={id}
        idbenhnhan={data.idbn}
        fullname={fullname}
        name_clinic={name_clinic}
        onClose={() => setShowModal(false)}
        show={showModal}
      ></ModalUpdate>
    </div>
  );
};

export default Listbooking;
