import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import Button from "./Button"
import './Nav.scss'
import { JournalStateContext, JournalDispatchContext } from "../App";


const Nav = () => {
    const data = useContext(JournalStateContext)
    const { onClickAdd } = useContext(JournalDispatchContext)
    const [checkedYear, setCheckedYear] = useState(null);
    const location = useLocation();
    // const nav = useNavigate();





    const buttons = [
        {type: "delete" },
        {type: "add" },
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
                            {item.months.map(months => (
                                <li key={months.month}>
                                    <Link
                                        to={`/${months.month}`}
                                        className={location.pathname === `/${months.month}` ? 'current month' : 'month'}
                                    >{months.month}
                                        월
                                    </Link>
                                    <Link
                                        to={`/days/${months.month}`}
                                        className={location.pathname === `/days/${months.month}` ? 'current' : ''}
                                    >
                                        days
                                    </Link>
                                    <Link
                                        to={`/word/${months.month}`}
                                        className={location.pathname === `/word/${months.month}` ? 'current' : ''}
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
                        onClick={onClickAdd}
                    />
                ))}
            </div>
        </section>
    )
}

export default Nav