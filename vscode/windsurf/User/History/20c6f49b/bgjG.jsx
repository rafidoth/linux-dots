import { z } from "zod";


const ExamUiSchema = z.object({
    participantStatus : z.enum(["participant", "notParticipant", "creator"]),
})

function ExamUI(props) {
    return (  );
}

export default ExamUI;