import Button from "./Button"

const Goals = ({subTit, goalList}) => {
    return (
        <div>
            <div className="fnc-area">
                <h3 className="l-area">{subTit}</h3>
                <Button
                    type={'sm'}
                    text={'edit'}
                />
            </div>

            <ul className="goal-list">
                {goalList.map((list, i) => (
                    <li key={i}>{list}</li>
                ))}
            </ul>
        </div>
    )
}

export default Goals