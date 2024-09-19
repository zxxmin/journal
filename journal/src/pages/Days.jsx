import './Days.scss'
import 'react-calendar/dist/Calendar.css';
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JournalStateContext } from "../App";
import { format } from 'date-fns';
import Calendar from "react-calendar";

const formatDate = (date, formatString) => {
    return format(date, formatString);
};

const Days = () => {
    const { month } = useParams();
    const yearToNum = parseInt(month.split('_')[0], 10)
    const monthToNum = parseInt(month.split('_')[1], 10)
    const data = useContext(JournalStateContext)
    const [date, setDate] = useState(new Date(yearToNum, monthToNum-1));
    const nav = useNavigate();

    const dateArr = data
        .filter(item => item.year === yearToNum)
        .flatMap(item => item.months
        .filter(months => months.month === monthToNum)
        .flatMap(months => months.days.map(days => days.date))
    );

    const hasDate = (date) => {
        return dateArr.includes(formatDate(date, 'yyyy-MM-dd'));
    };

    const onClickDate = (date) => {
        const formatDate = format(date, 'yyyy-MM-dd');
        nav(`/tasks/${formatDate}`)
    }
    

    useEffect(() => {
        setDate(new Date(yearToNum, monthToNum-1))
    }, [yearToNum, monthToNum])

    return (
        <section className="content">
            <h1 className="title-lg">{monthToNum}월 Days</h1>
            <div>
                <Calendar
                    value={date}
                    onChange={setDate}
                    formatDay={(locale, date) => formatDate(date, 'd')}
                    formatMonthYear={(locale, date) => formatDate(date, "yyyy. MM")}
                    view="month"
                    calendarType="gregory"
                    showNeighboringMonth={false}
                    nextLabel={null}
                    prevLabel={null}
                    next2Label={null}
                    prev2Label={null}
                    minDetail="month"
                    maxDetail="month"
                    onClickDay={(value) => onClickDate(value)}
                    tileContent={({ date }) => {
                        return hasDate(date) ? (
                            <div className='hasTask' />
                        ) : null;
                    }}
                />
            </div>
        </section>
    )
}

export default Days;