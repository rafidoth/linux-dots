import { z } from "zod";


const ExamUiSchema = z.object({
    participantStatus : z.enum(["participant", "notParticipant", "creator"]),
})

function ExamUI(participantStatus) {
    return (  );
}

export default ExamUI;