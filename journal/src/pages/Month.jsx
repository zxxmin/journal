import './Month.scss'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { JournalStateContext, JournalDispatchContext } from "../App";
import Goals from "../components/Goals";
import Habit from '../components/Habit';

const Month = () => {
    const { month } = useParams();
    const yearToNum = parseInt(month.split('_')[0], 10)
    const monthToNum = parseInt(month.split('_')[1], 10)
    const data = useContext(JournalStateContext)


    return (
        <section className="content month-page">
            <article className="month-goal">
                <h1 className="title-lg">{monthToNum}월 목표</h1>
                <div>
                    <Goals
                        data={data}
                        yearToNum={yearToNum}
                        monthToNum={monthToNum}
                        subTit={'단기'}
                        goalList={'shortTerm'}
                    />
                    <Goals
                        data={data}
                        yearToNum={yearToNum}
                        monthToNum={monthToNum}
                        subTit={'장기'}
                        goalList={'longTerm'}
                    />
                </div>
            </article>
            <article className='month-habit'>
                <Habit
                    data={data}
                    yearToNum={yearToNum}
                    monthToNum={monthToNum}
                />
            </article>
        </section>
    )
}

export default Month;