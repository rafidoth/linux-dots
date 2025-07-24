/**
 * Two Sum Problem - Comprehensive Interview Guide
 */
export default {
  id: "two_sum",
  title: "Two Sum",
  difficulty: "easy",
  topic: ["arrays", "hash-table", "two-pointers"],
  companies: ["Google", "Amazon", "Facebook", "Microsoft", "Apple", "Netflix"],
  description: `
    Given an array of integers nums and an integer target, return indices of the two numbers 
    such that they add up to target. You may assume that each input would have exactly one 
    solution, and you may not use the same element twice. You can return the answer in any order.
  `,
  examples: [
    {
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
    },
    {
      input: "nums = [3,2,4], target = 6",
      output: "[1,2]",
      explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
    },
    {
      input: "nums = [3,3], target = 6",
      output: "[0,1]",
      explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists.",
  ],
  interviewPrmpt: `
    You are conducting a coding interview for a software engineer position. Present the Two Sum problem 
    to the candidate and evaluate their approach to solving it.
    
    Interview flow:
    1. Present the problem clearly with examples
    2. Allow the candidate to ask clarifying questions
    3. Guide them through different approaches (brute force → optimized)
    4. Discuss time and space complexity
    5. Ask them to code their solution
    6. Test with provided examples and edge cases
    7. Discuss potential optimizations and variations
    
    Evaluation criteria:
    - Problem understanding and clarification questions
    - Approach progression from brute force to optimal
    - Code quality, readability, and correctness
    - Time and space complexity analysis
    - Testing and edge case consideration
    
    Be supportive but thorough in your evaluation. This is often a warm-up problem.
  `,
  hints: [
    "Think about what information you need to store as you iterate through the array.",
    "Consider using a hash map to store values you've already seen.",
    "For each element, check if its complement (target - current) exists in your hash map.",
    "Remember to handle the case where the same element cannot be used twice.",
  ],
  solutions: {
    bruteForce: {
      approach: "Brute Force - Nested Loop",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      description: "Check every pair of numbers to see if they sum to target.",
      type: "naive",
      code: {
        java: `
public int[] twoSum(int[] nums, int target) {
    // Check every possible pair
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    // Should never reach here based on problem constraints
    throw new IllegalArgumentException("No two sum solution");
}`,
        javascript: `
function twoSum(nums, target) {
    // Check every possible pair
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    // Should never reach here based on problem constraints
    throw new Error("No two sum solution");
}`,
        python: `
def twoSum(nums, target):
    # Check every possible pair
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    
    # Should never reach here based on problem constraints
    raise ValueError("No two sum solution")`,
      },
    },
    twoPassHashMap: {
      approach: "Two-pass Hash Map",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description:
        "First pass stores all elements in hash map, second pass looks for complement.",
      type: "optimized",
      code: {
        java: `
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    // First pass: store all elements with their indices
    for (int i = 0; i < nums.length; i++) {
        map.put(nums[i], i);
    }
    
    // Second pass: look for complement
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement) && map.get(complement) != i) {
            return new int[]{i, map.get(complement)};
        }
    }
    
    throw new IllegalArgumentException("No two sum solution");
}`,
        javascript: `
function twoSum(nums, target) {
    const map = new Map();
    
    // First pass: store all elements with their indices
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }
    
    // Second pass: look for complement
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement) && map.get(complement) !== i) {
            return [i, map.get(complement)];
        }
    }
    
    throw new Error("No two sum solution");
}`,
        python: `
def twoSum(nums, target):
    num_map = {}
    
    # First pass: store all elements with their indices
    for i, num in enumerate(nums):
        num_map[num] = i
    
    # Second pass: look for complement
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map and num_map[complement] != i:
            return [i, num_map[complement]]
    
    raise ValueError("No two sum solution")`,
      },
    },
    onePassHashMap: {
      approach: "One-pass Hash Map (Optimal)",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      description:
        "Look for complement while building the hash map in a single pass.",
      type: "optimized-2",

      code: {
        java: `
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        
        // Check if complement exists in map
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        
        // Add current element to map
        map.put(nums[i], i);
    }
    
    throw new IllegalArgumentException("No two sum solution");
}`,
        javascript: `
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        // Check if complement exists in map
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        // Add current element to map
        map.set(nums[i], i);
    }
    
    throw new Error("No two sum solution");
}`,
        python: `
def twoSum(nums, target):
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        # Check if complement exists in map
        if complement in num_map:
            return [num_map[complement], i]
        
        # Add current element to map
        num_map[num] = i
    
    raise ValueError("No two sum solution")`,
      },
    },
  },
  testCases: [
    {
      input: { nums: [2, 7, 11, 15], target: 9 },
      expected: [0, 1],
      description: "Basic case - first two elements",
    },
    {
      input: { nums: [3, 2, 4], target: 6 },
      expected: [1, 2],
      description: "Elements not at beginning",
    },
    {
      input: { nums: [3, 3], target: 6 },
      expected: [0, 1],
      description: "Duplicate elements",
    },
    {
      input: { nums: [-1, -2, -3, -4, -5], target: -8 },
      expected: [2, 4],
      description: "Negative numbers",
    },
    {
      input: { nums: [0, 4, 3, 0], target: 0 },
      expected: [0, 3],
      description: "Zero target with zeros in array",
    },
  ],
  followUpQuestions: [
    "What if the array was sorted? Could you solve it with O(1) space?",
    "What if there could be multiple valid pairs? How would you return all of them?",
    "What if we needed to find three numbers that sum to target (3Sum problem)?",
    "How would you handle very large arrays that don't fit in memory?",
    "What if the input array could have duplicate elements and we want unique pairs?",
    "How would you modify this to find the pair closest to the target sum?",
    "What if we needed to find pairs in two different arrays that sum to target?",
  ],
  variations: [
    {
      name: "Two Sum II - Input array is sorted",
      description: "Use two pointers technique with O(1) space",
      difficulty: "easy",
    },
    {
      name: "3Sum",
      description: "Find all unique triplets that sum to zero",
      difficulty: "medium",
    },
    {
      name: "4Sum",
      description: "Find all unique quadruplets that sum to target",
      difficulty: "medium",
    },
    {
      name: "Two Sum Closest",
      description: "Find pair with sum closest to target",
      difficulty: "medium",
    },
  ],
  commonMistakes: [
    "Using the same element twice (not checking index inequality)",
    "Not handling edge cases like empty arrays",
    "Incorrect time complexity analysis",
    "Not considering integer overflow for very large numbers",
    "Forgetting to handle duplicate values correctly",
    "Not optimizing from brute force approach",
  ],
  interviewTips: [
    "Start with brute force approach to show understanding",
    "Explain time and space complexity for each approach",
    "Ask about edge cases and constraints",
    "Consider sorted array optimization if applicable",
    "Think about trade-offs between time and space complexity",
    "Test your solution with provided examples",
  ],
};
