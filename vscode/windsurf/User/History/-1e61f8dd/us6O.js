import examSchemas from "../../shared/examApiSchema.js";

export async function getRequest(url, params, headers = {}) {
  let URL = `${import.meta.env.VITE_SERVER_URL}/${url}`;

  // Add query params if provided
  if (params) {
    const queryParams = new URLSearchParams();
    for (const key in params) {
      queryParams.append(key, params[key]);
    }
    URL = `${URL}?${queryParams.toString()}`;
  }

  try {
    const response = await fetch(URL, {
      method: "GET",
      headers: {
        ...headers,
      },
    });

    // if (!response.ok) {
    //   const errorData = await response
    //     .json()
    //     .catch(() => ({ message: response.statusText }));
    //   throw new Error(
    //     `HTTP error! Status: ${response.status}, Message: ${
    //       errorData.message || "Unknown error"
    //     }`
    //   );
    // }

    return response;
  } catch (error) {
    console.error("getRequest failed:", error);
    throw error;
  }
}

export async function postRequest(url, method, body, headers) {
  const URL = `${import.meta.env.VITE_SERVER_URL}/${url}`;
  try {
    const response = await fetch(URL, {
      method,
      body,
      headers,
    });
    if (!response.ok) {
      // You might want to parse the error message from the response body
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${
          errorData.message || "Unknown error"
        }`
      );
    }
    return response;
  } catch (error) {
    console.error("postRequest failed:", error);
    throw error; // Re-throw the error so calling functions can handle it
  }
}

export async function generateQuestions(generationSettings) {
  const response = await postRequest(
    "api/generate-q",
    "POST",
    JSON.stringify(generationSettings),
    {
      "Content-Type": "application/json",
    }
  );
  const data = await response.json();
  return data;
}

export async function fetchQuizset(quizsetId, userId) {
  const headers = {
    "Content-Type": "application/json",
    "x-user-id": userId,
  };
  const response = await getRequest(`api/q/${quizsetId}`, "", headers);
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: response.statusText }));
    throw new Error(
      `HTTP error! Status: ${response.status}, Message: ${
        errorData.message || "Unknown error"
      }`
    );
  }
  const data = await response.json();
  return data;
}

export async function createNewExam(examDetails) {
  const exam = examSchemas.examAPIRequestSchema.safeParse({
    ...examDetails,
    startTime: examDetails.startTime.toISOString(),
  });

  console.log(exam);
  if (exam.success) {
    const response = await postRequest(
      "api/exam",
      "POST",
      JSON.stringify(exam.data),
      {
        "Content-Type": "application/json",
      }
    );
    const data = await response.json();
    return { success: true, data };
  } else {
    throw new Error("[ZOD VALIDATION] Invalid exam details");
  }
}

export async function fetchUserQuizsets(userId, limit = 10) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "x-user-id": userId,
    };

    const params = { limit };
    const response = await getRequest("api/user/quizsets", params, headers);
    const data = await response.json();

    if (data.success) {
      return data.data; // Array of quizset objects
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch user quizsets:", error);
  }
}

export async function fetchExamsByQuizset(quizsetId, userId) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "x-user-id": userId,
    };

    const response = await getRequest(
      `api/q/${quizsetId}/exams`,
      null,
      headers
    );
    const data = await response.json();

    if (data.success) {
      return data.data; // Array of exam objects
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch exams for quizset:", error);
    return [];
  }
}
