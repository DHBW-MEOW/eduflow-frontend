import InputModule from "../inputOptions/InputModule.tsx";
import InputTopic from "../inputOptions/InputTopic.tsx";
import InputDate from "../inputOptions/InputDate.tsx";
import InputDetails from "../inputOptions/InputDetails.tsx";

function LearningPlan() {
    return (
        <div>
            <InputModule/>
            <InputTopic/>
            <InputDate/>
            <InputDetails/>
        </div>
    )
}

export default LearningPlan