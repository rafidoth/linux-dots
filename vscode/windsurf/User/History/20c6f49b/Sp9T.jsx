function ExamUI({ participationStatus }) {
  if (!participationStatus) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">Loading participation status...</p>
        </div>
      </div>
    );
  }

  if (participationStatus === "not participant") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            Register yourself to access this exam.
          </p>
        </div>
      </div>
    );
  }

  if (participationStatus === "participant") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            You are already registered for this exam.
          </p>
        </div>
      </div>
    );
  }

  if (participationStatus === "creator") {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-lg font-medium">
            You are the creator of this exam.
          </p>
        </div>
      </div>
    );
  }
}

export default ExamUI;
