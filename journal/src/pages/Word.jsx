import { useParams } from "react-router-dom";

const Word = () => {
    const { month } = useParams();
    console.log(month)

    return (
        <div>{month} Word</div>
    )
}

export default Word;