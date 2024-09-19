import './Task.scss'
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { JournalStateContext, JournalDispatchContext } from "../App";
import Button from "../components/Button";

const Tasks = () => {
    const { day } = useParams();
    const formatDay = day.split('-');
    const yearToNum = parseInt(formatDay[0])
    const monthToNum = parseInt(formatDay[1])
    const data = useContext(JournalStateContext)

    const review = data
        .filter(item => item.year === yearToNum)
        .flatMap(item => item.months
        .filter(months => months.month === monthToNum)
        .flatMap(months => months.days
            .filter(dayItem => dayItem.date === day)
            .map(dayItem => dayItem.journal)
        )
    )[0];

    const { onClickReviewEdit } = useContext(JournalDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const [editReview, setEditReview] = useState(review)
    
    const onClickEdit = () => {
        setIsEdit(!isEdit)
    }
    
    const onClickSave = (e) => {
        e.preventDefault();
        onClickReviewEdit(yearToNum, monthToNum, day, editReview)
        setIsEdit(false);
    }

    return (
        <section className="content task-sec">
            <div className="fnc-area">
                <h1 className="l-area title-lg">{formatDay[1]+'일 '+formatDay[2]+'일'} Review</h1>
                <div className="r-area">
                    <Button
                        type={isEdit ? 'sm POSITIVE' : 'sm'}
                        text={isEdit ? 'save' : 'edit'}
                        onClick={isEdit ? onClickSave : onClickEdit}
                    />
                </div>
            </div>
            <div>
                {isEdit
                    ? <textarea
                        value={editReview}
                        onChange={(e) => setEditReview(e.target.value)}
                    ></textarea>
                    : <p>{editReview}</p> 
                }
            </div>
        </section>
        
    )
}

export default Tasks;