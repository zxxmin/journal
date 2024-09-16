import './App.scss'
import { useEffect, useReducer, createContext } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom"
import Month from './pages/Month'
import Days from './pages/Days'
import Tasks from './pages/Tasks'
import Word from './pages/Word'
import Nav from './components/Nav'

const init = [
  {
    year: 2023,
    months: [
      {
        month: 11,
        goals: {
          shortTerm: ['한입으로 잘라먹는 리액트 책 읽기', '공부하기'],
          longTerm: ['헬스장 일주일에 3번씩 가기']
        },
        habits: [
          {name:'운동', completedDays: [1, 2, 5, 10]},
          {name:'독서', completedDays: [1, 3, 7, 15]}
        ],
        days: [
          {  
            date: "2023-11-01",
            todoList: [
              {task: '회의 참석', reason: '프로젝트 논의'},
              {task: '코드 리뷰', reason: '팀 피드백으로 성장'},
            ],
            journal: '오늘은 바쁜 하루였다.'
          },
          {
            date: "2023-11-02",
            todoList: [
              { task: "프로젝트 작업", reason: "기한 맞추기" },
              { task: "운동", reason: "건강 관리" }
            ],
            journal: "조금 피곤하지만 뿌듯한 하루였다.",
          }
        ]
      },
      {
        month: 12,
        goals: {
          shortTerm: ["크리스마스 준비", "연말 정리"],
          longTerm: ["재정 관리", "새해 계획 세우기"],
        },
        habits: [
          { name: "명상", completedDays: [1, 4, 10] },
          { name: "요리", completedDays: [2, 5, 12] }
        ],
        days: [
          {
            date: "2023-12-01",
            todoList: [
              { task: "연말 계획 세우기", reason: "내년 준비" },
              { task: "명상", reason: "마음의 평화" }
            ],
            journal: "오늘은 여유로운 하루였다.",
          }
        ]
      }
    ]
  },
  {
    year: 2024,
    months: [
      {
        month: 1,
        goals: {
          shortTerm: ["새해 목표 설정", "운동 계획 세우기"],
          longTerm: ["건강 관리", "새로운 취미 시작"],
        },
        habits: [
          { name: "운동", completedDays: [2, 3, 5] },
          { name: "저널 작성", completedDays: [1, 3, 6] }
        ],
        days: [
          {
            date: "2024-01-01",
            todoList: [
              { task: "운동 시작", reason: "새해 건강 목표" },
              { task: "책 읽기", reason: "지식 향상" }
            ],
            journal: "새해 첫날을 활기차게 시작했다.",
          }
        ]
      },
    ]
  }
]


const reducer = (state, action) => {
  switch(action.type) {
    case 'CREATE_MONTH' : {
        const {year, month} = action.data
        
        const yearExists = state.find(data => data.year === year);

        if (yearExists) {
          // 연도가 존재하면, 해당 연도에 월을 추가
          return state.map(data => {
            if (data.year === year) {
              // 월이 이미 존재하는지 확인
              const monthExists = data.months.find(m => m.month === month);
              
              if (monthExists) {
                // 월이 이미 존재하면 아무 것도 하지 않음
                return data;
              } else {
                // 월이 존재하지 않으면 새로운 월 추가
                return {
                  ...data,
                  months: [
                    ...data.months,
                    { month, goals: { shortTerm: [], longTerm: [] }, habits: [], days: [] }
                  ]
                };
              }
            } else {
              return data;
            }
          });
        } else {
          // 연도가 존재하지 않으면 새로운 연도와 월 추가
          return [
            ...state,
            {
              year,
              months: [
                { month, goals: { shortTerm: [], longTerm: [] }, habits: [], days: [] }
              ]
            }
          ];
        }
      }
    case 'CREATE_SHORT_GOAL': 
      break;
    default :
      return state;
  }
}

export const JournalStateContext = createContext();
export const JournalDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, init)
  const nav = useNavigate();
  const now = new Date();

  useEffect(() => {
    const currentMonth = now.getMonth()+1
    const recentMonths = data.flatMap(item =>
      item.months.map(monthData => monthData.month)
    );

    console.log(currentMonth)
    console.log(recentMonths)

    const defaultMonth = recentMonths.includes(currentMonth)
      ? currentMonth
      : recentMonths[recentMonths.length - 1]

    nav(`/${defaultMonth}`, { replace: true });
  }, [data])


  const onClickbtn = (year, month, shortList) => {
    dispatch({
      type: 'CREATE_SHORT_GOAL',
      data: { year, month, shortList }
    });
  };

  const onClickAdd = () => {
    const year = now.getFullYear();
    const month = now.getMonth()+1;

    dispatch({
      type: 'CREATE_MONTH',
      data: { year, month }
    });
  };

  console.log(data)

  return (
    <>
    <JournalStateContext.Provider value={data}>
      <JournalDispatchContext.Provider
        value={{
          dispatch,
          onClickAdd,
        }}
      >
        <div className="Container">
          <Nav />
          
          <Routes>
            <Route path='/:month' element={<Month />} />
            <Route path='/days/:month' element={<Days />} />
            <Route path='/tasks/:id' element={<Tasks />} />
            <Route path='/word/:month' element={<Word />} />
          </Routes>
        </div>
      </JournalDispatchContext.Provider>
    </JournalStateContext.Provider>
    </>
  )
}

export default App
