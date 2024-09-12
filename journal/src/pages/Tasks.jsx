import { useParams } from "react-router-dom";

const Tasks = () => {
    const { month } = useParams();

    return (
        <div>{month} Tasks</div>
    )
}

export default Tasks;