import './Goals.scss'
import Button from "./Button"
import { JournalDispatchContext } from "../App";
import { useContext, useEffect, useState } from "react";

const Goals = ({data, yearToNum, monthToNum, subTit, goalList}) => {
    const getGoals = (goalType) => data
        .filter(item => item.year === yearToNum)
        .flatMap(item => item.months
        .filter(months => months.month === monthToNum)
        .map(months => months.goals[goalType])
    ).flat();

    const goalType = getGoals(goalList)

    const { onClickGoalEdit } = useContext(JournalDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const [editGoals, setEditGoals] = useState([...goalType]);

    useEffect(() => {
        setEditGoals([...goalType])
        setIsEdit(false)
    }, [yearToNum, monthToNum])

    const onClickEdit = () => {
        setIsEdit(!isEdit)
    }

    const onClickSave = () => {
        onClickGoalEdit(yearToNum, monthToNum, goalList, editGoals);
        setIsEdit(false);
    }

    const onChangeInput = (e, i) => {
        const newGoals = [...editGoals];
        newGoals[i] = e.target.value
        setEditGoals(newGoals)
    }

    const onClickPlus = () => {
        setEditGoals([...editGoals, ""]);
    }

    const onClickMinus = (i) => {
        const updatedGoals = editGoals.filter((_, index) => index !== i); // 해당 항목 삭제
        setEditGoals(updatedGoals);
      };

    return (
        <div>
            <div className="fnc-area">
                <h3 className="l-area">{subTit}</h3>
                <Button
                    type={isEdit ? 'sm POSITIVE' : 'sm'}
                    text={isEdit ? 'save' : 'edit'}
                    onClick={isEdit ? onClickSave : onClickEdit}
                />
            </div>

            <ul className="goal-list">
                {editGoals.length > 0 
                    ? (editGoals.map((list, i) => (
                        <li key={i}>
                            {isEdit ? (
                                <>
                                <input
                                    type="text"
                                    value={list || ""}
                                    onChange={(e) => onChangeInput(e, i)}
                                    title={list}
                                />
                                <Button 
                                    type={'circle'}
                                    onClick={i === 0 ? onClickPlus : () => onClickMinus(i)}
                                    text={i === 0 ? '+' : '-'}
                                />
                                </>
                            ) : (
                                list
                            )}
                        </li>
                    )))
                    : (isEdit ? (
                            <li>
                                <input
                                    type="text"
                                    value={editGoals[0] || ""}
                                    onChange={(e) => onChangeInput(e, 0)}
                                />
                                <Button 
                                    type={'circle'}
                                    onClick={onClickPlus}
                                    text={'+'}
                                />
                            </li>
                        )
                        : ''
                    )
                }
            </ul>
        </div>
    )
}

export default Goals