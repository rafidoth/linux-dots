import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { generateTitle } from "./interactionWithLLM.js";

dotenv.config();

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  return supabase;
}

const supabase = getSupabaseClient();

export const createNewQuizSet = async (context, userId, visibility) => {
  const title = await generateTitle(context);
  const { data, error } = await supabase
    .from("quizsets")
    .insert({ title, userId, visibility })
    .select();

  if (error) {
    console.error(error);
    return null;
  }
  console.log("quizset created : ", data);
  return data[0];
};
export const retrieveQuizsetTitle = async (quizsetId) => {
  const { data, error } = await supabase
    .from("quizsets")
    .select("title")
    .eq("id", quizsetId)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data.title;
};

export const saveMcqQuizzesDB = async (quizzes, quizsetId) => {
  quizzes.forEach(async (quiz) => {
    const saveQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .insert({
          quizsetId,
          question: quiz.question,
          difficulty: quiz.difficulty,
          type: quiz.questionType,
        })
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("Questions added to DB");
      }
      return data[0].id;
    };

    const saveAnswers = async (questionId) => {
      const { data, error } = await supabase
        .from("answers")
        .insert({
          questionId,
          answer: quiz.answer,
          answerExplanation: quiz.answerExplanation,
        })
        .select();
      if (error) {
        console.error(error);
      } else {
        console.log("Answers added to DB");
      }
    };

    const saveChoices = async (questionId) => {
      quiz.choices.forEach(async (choice, i) => {
        const { data, error } = await supabase
          .from("choices")
          .insert({
            questionId,
            choiceNumber: i,
            choiceText: choice,
          })
          .select();
        if (error) {
          console.error(error);
        } else {
          console.log("Choices added to DB");
        }
      });
    };

    const questionId = await saveQuestions();
    await saveAnswers(questionId);
    await saveChoices(questionId);
  });
};

export const retrieveMcqQuizset = async (quizsetId) => {
  try {
    console.log(`Retrieving quiz set with ID: ${quizsetId}`);
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .eq("quizsetId", quizsetId);

    if (questionsError) {
      console.error("Error retrieving questions:", questionsError);
      return null;
    }

    const formattedQuizzes = [];

    for (const question of questions) {
      const { data: answers, error: answersError } = await supabase
        .from("answers")
        .select("*")
        .eq("questionId", question.id)
        .single();

      if (answersError) {
        console.error(
          `Error retrieving answer for question ${question.id}:`,
          answersError
        );
        continue;
      }

      // Get the choices for this question
      const { data: choices, error: choicesError } = await supabase
        .from("choices")
        .select("*")
        .eq("questionId", question.id)
        .order("choiceNumber", { ascending: true });

      if (choicesError) {
        console.error(
          `Error retrieving choices for question ${question.id}:`,
          choicesError
        );
        continue;
      }

      // Extract just the choice text from each choice object
      const choiceTexts = choices.map((choice) => choice.choiceText);

      // Create a formatted quiz object matching the structure in quizController.js
      const formattedQuiz = {
        question: question.question,
        choices: choiceTexts,
        answer: answers.answer, // Assuming this is the index of the correct answer
        answerExplanation: answers.answerExplanation,
        difficulty: question.difficulty,
        questionType: question.type || "mcq",
      };

      formattedQuizzes.push(formattedQuiz);
    }

    console.log(`Retrieved and formatted ${formattedQuizzes.length} quizzes`);
    return formattedQuizzes;
  } catch (error) {
    console.error("Error in retrieveMcqQuizset:", error);
    return null;
  }
};

export const saveContextDB = async (context, quizsetId) => {
  const { data, error } = await supabase
    .from("contexts")
    .insert({ quizsetId, content: context })
    .select();
  if (error) {
    console.error(error);
  } else {
    console.log("Context added to DB");
  }
};

export const retrieveContextDB = async (quizsetId) => {
  const { data, error } = await supabase
    .from("contexts")
    .select("*")
    .eq("quizsetId", quizsetId)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  console.log(data);
  return data.content;
};

export const createNewExamDB = async (exam) => {
  const { data, error } = await supabase
    .from("exams")
    .insert({
      title: exam.title,
      creatorId: exam.creatorId,
      start_time: exam.startTime,
      duration_minutes: exam.duration,
      quizsetId: exam.quizSetId,
    })
    .select();
  if (error) {
    console.error(error);
  } else {
    console.log("Exam added to DB");
    const examId = data[0].id;
    const { data, error } = await supabase.from("exam_preferences").insert({
      examId,
      creatorAllowed: exam.creatorParticipationAllowed,
      shuffle: exam.shuffleQuestions,
      isPublic: exam.isPublic,
    });
    if (error) {
      console.error(error);
    } else {
      console.log("Exam preferences added to DB");
    }
  }
  return data[0];
};
