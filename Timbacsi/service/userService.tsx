import fetch from "isomorphic-unfetch";
import axios from "axios";

export async function AllUser_API() {
  const response = await fetch("http://localhost:8080/api/get-all-users");
  const data = await response.json();
  return data;
}

export async function Search(
  params: { key: string },
  sdtBN: any
): Promise<any> {
  const { key } = params;
  const response = await axios.post(
    `http://localhost:8080/clinics/search?keyword=${key}`,
    {
      sdtBN: sdtBN,
    }
  );
  return response.data;
}

export async function API_getAllBookingbyDate(idBs: string, date_input: any) {
  const response = await axios.post(
    "http://localhost:8080/api/getAllBookingbyDate",
    { idBs: idBs, date: date_input }
  );
  return response.data;
}

export async function API_receivePatient(id: any) {
  const response = await axios.post(
    "http://localhost:8080/api/receivePatient",
    { id: id }
  );
  return response.data;
}

export async function API_appraisePhongKham(
  sdtBN: string,
  idBS: number,
  typeheart: string
) {
  const response = await axios.post("http://localhost:8080/api/appraise", {
    sdtbenhnhan: sdtBN,
    idBS: idBS,
    typeheart: typeheart,
  });
  return response.data;
}

export async function SearchPhone1(params: { key: string }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    // `http://localhost:8080/clinics/search?keyword=${key}`
    `http://localhost:8080/api/get-history?SDT=${key}`
  );
  const data = await response.json();
  return data;
}

export async function CreateAppointment(params: {
  iddv: number;
  // name_clinic: string;
  // fullname: string;
  // idbn: number;
  hoten: string;
  ngaysinh: Date;
  sdt: string;
  gt: string;
  diachi: string;
  trieuchung: string;
  stt: number;
  ngaydat: Date;
  buoikham: string;
  ngaykham: string;
  // time: string;
  // active: number;
}): Promise<any> {
  const response = await fetch(
    `http://localhost:8080/api/create-appoinment-booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
  const data = await response.json();
  return data;
}
export async function UpdateInf(params: {
  id: number;
  iddv: number;
  idbn: number;
  hoten: string;
  ngaysinh: Date;
  sdt: string;
  gioitinh: string;
  diachi: string;
  trieuchung: string;
  stt: number;
  ngaydat: Date;
  ngaydatUpdate: string;

  ngaykhamUpdate: string;

  // ngaydat: string;
  buoikham: string;
  ngaykham: string;
  time: string;
  // active: number;
}): Promise<any> {
  const response = await fetch(
    `http://localhost:8080/api/create-update-appoinment-booking`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
  const data = await response.json();
  return data;
}
export async function SearchId(params: { id: number }): Promise<any> {
  const { id } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-all-benhnhanId?keyword=${id}`
  );
  const data = await response.json();
  return data;
}
export async function SearchLichkham(params: { key: String }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-all-lichkhamSDT?keyword=${key}`
  );
  const data = await response.json();
  return data;
}
export async function SearchLichkhamID(params: { key: number }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-all-lichkhamID?keyword=${key}`
  );
  const data = await response.json();
  return data;
}
export async function SearchPhone(params: { key: string }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-all-benhnhan?keyword=${key}`
  );
  const data = await response.json();
  return data;
}
export async function searchhsdv(params: { key: string }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-users?keyword=${key}`
  );
  const data = await response.json();
  return data;
}

export async function searchhsdvID(params: { key: any }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-all-hosodv?keyword=${key}`
  );
  const data = await response.json();
  return data;
}
export async function searchBookingID(params: { key: number }): Promise<any> {
  const { key } = params;
  const response = await fetch(
    `http://localhost:8080/api/get-all-booking?keyword=${key}`
  );
  const data = await response.json();
  return data;
}
