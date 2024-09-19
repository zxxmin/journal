import './Nav.scss'
import Button from "./Button"
import { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import { JournalStateContext, JournalDispatchContext } from "../App";


const Nav = () => {
    
    const data = useContext(JournalStateContext)
    const { onClickAdd, onClickDel } = useContext(JournalDispatchContext)
    const location = useLocation();
    const [checkedYears, setCheckedYears] = useState([]);

    useEffect(() => {
        const locationYear = parseInt(location.pathname.split('/')[1]?.split('_')[0], 10);
        if (locationYear && !checkedYears.includes(locationYear)) {
            setCheckedYears([locationYear]);
        }
    }, [location.pathname]);

    const onCheckedYear = (year, isChecked) => {
        setCheckedYears((prev) =>
            isChecked
                ? [...prev, year]
                : prev.filter((item) => item !== year)
        );
    };

    const onChangeYear = (e, year) => {
        onCheckedYear(year, e.target.checked);
    };


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
                            checked={checkedYears.includes(item.year)}
                            onChange={(e) => onChangeYear(e, item.year)}
                        />
                        <label htmlFor={item.year}>{item.year}</label>

                        <ul>
                            {item.months.map(months => (
                                <li key={months.month}>
                                    <Link
                                        to={`/${item.year}_${months.month}`}
                                        className={location.pathname === `/${item.year}_${months.month}` ? 'current month' : 'month'}
                                    >{months.month}
                                        월
                                    </Link>
                                    <Link
                                        to={`/days/${item.year}_${months.month}`}
                                        className={location.pathname === `/days/${item.year}_${months.month}` ? 'current' : ''}
                                    >
                                        days
                                    </Link>
                                    <Link
                                        to={`/word/${item.year}_${months.month}`}
                                        className={location.pathname === `/word/${item.year}_${months.month}` ? 'current' : ''}
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
                        onClick={button.type === 'add' ? onClickAdd : onClickDel}
                    />
                ))}
            </div>
        </section>
    )
}

export default Nav