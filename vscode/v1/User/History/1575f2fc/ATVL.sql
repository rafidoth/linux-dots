
--Leetcode 1661. Average Time of Process per Machine

SELECT a1.machine_id, a1.timestamp as startTimestamp, a2.timestamp as endTimestamp 
FROM Activity a1
JOIN Activity a2
ON a1.machine_id=a2.machine_id and a1.process_id=a2.process_id and a1.activity_type='start' and a2.activity_type='end'

