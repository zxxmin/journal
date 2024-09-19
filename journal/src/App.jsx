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
    year: 2022,
    months: [
      {
        month: 1,
        goals: {
          shortTerm: ["친구 생일선물 고르기", "맨몸운동 일주일에 세번", "캠핑용품점 방문", '캠핑 용품 청소하기'],
          longTerm: ["캠핑 유투브 시작해보기"],
        },
        habits: [
          { name: "영양제 챙겨먹기", completedDays: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 20, 23, 24, 25] },
          { name: "저널 작성", completedDays: [1, 5, 7, 8, 9, 14, 17, 30] }
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
  },
  {
    year: 2023,
    months: [
      {
        month: 1,
        goals: {
          shortTerm: ["친구 생일파티 방문", "친구 생일선물", '새차하기'],
          longTerm: ["올해는 독서를 해보자", '새차도 꾸준히 해보자'],
        },
        habits: [],
        days: []
      },
      {
        month: 10,
        goals: {
          shortTerm: ['한입으로 잘라먹는 리액트 책 읽기', '생일파티 준비하기', '헬스장 일주일에 3번씩 가기'],
          longTerm: ['좋은 개발자 되기', '책을 많이 읽기']
        },
        habits: [
          {name:'리액트 공부', completedDays: [1, 2, 5, 10, 16, 20, 30]},
          {name:'독서', completedDays: [1, 3, 7, 15]}
        ],
        days: [
          {  
            date: "2023-10-01",
            todoList: [
              {task: '회의 참석', reason: '프로젝트 논의'},
              {task: '코드 리뷰', reason: '팀 피드백으로 성장'},
            ],
            journal: '오늘은 바쁜 하루였다.'
          },
          {
            date: "2023-10-02",
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
          shortTerm: ["크리스마스 준비", "연말 정리", '매일 명상하기'],
          longTerm: ["재정 관리", "새해 계획 세우기"],
        },
        habits: [
          { name: "명상", completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
          { name: "요리하기", completedDays: [2, 5, 12] }
        ],
        days: [
          {
            date: "2023-12-01",
            todoList: [
              { task: "연말 계획 세우기", reason: "내년 준비" },
              { task: "명상", reason: "마음의 평화" }
            ],
            journal: "오늘은 여유로운 하루였다.",
          },
          {
            date: "2023-12-05",
            todoList: [
              { task: "연말 계획 세우기", reason: "내년 준비" },
              { task: "명상", reason: "마음의 평화" }
            ],
            journal: "오늘은 공부를 열시히하였다.",
          },
          {
            date: "2023-12-20",
            todoList: [
              { task: "연말 계획 세우기", reason: "내년 준비" },
              { task: "명상", reason: "마음의 평화" }
            ],
            journal: "오늘은 비가내렸다.",
          },
          {
            date: "2023-12-25",
            todoList: [
              { task: "연말 계획 세우기", reason: "내년 준비" },
              { task: "명상", reason: "마음의 평화" }
            ],
            journal: "크리스마스 파티를 해서 너무 기분이 좋았다.",
          },

        ]
      }
    ]
  },
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
    case 'CREATE_GOALS': {
      const {year, month, goalList, goals} = action.data;

      return state.map(data => {
          if(data.year === year) {
            return {
              ...data,
              months: data.months.map(m => {
                if(m.month === month) {
                  return {
                    ...m,
                    goals: {
                      ...m.goals,
                      [goalList]: goals
                    }
                  }
                }
                return m
              })
            }
          }
          return data
        })
      }
    case 'CREATE_HABITS' : {
      const { year, month, habitNm, habitComplete } = action.data;

      return state.map(data => {
        if(data.year === year) {
          return {
            ...data,
            months: data.months.map(m => {
              if(m.month === month) {
                return {
                  ...m,
                  habits: [
                    ...m.habits,
                    {
                      name: habitNm,
                      completedDays: habitComplete
                    }
                  ]
                }
              }
              return m
            })
          }
        }
        return data
      })
    }
    case 'CREATE_REVIEW': {
      const { year, month, date, journal } = action.data;

      if(journal === undefined) {
        return state
      }
    
      return state.map(data => {
        if (data.year === year) {
          return {
            ...data,
            months: data.months.map(m => {
              if (m.month === month) {
                const dayExists = m.days.some(day => day.date === date);
    
                return {
                  ...m,
                  days: dayExists
                    ? m.days.map(day =>
                        day.date === date
                          ? { ...day, journal }
                          : day
                      )
                    : [...m.days, { date, journal }]
                };
              }
              return m;
            })
          };
        }
        return data;
      });
    }
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

    const defaultMonth = recentMonths.includes(currentMonth)
      ? currentMonth
      : recentMonths[recentMonths.length - 1]

    const currentYear = now.getFullYear()
    const recentYears = data.map(item => item.year)

    const defaultYear = recentYears.includes(currentYear)
      ? currentYear
      : recentYears[recentYears.length - 1]

    nav(`/${defaultYear}_${defaultMonth}`, { replace: true });
  }, [data])



  const onClickAdd = () => {
    const year = now.getFullYear();
    const month = now.getMonth()+1;

    dispatch({
      type: 'CREATE_MONTH',
      data: { year, month }
    });
  };

  const onClickDel = () => {
    alert('아직은 삭제할 수 없어요.')
    return;
  }

  const onClickGoalEdit = (year, month, goalList, goals) => {
    dispatch({
      type: 'CREATE_GOALS',
      data: { year, month, goalList, goals}
    })
  }

  const onClickHabitEdit = (year, month, habitNm, habitComplete) => {
    dispatch({
      type: 'CREATE_HABITS',
      data: { year, month, habitNm, habitComplete }
    })
  }

  const onClickReviewEdit = (year, month, date, journal) => {
    dispatch({
      type: 'CREATE_REVIEW',
      data: { year, month, date, journal }
    })
    console.log("dispatch called");
  }

  return (
    <>
    <JournalStateContext.Provider value={data}>
      <JournalDispatchContext.Provider
        value={{
          onClickAdd,
          onClickDel,
          onClickGoalEdit,
          onClickHabitEdit,
          onClickReviewEdit
        }}
      >
        <div className="Container">
          <Nav />
          
          <Routes>
            <Route path='/:month' element={<Month />} />
            <Route path='/days/:month' element={<Days />} />
            <Route path='/tasks/:day' element={<Tasks />} />
            <Route path='/word/:month' element={<Word />} />
          </Routes>
        </div>
      </JournalDispatchContext.Provider>
    </JournalStateContext.Provider>
    </>
  )
}

export default App
