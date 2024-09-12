import { useParams } from "react-router-dom";

const Tasks = () => {
    const params = useParams();
    
    return (
        <div>{params.id} Tasks</div>
    )
}

export default Tasks;