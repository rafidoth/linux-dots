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
    such that they add up to target.
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
  examplesFewShot: {
    description:
      "few shot examples of some scenerios where candidate ask for examples",
    data: [
      {
        description: "Candidate Misunderstands the Problem",
        example_conversation: {
          user: "Can you give me some examples?",
          interviewer:
            "Sure, here is an example: nums = [2,7,11,15], target = 9. Can you tell me what is the answer for this?",
          user: "Sure its 0 and 2",
          interviewer: "Ummmmmm..... Can you tell me why its 0 and 2?",
          user: "Because nums[2] = 11 and nums[0] = 2, if I substract 2 from 11 its 9.",
          interviewer:
            "ah, I see. you got it wrong. the task is to find two numbers which sum up to the target variable not substract. Do you understand it now? Should I give you another example or we can move forward?",
          user: "Oh, yes I understand it now let's move on",
        },
      },
      {
        description: "Candidate Confuses Sum with Product",
        example_conversation: {
          user: "Can you give me an example to clarify the problem?",
          interviewer:
            "Sure! For nums = [2,7,11,15] and target = 9, the answer is [0,1]. This is because nums[0] = 2 and nums[1] = 7, and 2 + 7 = 9. Does that make sense?",
          user: "Wait, so do I need to multiply the numbers to get 9?",
          interviewer:
            "No, the goal is to find two numbers in the array that *add* up to the target, not multiply. So, 2 plus 7 equals 9, which is why we return their indices [0,1]. Clear now?",
          user: "Oh, got it, it’s addition, not multiplication.",
          interviewer:
            "Exactly! Do you understand the example, or would you like another one before we discuss the approach?",
          user: "I’m good, let’s move to the approach.",
        },
      },
      {
        description:
          "Candidate Misinterprets Output as Values Instead of Indices",
        example_conversation: {
          user: "Can you show me an example of what the output should be?",
          interviewer:
            "Of course! Take nums = [3,2,4] and target = 6. The output is [1,2] because nums[1] = 2 and nums[2] = 4, and 2 + 4 = 6. Understand?",
          user: "So, I return [2,4] as the answer, right?",
          interviewer:
            "Not quite. The problem asks for the *indices* of the two numbers, not the numbers themselves. Since 2 is at index 1 and 4 is at index 2, we return [1,2]. Does that clarify things?",
          user: "Ah, okay, it’s the positions in the array, not the values.",
          interviewer:
            "That’s right! Are you comfortable with this example, or do you want another one before we talk about the approach?",
          user: "No, I get it now. Let’s discuss the approach.",
        },
      },
      {
        description: "Candidate Assumes Same Number Can Be Used Twice",
        example_conversation: {
          user: "I’m a bit confused. Can you give me an example?",
          interviewer:
            "Sure thing! For nums = [3,3] and target = 6, the output is [0,1]. This is because nums[0] = 3 and nums[1] = 3, and 3 + 3 = 6. Got it?",
          user: "Wait, can I use the same number twice, like one 3 to make 6?",
          interviewer:
            "Good question! You need to use two different elements from the array, so you can’t use the same 3 at one index twice. Here, we use the 3 at index 0 and the 3 at index 1. Make sense?",
          user: "Yeah, so it’s two separate elements, even if they’re the same value.",
          interviewer:
            "Exactly! Do you need another example to solidify this, or are you ready to discuss the approach?",
          user: "I’m ready, let’s move on.",
        },
      },
    ],
  },

  constraints: [
    "2 <= nums.length <= 10^4",
    "-10^9 <= nums[i] <= 10^9",
    "-10^9 <= target <= 10^9",
    "Only one valid answer exists.",
  ],
  interviewPrompt: `
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
    {
      level: 1,
      hint: "Carefully read the problem: you need to find two numbers in the array that add up to the target and return their indices, not the numbers themselves.",
    },
    {
      level: 2,
      hint: "Think about how you can identify pairs of numbers in the array that sum to the target. Consider how you might check different combinations.",
    },
    {
      level: 3,
      hint: "Pay attention to the constraint that you cannot use the same element twice. Ensure you’re selecting two different positions in the array.",
    },
    {
      level: 4,
      hint: "Consider the order in which you process the array. Could you use information from earlier elements to help with later checks?",
    },
    {
      level: 5,
      hint: "Reflect on whether there’s a way to avoid checking every possible pair repeatedly. Is there a way to make each comparison more efficient?",
    },
    {
      level: 6,
      hint: "Think about what you know about each number as you process it. Could you store or use some information to simplify finding its pair?",
    },
    {
      level: 7,
      hint: "Evaluate the efficiency of your approach. If you’re checking too many combinations, consider if there’s a way to reduce the number of operations.",
    },
  ],
  solutions: [
    {
      name: "Brute Force (Nested Loops)",
      description:
        "This approach checks every possible pair of elements in the array by using two nested loops to find two numbers that sum to the target, returning their indices when found.",
      steps: [
        "Start with the first element in the array (at index i).",
        "For each element at index i, iterate through all subsequent elements (at index j, where j > i).",
        "Calculate the sum of the elements at indices i and j.",
        "If the sum equals the target, return the pair of indices [i, j].",
        "If no pair is found after checking all combinations, the problem assumes a solution exists (per standard constraints).",
        "Ensure that i and j are different to avoid using the same element twice.",
      ],
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      pros: "Straightforward to understand and implement; requires no additional data structures.",
      cons: "Highly inefficient for large arrays due to quadratic time complexity; not scalable.",
      keyConsideration:
        "Double-check that you’re only pairing distinct indices to meet the problem’s constraint. This approach is intuitive but impractical for large inputs.",
    },
    {
      name: "Hash Table (Single Pass)",
      description:
        "This approach uses a hash table to store elements and their indices during a single traversal of the array, checking for the complement (target minus current element) to find the pair efficiently.",
      steps: [
        "Initialize an empty hash table to store numbers as keys and their indices as values.",
        "Iterate through the array, processing each element at index i.",
        "For each element, compute the complement (target - current element).",
        "Check if the complement exists as a key in the hash table.",
        "If the complement is found, return the index stored in the hash table (for the complement) and the current index i.",
        "If not found, add the current element and its index to the hash table.",
        "Continue until a pair is found (problem assumes a solution exists).",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      pros: "Very efficient with linear time complexity; ideal for large arrays.",
      cons: "Requires additional memory for the hash table; must handle distinct indices carefully.",
      keyConsideration:
        "Ensure you check for the complement before adding the current element to the hash table to avoid incorrectly using the same index.",
    },
    {
      name: "Hash Table (Two Pass)",
      description:
        "This approach builds a hash table of all elements and their indices in the first pass, then checks for complements in a second pass to find the pair that sums to the target.",
      steps: [
        "Initialize an empty hash table to store numbers and their indices.",
        "In the first pass, iterate through the array and store each element’s value as a key and its index as the value in the hash table.",
        "In the second pass, iterate through the array again.",
        "For each element at index i, compute the complement (target - current element).",
        "Check if the complement exists in the hash table and ensure its index is different from i.",
        "If a valid complement is found, return the current index i and the complement’s index from the hash table.",
        "Continue until a pair is found (problem assumes a solution exists).",
      ],
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      pros: "Still achieves linear time; separates storage and checking phases, which may be easier to reason about for some.",
      cons: "Requires two passes through the array, making it slightly less efficient than the single-pass hash table approach.",
      keyConsideration:
        "When checking the complement, verify that its index is not the same as the current index to satisfy the distinct-index requirement.",
    },
    {
      name: "Sorting with Two Pointers",
      description:
        "This approach involves sorting a copy of the array paired with indices, then using two pointers to find a pair of numbers that sum to the target, adjusting pointers based on the sum.",
      steps: [
        "Create a new array of pairs, where each pair contains an element’s value and its original index in the input array.",
        "Sort this array of pairs based on the element values (not indices).",
        "Initialize two pointers: left at the start of the sorted array and right at the end.",
        "While left is less than right, compute the sum of the values at the left and right pointers.",
        "If the sum equals the target, return the original indices stored in the pairs at the left and right pointers.",
        "If the sum is less than the target, move the left pointer to the right to increase the sum.",
        "If the sum is greater than the target, move the right pointer to the left to decrease the sum.",
        "Continue until a pair is found (problem assumes a solution exists).",
      ],
      timeComplexity: "O(n log n)",
      spaceComplexity:
        "O(n) for the paired array, or O(1) if sorting is in-place (excluding output)",
      pros: "Reduces space usage compared to hash table if in-place sorting is used; conceptually interesting for sorted data scenarios.",
      cons: "Sorting adds complexity and makes it slower than hash table approaches; tracking original indices requires careful handling.",
      keyConsideration:
        "After sorting, ensure you return the original indices from the paired array, not the sorted positions, and verify the indices are distinct.",
    },
  ],
  fewShotExamplesSolvingApproaches: [
    {
      description: "Candidate Partially Explains Brute Force Approach",
      example_conversation: {
        user: "For Two Sum, I’d loop through the array and try adding pairs of numbers to see if they match the target. Like, check each number with others.",
        interviewer:
          "That’s a solid starting point! You’re thinking about pairing numbers to find the target sum, which is key. Can you elaborate on how you’d pick those pairs? For example, how would you ensure you check all combinations and return the correct indices, like for nums = [2,7,11,15] and target = 9?",
        user: "I’d take one number, then loop through the rest of the array to add them up. I’m not sure about the indices yet.",
        interviewer:
          "Good instinct! To make it complete, consider using two loops: one to select the first number at index i, and another starting from i+1 to pick the second number. This ensures distinct indices, which is a requirement. For example, you’d check pairs like (2,7) to get 9. Does that clarify the structure? Want to refine this approach, start coding, or discuss another idea?",
        user: "Let’s refine it a bit more.",
      },
    },
    {
      description: "Candidate Fully Explains Brute Force Approach",
      example_conversation: {
        user: "I’d use two nested loops for Two Sum. The outer loop picks a number at index i, the inner loop starts at i+1 and picks a number at index j. I add nums[i] and nums[j], and if they equal the target, I return [i, j]. For nums = [3,2,4] and target = 6, I’d find the pair 2 and 4 at indices 1 and 2.",
        interviewer:
          "That’s a clear and accurate description of the brute force approach! You’ve nailed the idea of checking all pairs with nested loops and ensuring distinct indices, which satisfies the problem’s constraints. This approach has O(n²) time complexity due to checking every pair. Can you think of ways to improve its efficiency, or are you satisfied with it? Ready to code it, or want to explore another approach?",
        user: "I’ll code this one first.",
        interviewer:
          "Great choice! Let me know if you need clarification while coding, or we can discuss optimizations later.",
      },
    },
    {
      description:
        "Candidate Partially Explains Hash Table Approach with Misunderstanding",
      example_conversation: {
        user: "I think I’d use some kind of storage, like a dictionary, to keep track of numbers. For each number, I’d check if it helps me get to the target, like for nums = [2,7,11,15], target = 9.",
        interviewer:
          "You’re on a promising path by considering storage to track numbers, which can make things more efficient. Can you clarify what you’d store and what you’d check? For instance, how would you use the dictionary to find the pair that sums to 9, and how do you handle returning indices?",
        user: "I’d store the numbers I see, and check if the target minus the current number is there. I’m not sure how to get the indices, though.",
        interviewer:
          "Nice progress! You’re right to think about checking the complement (target minus the current number). To handle indices, consider storing each number’s index in the dictionary alongside the number. That way, when you find the complement, you can retrieve its index. Does that make sense? Want to refine this further, try coding it, or get another hint?",
        user: "Can you give me another hint to clarify this?",
      },
    },
    {
      description: "Candidate Fully Explains Single-Pass Hash Table Approach",
      example_conversation: {
        user: "For Two Sum, I’d use a dictionary to store numbers and their indices. I’d iterate through the array, and for each number, calculate the complement (target minus the number). If the complement is in the dictionary, I return its index and the current index. Otherwise, I add the current number and its index to the dictionary. For nums = [2,7,11,15], target = 9, when I get to 7, I see 9 - 7 = 2 is in the dictionary at index 0, so I return [0,1].",
        interviewer:
          "That’s an excellent and thorough explanation of the single-pass hash table approach! You’ve covered storing numbers with indices, checking the complement, and ensuring distinct indices, which is efficient at O(n) time complexity. Your example is spot-on. Are there any edge cases, like duplicate numbers, you’d want to consider? Ready to code this, or want to explore another approach?",
        user: "I’m ready to code it.",
        interviewer:
          "Awesome! Let me know if you hit any snags while coding, or we can discuss edge cases afterward.",
      },
    },
    {
      description:
        "Candidate Partially Explains Approach Using Array Indices Instead of Hash Table",
      example_conversation: {
        user: "I think I can solve Two Sum by using the array indices directly. Like, for nums = [2,7,11,15] and target = 9, I’d check if the index of the number I need is in the array. Maybe I’d loop through and use the indices to find the pair.",
        interviewer:
          "Interesting idea! It sounds like you’re thinking about using the array’s structure to find the pair. Can you clarify how you’d use the indices to find the numbers that sum to 9? For example, how would you determine which index corresponds to the second number in the pair?",
        user: "I’d loop through the array, and for each number, I’d try to find the index of target minus that number in the array. Like, for 2, I’d look for the index of 7.",
        interviewer:
          "I see what you’re getting at—you’re trying to find the complement’s index directly. The challenge is that searching the array for the complement (e.g., 7 for 2) requires scanning the array each time, which can be slow, and you’d need to ensure distinct indices. For instance, in nums = [3,2,4], target = 6, you’d need to find the index of 4 when processing 2. Consider how you might make this faster or track indices more efficiently. Does that help clarify the issue? Want to refine this approach, try a different one, or start coding?",
        user: "Can we refine this idea a bit more?",
      },
    },
  ],

  solutions: {
    bruteForce: {
      approach: "Brute Force - Nested Loop",
      timeComplexity: "O(n²)",
      spaceComplexity: "O(1)",
      description: "Check every pair of numbers to see if they sum to target.",
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
