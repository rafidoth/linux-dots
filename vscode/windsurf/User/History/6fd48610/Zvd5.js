/**
 * Coding Problems Dataset - Interview Problem Collection
 *
 * This module exports comprehensive coding interview problems with detailed
 * solutions, test cases, and follow-up questions for technical interviews.
 */

import twoSum from "./two_sum.js";
import reverseLinkedList from "./reverse_linked_list.js";
import validParentheses from "./valid_parentheses.js";
import binaryTreeTraversal from "./binary_tree_traversal.js";
import longestSubstring from "./longest_substring.js";
import mergeIntervals from "./merge_intervals.js";
import wordLadder from "./word_ladder.js";
import trappingRainWater from "./trapping_rain_water.js";
import courseSchedule from "./course_schedule.js";
import designLRUCache from "./design_lru_cache.js";

/**
 * All available coding problems organized by difficulty and topic
 */
export const codingProblems = {
  // Easy problems - Entry level and junior developers
  easy: [twoSum, reverseLinkedList, validParentheses],

  // Medium problems - Mid-level developers
  medium: [
    binaryTreeTraversal,
    longestSubstring,
    mergeIntervals,
    courseSchedule,
  ],

  // Hard problems - Senior developers and challenging scenarios
  hard: [wordLadder, trappingRainWater, designLRUCache],
};

/**
 * Problems organized by topic for focused practice
 */
export const problemsByTopic = {
  arrays: [twoSum, mergeIntervals, trappingRainWater],
  strings: [validParentheses, longestSubstring, wordLadder],
  linkedLists: [reverseLinkedList],
  trees: [binaryTreeTraversal],
  graphs: [courseSchedule, wordLadder],
  design: [designLRUCache],
  dynamicProgramming: [trappingRainWater, wordLadder],
  twoPointers: [twoSum, trappingRainWater],
  slidingWindow: [longestSubstring],
  backtracking: [wordLadder],
};

/**
 * Get all problems as a flat array
 */
export function getAllProblems() {
  return [
    ...codingProblems.easy,
    ...codingProblems.medium,
    ...codingProblems.hard,
  ];
}

/**
 * Get a specific problem by ID
 */
export function getProblemById(problemId) {
  return getAllProblems().find((problem) => problem.id === problemId);
}

/**
 * Get problems by difficulty level
 */
export function getProblemsByDifficulty(difficulty) {
  return codingProblems[difficulty] || [];
}

/**
 * Get problems by topic
 */
export function getProblemsByTopic(topic) {
  return problemsByTopic[topic] || [];
}

/**
 * Get a random problem for practice
 */
export function getRandomProblem(difficulty = null) {
  let problems;

  if (difficulty) {
    problems = getProblemsByDifficulty(difficulty);
  } else {
    problems = getAllProblems();
  }

  if (problems.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * problems.length);
  return problems[randomIndex];
}

export default {
  codingProblems,
  problemsByTopic,
  getAllProblems,
  getProblemById,
  getProblemsByDifficulty,
  getProblemsByTopic,
  getRandomProblem,
};
