import vi from "date-fns/locale/vi"; // the locale you want
import { useCallback, useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import benhnhanApi from "./api/benhnhanApi";
import { createGiokham, hideModal } from "./redux/actions";
import {
  giokhamState$,
  modalState$,
  phongkhamInfoState$,
} from "./redux/selectors";
registerLocale("vi", vi);
export default function DatLichModal() {
  const [data, setData] = useState({
    title: "",
    content: "",
    attachment: "",
  });
  //todo Date
  const [ngaysinh, setNgaysinh] = useState(new Date());
  const [ngaydat, setNgaydat] = useState(new Date());
  //todo Modal show/hide
  const dispatch = useDispatch();
  const { isShow } = useSelector(modalState$);
  const phongkham_info = useSelector(phongkhamInfoState$);
  const onClose = useCallback(() => {
    dispatch(hideModal());
    setData({
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  //todo format ngay
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };
  //todo Data Modal
  const [msbn, setMsbn] = useState("");
  const [dienthoai, setDienthoai] = useState("");
  const [hoten, setHoten] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [diachi, setDiachi] = useState("");
  const [trieuchung, setTrieuchung] = useState("");

  //time
  const [giokhamsang, setGiokhamsang] = useState("");
  const [giokhamtrua, setGiokhamtrua] = useState("");
  const [giokhamchieu, setGiokhamchieu] = useState("");
  //soluong
  const [soluongsang, setSoluongsang] = useState(0);
  const [soluongtrua, setSoluongtrua] = useState(0);
  const [soluongchieu, setSoluongchieu] = useState(0);

  const [mabuoiselect, setMabuoiselect] = useState("");
  const [giokhamselect, setGiokhamselect] = useState("");
  const [danhsachbenhnhan, setDanhsachbenhnhan] = useState([]);
  const [danhsachbenhnhan_hidden, setDanhsachbenhnhan_hidden] =
    useState("hidden");

  //todo tim kiem danh sach benh nhan
  const searchbenhnhanHandle = async (e) => {
    setDanhsachbenhnhan_hidden("hidden");
    setDienthoai(e.target.value);
    if (e.target.value.length > 9 && e.target.value.length < 12) {
      try {
        const params = {
          sdt: e.target.value,
        };
        const response = await benhnhanApi.getbenhnhan(params);
        const data_benhnhan = response.data;
        switch (data_benhnhan.length) {
          case 0:
            setDanhsachbenhnhan_hidden("");
            break;
          case 1:
            setMsbn(data_benhnhan[0].msbn);
            setHoten(data_benhnhan[0].hoten);
            setNgaysinh(new Date(data_benhnhan[0].ngaysinh));
            setGioitinh(data_benhnhan[0].gioitinh);
            setDiachi(data_benhnhan[0].diachi);
            break;

          default:
            setDanhsachbenhnhan(data_benhnhan);
            setDanhsachbenhnhan_hidden("");
            break;
        }
      } catch (error) {}
    }
  };
  const select_benhnhanHandle = (dsbn) => {
    setMsbn(dsbn.msbn);
    setHoten(dsbn.hoten);
    setNgaysinh(new Date(dsbn.ngaysinh));
    setGioitinh(dsbn.gioitinh.toUpperCase());
    setDiachi(dsbn.diachi);
    setDanhsachbenhnhan_hidden("hidden");
  };

  //todo Gio kham benh
  const giokham = useSelector(giokhamState$);
  useEffect(() => {
    const getkhunggio = () => {
      setGiokhamsang("");
      setGiokhamtrua("");
      setGiokhamchieu("");
      try {
        if (giokham.khunggio_sa != "") {
          setGiokhamsang(
            giokham.khunggio_sa[0].sangtu +
              " - " +
              giokham.khunggio_sa[0].sangden
          );
          setSoluongsang(
            giokham.soluong_sa + "/" + giokham.khunggio_sa[0].soluongsang
          );
        }
        if (giokham.khunggio_tr != "") {
          setGiokhamtrua(
            giokham.khunggio_tr[0].truatu +
              " - " +
              giokham.khunggio_tr[0].truaden
          );
          setSoluongtrua(
            giokham.soluong_tr + "/" + giokham.khunggio_tr[0].soluongtrua
          );
        }
        if (giokham.khunggio_ch != "") {
          setGiokhamchieu(
            giokham.khunggio_ch[0].chieutu +
              " - " +
              giokham.khunggio_ch[0].chieuden
          );
          setSoluongchieu(
            giokham.soluong_ch + "/" + giokham.khunggio_ch[0].soluongchieu
          );
        }
      } catch (error) {}
    };
    getkhunggio();
  }, [giokham]);
  const change_date = (e) => {
    setMabuoiselect("");
    setNgaydat(e);
    const data_giokham = {
      msdv: phongkham_info.msdv,
      ngay: formatDate(e),
    };
    dispatch(createGiokham.createGiokhamRequest(data_giokham));
  };
  return (
    <>
      {isShow ? (
        <div
          data-te-modal-init
          className="bg-[#000000b5] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[1000] outline-none focus:outline-none"
          id="staticBackdrop"
          data-te-backdrop="static"
          data-te-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div
            data-te-modal-dialog-ref
            className="modal-dialog relative pointer-events-none w-[500px]"
          >
            <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <div>
                  <h5 className="text-red-600 font-bold text-xl">
                    {phongkham_info.tendv}
                  </h5>
                  <h5 className="text-green-900 font-bold text-md">
                    {phongkham_info.tendaidien}
                  </h5>
                </div>
                <button
                  onClick={onClose}
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div data-te-modal-body-ref className="relative p-4">
                {/* Group Info */}
                <div className="group_info grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Điện thoại</p>
                  </div>
                  <div className="col-span-9">
                    <input
                      value={dienthoai}
                      onChange={searchbenhnhanHandle}
                      type="text"
                      className="form-control"
                    />
                    <ul
                      className={"danhsachbenhnhan " + danhsachbenhnhan_hidden}
                    >
                      {danhsachbenhnhan.map((dsbn, key) => (
                        <li
                          onClick={(e) => select_benhnhanHandle(dsbn)}
                          tabIndex={key}
                          key={key}
                        >
                          {dsbn.hoten}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Họ tên</p>
                  </div>
                  <div className="col-span-9">
                    <input
                      className="form-control"
                      value={hoten}
                      onChange={(e) => setHoten(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Ngày sinh</p>
                  </div>
                  <div className="col-span-9">
                    <DatePicker
                      onChange={(date) => setNgaysinh(date)}
                      id="ngay"
                      dateFormat="dd/MM/yyyy"
                      locale="vi"
                      className="form-control"
                      selected={ngaysinh}
                    />
                  </div>
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Giới tính</p>
                  </div>
                  <div className="col-span-9">
                    <div className="flex justify-start items-center">
                      <div className="item flex items-center">
                        <input
                          className="w-[20px] h-[20px] mr-2 mt-[2px]"
                          checked={gioitinh == "NAM"}
                          onChange={(e) => setGioitinh(e.target.value)}
                          type="radio"
                          name="inlineRadioOptions"
                          id="gioitinh_label"
                          value="NAM"
                        />
                        <label className="mt-[5px]" htmlFor="gioitinh_label">
                          Nam
                        </label>
                      </div>
                      <div className="item flex items-center">
                        <input
                          className="w-[20px] h-[20px] ml-8 mr-2 mt-[2px]"
                          checked={gioitinh == "NỮ"}
                          onChange={(e) => setGioitinh(e.target.value)}
                          type="radio"
                          name="inlineRadioOptions"
                          id="gioitinh_label"
                          value="NỮ"
                        />
                        <label className="mt-[5px]" htmlFor="gioitinh_label">
                          Nữ
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Địa chỉ</p>
                  </div>
                  <div className="col-span-9">
                    <input
                      className="form-control"
                      value={diachi}
                      onChange={(e) => setDiachi(e.target.value)}
                      type="text"
                    />
                  </div>
                </div>

                {/* Group ngày đặt */}
                <div className="group_ngaygio grid grid-cols-12 gap-4">
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Triệu chứng</p>
                  </div>
                  <div className="col-span-9">
                    <input
                      className="form-control"
                      value={trieuchung}
                      onChange={(e) => setTrieuchung(e.target.value)}
                      type="text"
                    />
                  </div>
                  <div className="col-span-3">
                    <p className="text-md text-right mt-1">Ngày khám</p>
                  </div>
                  <div className="col-span-9">
                    <DatePicker
                      onChange={(date) => change_date(date)}
                      id="ngay"
                      dateFormat="dd/MM/yyyy"
                      locale="vi"
                      minDate={new Date()}
                      className="form-control font-roboto_medium focus:shadow-none"
                      selected={ngaydat}
                    />
                  </div>
                  <div className="col-span-3">
                    <p></p>
                  </div>
                  <div className="col-span-9">
                    <ul className="khunggio_ul">
                      <li
                        onClick={(e) => setMabuoiselect("SA")}
                        className={
                          "flex items-end justify-between rounded-[14px] my-1 text-black py-[6px] px-4 hover:cursor-pointer " +
                          (giokhamsang ? "" : "hidden ") +
                          (mabuoiselect == "SA"
                            ? "bg-[#059817] text-white"
                            : "bg-[#e9e9e9]")
                        }
                      >
                        <div className="time_div">
                          <p>Sáng</p>
                          <p>{giokhamsang}</p>
                        </div>
                        <p>{soluongsang}</p>
                      </li>
                      <li
                        onClick={(e) => setMabuoiselect("TR")}
                        className={
                          "flex items-end justify-between rounded-[14px] my-1 text-black py-[6px] px-4 hover:cursor-pointer " +
                          (giokhamtrua ? "" : " hidden ") +
                          (mabuoiselect == "TR"
                            ? "bg-[#059817] text-white"
                            : "bg-[#e9e9e9]")
                        }
                      >
                        <div className="flex">
                          <p className="w-14">Trưa</p>
                          <p>{giokhamtrua}</p>
                        </div>
                        <p>{soluongtrua}</p>
                      </li>
                      <li
                        onClick={(e) => setMabuoiselect("CH")}
                        className={
                          "flex items-end justify-between rounded-[14px] my-1 text-black py-[6px] px-4 hover:cursor-pointer " +
                          (giokhamchieu ? "" : "hidden ") +
                          (mabuoiselect == "CH"
                            ? "bg-[#059817] text-white"
                            : "bg-[#e9e9e9]")
                        }
                      >
                        <div className="flex">
                          <p className="w-14">Chiều</p>
                          <p>{giokhamchieu}</p>
                        </div>
                        <p>{soluongchieu}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Đặt lịch
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
