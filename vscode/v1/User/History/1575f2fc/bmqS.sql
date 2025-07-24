
--Leetcode 1661. Average Time of Process per Machine



SELECT duration_table.machine_id, AVG(duration)
FROM (
    SELECT a1.machine_id,  a2.timestamp - a1.timestamp as duration 
    FROM Activity a1
    JOIN Activity a2
    ON a1.machine_id=a2.machine_id and a1.process_id=a2.process_id and a1.activity_type='start' and a2.activity_type='end'
) AS duration_table;
GROUP BY duration_table.machine_id