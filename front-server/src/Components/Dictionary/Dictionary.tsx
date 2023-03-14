import React, { useEffect, useState } from "react";
import Footer from "../Common/Footer";
import Navbar from "../Common/Navbar";
import ReactPaginate from "react-paginate";

interface test {
  word_id: string;
  word_name: string;
  word_iso: string;
  word_type: string;
  word_rating: string;
  word_class: string;
  word_origin: string;
  word_detail: string;
  word_example: string;
  word_relation: string;
}

const DictionaryPage = () => {
  const [Words, setWords] = useState<test[]>(); // 백엔드와 통신하여 모든 데이터를 setLists 에 저장해서 사용
  const [limit, setLimit] = useState(10); // 한 페이지에 보여줄 데이터의 개수
  const [page, setPage] = useState(1); // 페이지 초기 값은 1페이지
  const [counts, setCounts] = useState(0); // 데이터의 총 개수를 setCounts 에 저장해서 사용
  const [blockNum, setBlockNum] = useState(0); // 한 페이지에 보여 줄 페이지네이션의 개수를 block으로 지정하는 state. 초기 값은 0
  const offset = (page - 1) * limit;

  var eee: test[] = [];
  for (let i = 0; i < 100000; i++) {
    eee.push({
      word_class: "test_word_class",
      word_detail:
        "시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2시와 시, 시와 군 사이의 경계.2",
      word_example: "test_word_example",
      word_id: "test_word_id",
      word_iso: "test_word_iso",
      word_name: `시계${i}`,
      word_origin: `市界${i}`,
      word_rating: "test_word_rating",
      word_relation: "test_word_relation",
      word_type: `명사${i}`,
    });
  }
  useEffect(() => {
    setWords(eee);
    setLimit(5);
    setCounts(eee.length);
    return () => {};
  }, []);

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <Navbar />
        <Search />
        {Words ? (
          <>
            <List word={eee} limit={limit} offset={offset} />
          </>
        ) : null}
        {/* <PaginationList
          total={eee.length}
          limit={limit}
          page={page}
          setPage={setPage}
        /> */}
        <ListPagination
          limit={limit}
          page={page}
          setPage={setPage}
          blockNum={blockNum}
          setBlockNum={setBlockNum}
          counts={counts}
        />
        <Footer />
      </div>
    </>
  );
};

function Search(): JSX.Element {
  const [first, setfirst] = useState("second");
  return (
    <>
      <div className="flex flex-row justify-between items-baseline container max-w-screen-lg w-full mx-auto px-10 lg:px-0">
        <div className=" text-[#A87E6E] font-extrabold text-3xl sm:text-3xl md:text-5xl lg:text-6xl">
          사전[辭典]
        </div>
        <input
          value={first}
          type="text"
          className="border-[#A87E6E] lg:h-[60%] w-[40%] sm:w-[40%] md:w-[40%] lg:w-[40%] border-2 rounded-md py-2 px-5 text-xl sm:text-xl md:text-2xl lg:text-2xl font-medium placeholder:font-normal"
          placeholder="검색"
        />
      </div>
    </>
  );
}

