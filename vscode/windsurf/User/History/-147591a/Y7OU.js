export default globalMemory = {
  socket: null,
  problemId: null,
  currentCheckpoint: null,
  checkpointMemory: [
    {
      id: 0,
      checkpointTitle: "ProblemUnderstanding",
      checkpointStatus: false,
      messages: [],
      systemPrompt: getProblemUnderstandingPrompt(),
      tools: puTools,
      summary: null,
    },
    {
      id: 1,
      checkpointTitle: "SolutionApproachDiscussion",
      checkpointStatus: false,
      messages: [],
      systemPrompt: null,
      tools: sadTools,
      summary: null,
      triedApproaches: [],
      /*
          {
            approachType : "naive"/ "optimal" 
            tasks : [
              {
                taskType : "question/coding/timecomplexity/spacecomplexity"
                content : "question content"
                passed : "true/false"

              },
              ....
            ]
          } 
        */
    },
    {
      id: 2,
      checkpointTitle: "CodeImplementation",
      checkpointStatus: false,
      messages: [],
      systemPrompt: null,
      tools: puTools,
      summary: null,
    },
    {
      id: 3,
      checkpointTitle: "QNA",
      checkpointStatus: false,
      messages: [],
      systemPrompt: null,
      tools: puTools,
      summary: null,
    },
  ],
};
