import React, { useState } from "react";
import { Props } from "react-intl/src/components/message";
import { firebase, auth } from "./Firebase-config";
import { getParseTreeNode } from "typescript";
import { useRouter } from "next/router";
import lichsu from './lichsu'
import { render } from "react-dom";
import App from "next/app";
import Router from "next/router";

// type Props = {
//   sdt: String;
// };

function SignInOTP() {

  // const SignInOTP = ({sdt}: Props) => {
  // const SignInOTP = (this.props.phoneNumber) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sdt, setSdt] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("INPUT_PHONE_NUMBER");
  const [result, setResult] = useState<any>()
  console.log("sdt1", phoneNumber)

  const formatSDT = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setSdt(e.target.value)
    if (e.target.value === "") return;
    let temp: any
    try {
      temp =e.target.value?.slice(1, 10)
      setPhoneNumber("+84"+temp)
      console.log("temp", temp)
    } catch (error) {
      console.log(error);
    }   
  };

  const signin = () => {
    // if (sdt === "") return;
    // let temp: any
    // try {
    //   temp =sdt?.slice(1, 10)
    //   setPhoneNumber("+84"+temp)
  
    // } catch (error) {
    //   console.log(error);
    // }   

    console.log("sdt", sdt)
    console.log("phoneNumber", phoneNumber)


    // if (sdt === " ") return;
    if (phoneNumber === "") return;
    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible",
    });

    auth
      .signInWithPhoneNumber(phoneNumber, verify)
      .then((result: any) => {
        setResult(result);
        setStep("VERIFY_OTP");
      })
      .catch((err: any) => {
        alert(err);
      });
  };

  const router = useRouter();

  const ValidateOtp = (phoneNumber: string) => {
    if (otp === null) return;

    result
      .confirm(otp)
      .then((result: any) => {
        setStep("VERIFY_SUCCESS");
        router.push({
          pathname: '/lichsu',
          query: { phoneNumber: phoneNumber },
        })
      })
      .catch((err: any) => {
        alert("Incorrect code");
      });
    // if (step === "VERIFY_SUCCESS") {

    // }
  };

  // const handleSuccess = (phoneNumber: string) => {
  //   console.log("sdt", phoneNumber)

  //   // router.push("/lichsu");
  //   router.push({
  //     pathname: '/lichsu',
  //     query: { phoneNumber: phoneNumber },
  //   })
  // }

  return (
    <div style={{ marginTop: 100 }}>
      <center>

        {step === "INPUT_PHONE_NUMBER" && (
          <div className="form bg-gray-100 w-80 h-48">
            <h1 className="pt-2">Vui lòng đăng nhập</h1>
            <div className="mb-4">
              <input
                value={sdt}
                // onChange={(e) => {
                //   setSdt(e.target.value);
                // }}
                onChange={formatSDT}
                placeholder="Số điện thoại"
                className=" h-10 w-60 mt-4 border-gray-400 bg-gray-100 border-solid  border-b-2"
              />
              <br />
              <br />
              <div id="recaptcha-container"></div>
              <button
                onClick={signin}
                className="bg-green-700 w-60 h-10 rounded-3xl font-semibold text-white hover:bg-indigo-700"
              >
                Send OTP
              </button>
              <div>
                <button onClick={() => Router.back()} className="text-right pt-3 ">Trở về</button>
              </div>
            </div>
          </div>
        )}

        {step === "VERIFY_OTP" && (
          <div className="form bg-gray-100 w-80 h-48">
            <h1 className="pt-2">Vui lòng đăng nhập</h1>
            <input
              type="text"
              placeholder={"Enter your OTP"}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
              className="h-10 w-60 mt-4 border-gray-400 border-solid bg-gray-100 border-b-2"
            />
            <br />
            <br />
            <button
              className="bg-green-700 w-60 h-10 rounded-3xl font-semibold text-white hover:bg-indigo-700"
              onClick={() => ValidateOtp(phoneNumber)}
            >
              Đăng nhập
            </button>
            <div>
              <button onClick={() => Router.back()} className="text-right pt-3">Trở về</button>

            </div>
          </div>
        )}

        {/* {step === "VERIFY_SUCCESS" && handleSuccess(phoneNumber)} */}


        {step === "VERIFY_FAIL" && <h3>Verify Fail</h3>}

        {/* {step === 'VERIFY_SUCCESS' ?
handleSuccess()
: <h3>Verify Fail</h3>
} */}
      </center>
    </div>
  );
};

export default SignInOTP;