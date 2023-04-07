import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  usePostSmsmodifyMutation,
  usePostSmssendMutation,
  usePostUserfindpasswordMutation,
} from "../../Store/NonAuthApi";
import Footer from "../Common/Footer";
import IntroNavbar from "../Intro/IntroNavbar";
type smsmodify = {
  modifyNumber: string;
  phoneNumber: string;
  purpose: string;
};

type smssend = {
  to: string;
  role: string;
};

type find = {
  modifyNum: string;
  newPassword: string;
  phoneNum: string;
  username: string;
};
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [Id, setId] = useState<string>("");
  const [Phonenum, setPhonenum] = useState<string>("");
  const [Authnum, setAuthnum] = useState<string>();

  const [newAuthnum, setnewAuthnum] = useState<string>();

  // 안보이게
  const [AmIHidden, setAmIHidden] = useState("hidden");

  // 버튼 비활성화
  const [Disalbe, setDisalbe] = useState(true);

  // 유효성
  const [IsAuthnum, setIsAuthnum] = useState<boolean>(false);

  // Store
  const [postSmsmodify, loading1] = usePostSmsmodifyMutation();
  const [postSmssend, loading2] = usePostSmssendMutation();
  const [postUserfindpassword, loading3] = usePostUserfindpasswordMutation();

  // input 변경
  const ChangeId = (event: any): void => {
    setId(event.target.value);
  };
  const ChangePhonenum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    //console.log(event.target.value);
    setPhonenum(event.target.value);
  };
  const ChangeAuthnum = (event: React.ChangeEvent<HTMLInputElement>): void => {
    // console.log(event.target.value);
    const temp: string = event.target.value;
    setAuthnum(temp);
  };

  // 숫자 체크
  function checkNum(str: string) {
    // const regExp = /[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;
    const regExp = /[^0-9]/g;

    if (regExp.test(str)) {
      return true;
    } else {
      return false;
    }
  }

  const CheckAuthnum = (): void => {
    const data: smsmodify = {
      modifyNumber: Authnum!,
      phoneNumber: Phonenum,
      purpose: "findPassword",
    };
    // //console.log("인증번호 보내기!", data);

    postSmsmodify(data)
      .unwrap()
      .then((r: any) => {
        //console.log(r);
        if (r.data == false) {
          // console.log("인증번호 에러");
          setDisalbe(true);
        } else {
          toast.success(`인증되었습니다`);
          setnewAuthnum(r.data);
          setDisalbe(false);
        }
      });
  };

  // 휴대폰번호가 유효한지 체크
  const PhoneCheck = (): any => {
    // SendAuthnum(Phonenum);
    if (Phonenum.length === 11) {
      if (checkNum(Phonenum) === false) {
        // 인증번호 보여주고
        //console.log("폰번호확인", Phonenum);
        const data: smssend = {
          to: Phonenum,
          role: "else",
        };
        //console.log("보낼데이터", data);

        postSmssend(data)
          .unwrap()
          .then((r: any) => {
            //console.log("받는데이터", r.data.statusCode);
            if (r.data.statusCode === "202") {
              toast.success("전송하였습니다!");
              setAmIHidden("");
              setAuthnum("");
              setIsAuthnum(false);
              // 인증번호 닫고
              setTimeout(() => {
                setAmIHidden("hidden");
              }, 180000);
            }
          })
          .catch((e) => {
            // console.log(e);
          });
      } else {
        // 전화번호 border 변경
        toast.error("번호 형식을 지켜주세요");

      }
    } else {
      // 전화번호 border변경
      toast.error("번호 형식을 지켜주세요");

    }
  };

  const Cancel = () => {
    navigate("/login");
  };

  const FindButton = () => {
    const data: find = {
      modifyNum: newAuthnum!,
      newPassword: "",
      phoneNum: Phonenum,
      username: Id,
    };
    //console.log("프론트에서 보내는거", data);
    navigate("/resetpassword", {
      state: {
        modifyNum: newAuthnum!,
        newPassword: "",
        phoneNum: Phonenum,
        username: Id,
      },
    });
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-between h-[100vh] ">
        <IntroNavbar />
        <div className="container max-w-screen-lg w-full mx-auto flex flex-col pb-10">
        <div className="flex flex-col items-center mx-5 sm:mx-5  sm:[10%] md:mx-[25%] lg:mx-[10%] space-y-2">
            <div className="font-extrabold text-[#A87E6E] text-4xl lg:text-6xl">
              홍민정음
            </div>
            <div className="text-[#BD9789] font-extrabold text-[20px] leading-7 md:text-[24px] md:leading-8">
              비밀번호 찾기
            </div>
          </div>
          <div className=" flex flex-col max-w-[100%] justify-center mt-[1.5rem] mx-4 md:mx-[25%] lg:mx-[30%]">
            <div className="w-full space-y-5">
              <div >
                <div className="text-[#A87C6E] font-extrabold text-base pb-2">
                  계정
                </div>
                <input
                  type="text"
                  className="min-w-[100%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                  placeholder="계정 입력"
                  onChange={ChangeId}
                />
              </div>
              <div className={`my-2 `}>
                <div className="text-[#A87C6E] font-extrabold text-base pb-2">
                  전화번호
                </div>
                <div className="flex flex-row justify-between">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangePhonenum}
                    placeholder={`전화번호 입력  "- 생략" `}
                  />
                  <div
                    className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] hover:bg-[#A87E6E]  text-[#FFFFFF] transition-all duration-300   rounded-lg font-medium cursor-pointer"
                    onClick={PhoneCheck}
                  >
                    인증하기
                  </div>
                </div>
              </div>
              <div className={`my-2 ${AmIHidden}`}>
                <div className="text-[#A87C6E] font-extrabold text-base">
                  인증번호
                </div>
                <div className="flex flex-row justify-between ">
                  <input
                    type="text"
                    className="min-w-[70%] px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] border-[#A87E6E] rounded-lg font-medium placeholder:font-normal"
                    onChange={ChangeAuthnum}
                  />
                  <button
                    className="px-3 py-1 md:px-4 md:py-2 border-2 focus:outline-none focus:border-[#d2860c] bg-[#BF9F91] text-[#FFFFFF]  rounded-lg font-medium"
                    onClick={() => {
                      CheckAuthnum();
                    }}
                    disabled={IsAuthnum}
                  >
                    &nbsp; &nbsp;확인&nbsp; &nbsp;
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between w-full">
              <button
                className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] hover:bg-[#A87E6E] text-[#A87E6E] hover:text-white transition-all duration-300 disabled:cursor-not-allowed"
                disabled={Disalbe}
                onClick={FindButton}
              >
                <div className="flex justify-center items-center ">
                  <div>비밀번호 찾기</div>
                </div>
              </button>
              <button
                className="mt-7 cursor-pointer w-[45%] h-[3.5rem] rounded-lg font-extrabold bg-[#F0ECE9] hover:bg-[#A87E6E] text-[#A87E6E] hover:text-white transition-all duration-300 disabled:cursor-not-allowed"
                onClick={Cancel}
              >
                <div className="flex justify-center items-center ">
                  <div>취소</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ForgetPassword;
