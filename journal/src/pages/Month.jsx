import './Month.scss'
import Nav from "../components/Nav";
import Goals from "../components/Goals";

const Month = () => {
    const shotGoal = [
        "단기목표 1",
        "단기목표 2",
        "단기목표 3",
    ]

    const longGoal = [
        "장기목표 1",
        "장기목표 2",
    ]

    return (
        <div className="Container">
            <Nav />
            <section className="content">
                <article className="month-goal">
                    <h1 className="title-lg">11월 목표</h1>
                    <div>
                        <Goals
                            subTit={'단기'}
                            goalList={shotGoal}
                        />
                        <Goals
                            subTit={'장기'}
                            goalList={longGoal}
                        />
                    </div>
                </article>
            </section>
        </div>
    )
}

export default Month;