
--Leetcode 1661. Average Time of Process per Machine



SELECT duration_table.machine_id, AVG(duration)
FROM (
    SELECT a1.machine_id,  a2.timestamp - a1.timestamp as duration 
    FROM Activity a1
    JOIN Activity a2
    ON a1.machine_id=a2.machine_id and a1.process_id=a2.process_id and a1.activity_type='start' and a2.activity_type='end'
) AS duration_table;
GROUP BY duration_table.machine_id;




-- 577. Employee Bonus


SELECT name, bonus
FROM Employee e
LEFT JOIN Bonus b
ON e.empId = b.empId 
WHERE b.bonus < 1000 OR b.bonus IS NULL;



-- 1280. Students and Examinations

SELECT COUNT(student_id,subject_name) as attended_exams 
FROM Examinations
GROUP BY student_id,subject_name






