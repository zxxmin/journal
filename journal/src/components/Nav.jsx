import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "./Button"
import './Nav.scss'
import { useReducer, useState, useEffect } from 'react';

const initMock = [
    {
        year: 2023,
        month: [11, 12]
    },
    {
        year: 2024,
        month: [1,2,3]
    }
]

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_MONTH': {
            const { year, month } = action.data;

            const yearExists = state.find(item => item.year === year);

            if (yearExists) {
                if (!yearExists.month.includes(month)) {
                    return state.map(item =>
                        item.year === year
                            ? { ...item, month: [...item.month, month].sort((a, b) => a - b) }
                            : item
                    );
                }
            } else {
                return [...state, { year, month: [month] }];
            }

            return state;
        }
        default:
            return state;
    }
}

const Nav = () => {
    const location = useLocation();
    const nav = useNavigate();

    const [data, dispatch] = useReducer(reducer, initMock)
    const [checkedYear, setCheckedYear] = useState(null);

    const onClickAdd = () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth()+1;

        dispatch({
            type: 'ADD_MONTH',
            data: {
                year: currentYear,
                month: currentMonth
            }
        })

        setCheckedYear(currentYear)
        nav(`/month/${currentMonth}`)

    }

    const onClickDel = () => {
        console.log(location.pathname.split('/').join('').slice(5))
        dispatch({
            type: 'DEL_MONTH',
        })
    }

    const buttons = [
        {type: "delete", action: onClickDel },
        {type: "add", action: onClickAdd },
    ]

    return (
        <section className="nav">
            <h2 className="title">TASKS</h2>

            <ul>
                {data.map((item) => (
                    <li key={item.year}>
                        <input
                            type="checkbox"
                            id={item.year}
                            checked={checkedYear === item.year}
                            onChange={() => setCheckedYear(item.year)}
                        />
                        <label htmlFor={item.year}>{item.year}</label>

                        <ul>
                            {item.month.map(month => (
                                <li key={month}>
                                    <Link
                                        to={`/month/${month}`}
                                        className={location.pathname === `/month/${month}` ? 'current month' : 'month'}
                                    >{month}
                                        월
                                    </Link>
                                    <Link
                                        to={`/days/${month}`}
                                        className={location.pathname === `/days/${month}` ? 'current' : ''}
                                    >
                                        days
                                    </Link>
                                    <Link
                                        to={`/word/${month}`}
                                        className={location.pathname === `/word/${month}` ? 'current' : ''}
                                    >
                                        word
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <div className="btn-cont">
                {buttons.map((button, i) => (
                    <Button
                        key={i}
                        type={button.type === 'add' ? 'POSITIVE' : ''}
                        text={button.type}
                        onClick={button.action}
                    />
                ))}
            </div>
        </section>
    )
}

export default Nav