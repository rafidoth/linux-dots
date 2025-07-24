
--Leetcode 1661. Average Time of Process per Machine

SELECT a1.machine_id, a1.timestamp as startTimestamp, a2.timestamp as endTimestamp 
FROM Activity a1
JOIN Activity a2
ON a1.machine_id=a2.machine_id and a1.process_id=a2.process_id and a1.activity_type='start' and a2.activity_type='end'

-- | machine_id | startTimestamp | endTimestamp |
-- | ---------- | -------------- | ------------ |
-- | 0          | 0.712          | 1.52         |
-- | 0          | 3.14           | 4.12         |
-- | 1          | 0.55           | 1.55         |
-- | 1          | 0.43           | 1.42         |
-- | 2          | 4.1            | 4.512        |
-- | 2          | 2.5            | 5            |



SELECT a1.machine_id,  a2.timestamp - a1.timestamp as duration, AVG(duration)
FROM Activity a1
JOIN Activity a2
ON a1.machine_id=a2.machine_id and a1.process_id=a2.process_id and a1.activity_type='start' and a2.activity_type='end'
