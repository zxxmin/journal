import './Habit.scss'
import { useContext, useEffect, useState } from 'react';
import { JournalDispatchContext } from "../App";
import Button from '../components/Button';

const Habit = ({data, yearToNum, monthToNum}) => {
    const endDay = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let days = endDay[monthToNum-1]
    let daysArray = Array.from({ length: days }, (_, i) => i + 1);

    const getHabit = (habitType) => data
        .filter(item => item.year === yearToNum)
        .flatMap(item => item.months
        .filter(months => months.month === monthToNum)
        .flatMap(months => months.habits.map(habit => habit[habitType]))
    );

    const habitNm = getHabit('name');
    const habitComplete = getHabit('completedDays');

    const { onClickHabitEdit } = useContext(JournalDispatchContext);
    const [isEdit, setIsEdit] = useState(false);
    const [editHabitNm, setEditHabitNm] = useState([...habitNm])
    const [editHabitCom, setEditHabitCom] = useState([...habitComplete])

    useEffect(() => {
        setEditHabitNm([...habitNm])
        setEditHabitCom([...habitComplete])
        setIsEdit(false)
    }, [yearToNum, monthToNum])

    const onChangeInput = (e, i) => {
        const newHabit = [...editHabitNm];
        newHabit[i] = e.target.value
        setEditHabitNm(newHabit)
    }

    const onChangeChecked = (e, day, i) => {
        const isChecked = e.target.checked;
        const updatedHabitCom = [...editHabitCom];
        
        if (isChecked) {
            // 체크된 경우, 해당 날짜를 추가
            if (!updatedHabitCom[i]) {
                updatedHabitCom[i] = [];
            }
            if (!updatedHabitCom[i].includes(day)) {
                updatedHabitCom[i].push(day);
            }
        } else {
            // 체크 해제된 경우, 해당 날짜를 제거
            if (updatedHabitCom[i]) {
                updatedHabitCom[i] = updatedHabitCom[i].filter(d => d !== day);
            }
        }

        // 상태 업데이트
        setEditHabitCom(updatedHabitCom);
    }

    const onClickEdit = () => {
        setIsEdit(!isEdit)
    }

    const onClickSave = () => {
        const filteredHabitNm = [];
        const filteredHabitCom = [];

        editHabitNm.forEach((name, i) => {
            if (name.trim() !== '') {
                filteredHabitNm.push(name);
                filteredHabitCom.push(editHabitCom[i]);
            }
        });
        setEditHabitNm(filteredHabitNm)
        setEditHabitCom(filteredHabitCom)

        onClickHabitEdit(yearToNum, monthToNum, editHabitNm, editHabitCom);
        setIsEdit(false);
    }

    const onClickPlus = () => {
        setEditHabitNm([...editHabitNm, ""]);
    }

    const onClickMinus = (i) => {
        const updatedHabitNm = editHabitNm.filter((_, index) => index !== i);
        const updatedHabitCom = editHabitCom.filter((_, index) => index !== i);
        setEditHabitNm(updatedHabitNm);
        setEditHabitCom(updatedHabitCom);
    };

    return (
        <>
        <div className="fnc-area">
            <h1 className="l-area title-lg">{monthToNum}월 Habit Tracker</h1>
            <div className="r-area">
                <Button
                    type={isEdit ? 'sm POSITIVE' : 'sm'}
                    text={isEdit ? 'save' : 'edit'}
                    onClick={isEdit ? onClickSave : onClickEdit}
                />
            </div>
        </div>
        <div className='habit-list'>
            <table>
                <caption>Habit Tracker</caption>
                <colgroup>
                    <col width="120px" />
                    {daysArray.map(col => (
                        <col key={col} width="24px" />
                    ))}
                </colgroup>
                {(editHabitNm.length > 0 || isEdit) && (
                    <>
                        <thead>
                            <tr>
                                <td></td>
                                {daysArray.map(day => (
                                    <td key={day}>{day}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {editHabitNm.length > 0 ? (
                                editHabitNm.map((name, i) => (
                                    <tr key={i}>
                                        <th>
                                            {isEdit ? (
                                                <>
                                                    <Button 
                                                        type={'circle'}
                                                        onClick={i === 0 ? onClickPlus : () => onClickMinus(i)}
                                                        text={i === 0 ? '+' : '-'}
                                                    />
                                                    <input
                                                        type='text'
                                                        value={name || ''}
                                                        onChange={(e) => onChangeInput(e, i)}
                                                        title={name}
                                                        name={`habit_${i}`}
                                                    />
                                                </>
                                            ) : (
                                                <span>{name}</span>
                                            )}
                                        </th>
                                        {daysArray.map((day, j) => (
                                            <td key={j}>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={editHabitCom[i]?.includes(day) || false}
                                                        onChange={(e) => onChangeChecked(e, day, i)}
                                                        disabled={!isEdit}
                                                        name={`day_${j}`}
                                                    />
                                                    <span>{day}</span>
                                                </label>
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <th>
                                        <Button 
                                            type={'circle'}
                                            onClick={onClickPlus}
                                            text='+'
                                        />
                                        <input
                                            type='text'
                                            onChange={(e) => onChangeInput(e, 0)}
                                            name='habit'
                                        />
                                    </th>
                                    {daysArray.map((day, j) => (
                                        <td key={j}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    disabled={!isEdit}
                                                    name='day'
                                                />
                                                <span>{day}</span>
                                            </label>
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </>
                )}
            </table>
            
        </div>
        </>
    )
}

export default Habit;