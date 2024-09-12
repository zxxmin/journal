import { useParams } from "react-router-dom";

const Days = () => {
    const { month } = useParams();

    return (
        <div>{month} Days</div>
    )
}

export default Days;