
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

SELECT s.student_id, s.student_name, exams.attended_exams
FROM Students s
LEFT JOIN (
    SELECT student_id,Subjects.subject_name, COUNT(student_id) as attended_exams 
    FROM Examinations
    ON Subjects.subject_name = Examinations.subject_name
    GROUP BY student_id,subject_name
    ORDER BY student_id
ON s.student_id = exams.student_id;


SELECT s.student_id, s.student_name, subs.subject_name, e.attended_exams
FROM Students s
CROSS JOIN Subjects subs
LEFT JOIN (
    SELECT  student_id,COUNT(student_id) as attended_exams
    FROM Examinations
    GROUP BY student_id, subject_name
) as e 
ON s.student_id = e.student_id







