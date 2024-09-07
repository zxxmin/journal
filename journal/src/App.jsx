import './App.css'
import './assets/css/style.scss'
import { useReducer, useRef } from 'react'
import { Routes, Route } from "react-router-dom"
import Month from "./pages/Month"
import MonthEdit from "./pages/Month_Edit"
import Days from "./pages/Days"
import Word from "./pages/Word"
import Task from "./pages/Task"
import Notfound from './pages/Notfound'

const mockData = [
  {
    month: 7,
    createDate: new Date().getTime(),
    goals: {
      'shotGoal': [ "리액트 프로젝트 끝내기", "소비습관 줄이기" ],
      'longGoal': [ "좋은 개발자가 되기", "부자되기" ],
      'hobbit': {
        '영양제 챙겨먹기': [1,2,3,4,5,6,7],
        '헬스장 가기' : [1,5,8,13],
      }
    },
    days: {
      1: {
        task: {
          'today': ["프로젝트 nav 페이지 완성_실력향상", "1일할일작성_이유작성"],
          'note': "오늘은 이랬고, 저랬고, 이래서 저랬다."
        },
      },
      2: {
        task: {
          'today': ["프로젝트 task 페이지 완성_실력향상", "2일할일작성_이유작성"],
          'note': "2일은 2일이다."
        },
      }
    },
  },
  {
    month: 8,
    createDate: new Date().getTime(),
    goals: {
      'shotGoal': [ "내 생일파티 하기", "소비습관 줄이기" ],
      'longGoal': [ "이직성공기원", "부자되기" ],
      'hobbit': {
        '영양제 챙겨먹기': [8,9,10,14,25,26,27],
        '헬스장 가기' : [16,19,24,30],
        '할머니한테 전화하기' : [1,3,5,7,9,11,13,15,17,19,21,23,25],
      }
    },
    days: {
      1: {
        task: {
          'today': ["프로젝트 nav 페이지 완성_실력향상", "1일할일작성_이유작성"],
          'note': "오늘은 이랬고, 저랬고, 이래서 저랬다."
        },
      },
      2: {
        task: {
          'today': ["프로젝트 task 페이지 완성_실력향상", "2일할일작성_이유작성"],
          'note': "2일은 2일이다."
        },
      }
    },
  },
]

function reducer(state, action) {
  switch(action.type) {
    case 'GOAL_CREATE':
      return [action.data, ...state];
    case 'GOAL_UPDATE':
      return state.map((item) =>
        String(item.month) === String(action.data.month)
          ? action.data
          : item
      );
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const monthRef = useRef(9)

  // 단기 목표 추가
  const onGoalCreate = (createDate, shotGoal, longGoal, hobbit) => {
    dispatch({
      type: "GOAL_CREATE",
      data: {
        month: monthRef.current++,
        createDate,
        goals: {
          shotGoal,
          longGoal,
          hobbit,
        }
      }
    })

  }

  // 단기 목표 수정
  const onGoalUpdate = (month, createDate, shotGoal, longGoal, hobbit) => {
    dispatch({
      type: "GOAL_UPDATE",
      data: {
        month,
        createDate,
        goals: {
          shotGoal,
          longGoal,
          hobbit,
        }
      }
    })
  }

  // 단기 목표 삭제
  const onGoalDelete = (month) => {
    dispatch({
      type: "GOAL_DELETE"
    })
  }

  // 장기 목표 추가

  // 장기 목표 수정

  // 장기 목표 삭제

  // hobbit 추가

  // hobbit 수정

  // hobbit 삭제

  // days 추가

  // days 수정

  // days 삭제


  return (
    <>
      <button
        onClick={() => 
          onGoalCreate(new Date().getTime(), ['9월 단기목표1', '9월 단기목표2'], [], {'9월 습관': [1,2,3,4]}
        )}
      >
        목표 추가 테스트
      </button>
      <button
        onClick={() => 
          onGoalUpdate(7, new Date().getTime(), ['7월 단기목표수정1', '7월 단기목표수정2'], ["7월장기목표추가"], {'7월 수정습관': [1,2,3,4]}
        )}
      >
        목표 수정 테스트
      </button>

      <Routes>
        <Route path="/" element={<Month />} />
        <Route path="/monthedit" element={<MonthEdit />} />
        <Route path="/days" element={<Days />} />
        <Route path="/word" element={<Word />} />
        <Route path="/task/:id" element={<Task />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