const List = ({
  word,
  offset,
  limit,
}: {
  word: test[];
  offset: number;
  limit: number;
}): JSX.Element => {
  return (
    <>
      <div className="flex flex-col container max-w-screen-lg w-full mx-auto px-10 lg:px-0">
        {word.slice(offset, offset + limit).map(function (word, i) {
          return (
            <div className="py-2">
              <div className="flex flex-row items-baseline">
                <div
                  className="text-[#0078CE] text-2xl underline cursor-pointer"
                  onClick={() => {
                    console.log(`${word.word_name}이라는 데이터야`);
                  }}
                >
                  {word.word_name}
                </div>
                <div className="px-3">[ {word.word_origin} ]</div>
                <div>{word.word_type}</div>
              </div>
              <div className="truncate">{word.word_detail}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ListPagination = ({
  limit,
  page,
  setPage,
  blockNum,
  setBlockNum,
  counts,
}: {
  limit: number;
  page: number;
  setPage: Function;
  blockNum: number;
  setBlockNum: Function;
  counts: number;
}): JSX.Element => {
  const createArr = (n: number) => {
    const iArr: number[] = new Array(n);
    for (let i = 0; i < n; i++) iArr[i] = i + 1;
    return iArr;
  }; // 새로운 배열을 만들기 위한 함수

  const pageLimit = 10; // 보여줄 페이지네이션 개수

  const totalPage: number = Math.ceil(counts / limit); //총 데이터의 개수(counts)를 한 페이지의 보여줄 데이터(limit)로 나눠 올림을 하면 전체 페이지의 개수가 나온다.

  const blockArea: number = Number(blockNum * pageLimit); // 화면 전환 할 때 보여줄 페이지네이션 개수를 구역으로 지정한다.
  const nArr = createArr(Number(totalPage)); // nArr 함수에 전체 페이지의 개수를 배열로 담는다.
  let pArr = nArr?.slice(blockArea, Number(pageLimit) + blockArea); // 페이지네이션 구역을 nArr 함수에 slice하여 원하는 페이지네이션 block 만 보여 줄 수 있게 설정

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
  };

  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit) - 1);
  };

  const prevPage = () => {
    if (page <= 1) {
      return;
    } // page가 1보다 작거나 같으면 아무 것도 리턴하지 않는다.
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n: number) => n - 1);
    } // 현재 페이지 - 1 이 보여줄 페이지네이션 개수(pageLimit) * blockNum 보다 작거나 같으면 setBlockNum에 - 1 을 작동시킨다.
    setPage((n: number) => n - 1); // setPage를 현재 페이지에서 -1 로 이동시킨다.
  };

  const nextPage = () => {
    if (page >= totalPage) {
      return;
    } // page가 마지막 페이지보다 크거나 같으면 아무 것도 리턴하지 않는다.
    if (pageLimit * Number(blockNum + 1) < Number(page + 1)) {
      setBlockNum((n: number) => n + 1);
    } //보여줄 페이지네이션 개수(pageLimit) * (blockNum+1) 가 page + 1보다 작다면 setBlockNum은 현재 페이지 + 1을 한다.
    setPage((n: number) => n + 1); //setPage에 현재 페이지 + 1을 한다.
  };
  const ariaState =
    "aria-[current]:bg-pink-800 aria-[current]:font-extrabold aria-[current]:pointer-events-auto hover:-translate-y-2 hover:cursor-pointer hover:bg-orange-600 disabled:bg-slate-600 disabled:cursor-none disabled:translate-y-0 px-3 m-2 rounded-[3rem]";
  return (
    <div className="ListPagenationWrapper flex flex-row justify-center">
      <button
        className={`moveToFirstPage ${ariaState}`}
        onClick={() => {
          firstPage();
        }}
      >
        &lt;&lt;
      </button>
      <button
        className={`moveToPreviousPage ${ariaState}`}
        onClick={() => {
          prevPage();
        }}
        disabled={page === 1}
      >
        &lt;
      </button>
      <div className="pageBtnWrapper">
        {pArr.map((n: number) => (
          <button
            className={`pageBtn ${ariaState}`}
            key={n}
            onClick={() => {
              setPage(n);
            }}
            aria-current={page === n ? "page" : undefined}
          >
            {n}
          </button>
        ))}
      </div>
      <button
        className={`moveToNextPage ${ariaState}`}
        onClick={() => {
          nextPage();
        }}
        disabled={page === totalPage}
      >
        &gt;
      </button>
      <button
        className={`moveToLastPage ${ariaState}`}
        onClick={() => {
          lastPage();
        }}
      >
        &gt;&gt;
      </button>

      {/* <style jsx>
        {`
          .ListPagenationWrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 37px;
            margin: 38px 94px 38px 88px;
          }

          .moveToPreviousPage,
          .moveToNextPage {
            color: #5a5a5a;
            background-color: transparent;
            border: none;
            font-size: 25px;
            cursor: pointer;
          }

          .moveToFirstPage,
          .moveToLastPage {
            width: 115px;
            height: 37px;
            margin: 0 0 0 0;
            border: none;
            color: black;
            background-color: transparent;
            cursor: pointer;
          }

          .pageBtn {
            width: 49px;
            height: 49px;
            margin: 0 10px;
            border: none;
            color: black;
            font-size: 20px;
            opacity: 0.2;

            &:hover {
              background-color: #b42954;
              cursor: pointer;
              transform: translateY(-2px);
            }

            &[disbled] {
              background-color: #e2e2e2;
              cursor: revert;
              transform: revert;
            }

            &[aria-current] {
              background-color: #f5d3dd;
              font-weight: bold;
              cursor: revert;
              transform: revert;
              opacity: 1;
            }
          }
        `}
      </style> */}
    </div>
  );
};

export default DictionaryPage;
