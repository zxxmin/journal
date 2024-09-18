import './Habit.scss'
import Button from '../components/Button';
import { useState } from 'react';

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

    const [isEdit, setIsEdit] = useState(false);

    const onClickEdit = () => {
        setIsEdit(!isEdit)
    }

    const onClickSave = () => {
        setIsEdit(false);
    }

    return (
        <>
        <div className="fnc-area">
            <h1 className="l-area title-lg">{monthToNum}월 Habit Tracker</h1>
            <div className="r-area">
                {isEdit ? (
                    <>
                    <Button
                        type={'circle'}
                        text={'+'}
                    />
                    <Button
                        type={'circle'}
                        text={'-'}
                    />
                    </>
                ) : ''}
                <Button
                    type={isEdit ? 'sm POSITIVE' : 'sm'}
                    text={isEdit ? 'save' : 'edit'}
                    onClick={isEdit ? onClickSave : onClickEdit}
                />
            </div>
        </div>
        <div className='habit-list'>
            {habitNm.length > 0
                ? (
                    <table>
                        <caption>Habit Tracker</caption>
                        <colgroup>
                            <col width="120px" />
                            {daysArray.map(col => (
                                <col key={col} width="24px" />
                            ))}
                        </colgroup>
                        <thead>
                            <tr>
                                <td></td>
                                {daysArray.map(day => (
                                    <td key={day}>{day}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {habitNm.map((name, i) => (
                                <tr key={name}>
                                    <th>
                                        {isEdit ? (
                                            <input
                                                type='text'
                                                value={name || ''}
                                                title={name}

                                            />
                                        ) : (
                                            name
                                        )}
                                    </th>
                                    {daysArray.map(day => (
                                        <td key={day}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={habitComplete[i]?.includes(day)}
                                                    disabled={isEdit ? false : true}
                                                />
                                                <span>{day}</span>
                                            </label>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                : ''
            }
            
        </div>
        </>
    )
}

export default Habit;