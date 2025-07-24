import { Request, Response } from 'express';
import { pool } from '../../config/database';
import { v4 as uuidv4 } from 'uuid';
import { validateEmail } from '../../utils/validation';
import { JobPosting, JobPostingResponse } from '../../types/jobPosting';

export class JobPostingController {
    // Create a new job posting
    static async createJobPosting(req: Request, res: Response) {
        try {
            const { post_body, company_address, position, deadline, contact_email } = req.body;
            const userId = req.user?.user_id;

            // Validate required fields
            if (!userId || !post_body || !company_address || !position || !deadline || !contact_email) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            // Validate email format
            if (!validateEmail(contact_email)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Validate deadline
            if (new Date(deadline) <= new Date()) {
                return res.status(400).json({ error: 'Deadline must be in the future' });
            }

            const job_id = uuidv4();
            const query = `
                INSERT INTO Job_Postings (job_id, user_id, post_body, company_address, position, deadline, contact_email)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            await pool.execute(query, [
                job_id,
                userId,
                post_body,
                company_address,
                position,
                deadline,
                contact_email
            ]);

            return res.status(201).json({ message: 'Job posting created successfully', job_id });
        } catch (error) {
            console.error('Error creating job posting:', error);
            return res.status(500).json({ error: 'Failed to create job posting' });
        }
    }

    // Get job postings with optional filters
    static async getJobPosts(req: Request, res: Response) {
        try {
            const { position, deadline, postedBy } = req.query;
            let query = `
                SELECT 
                    jp.job_id,
                    jp.post_body,
                    jp.company_address,
                    jp.position,
                    jp.deadline,
                    jp.contact_email,
                    u.name as posted_by_name,
                    u.email as posted_by_email
                FROM Job_Postings jp
                JOIN Users u ON jp.user_id = u.user_id
            `;
            const params: any[] = [];

            const conditions: string[] = [];
            if (position) {
                conditions.push('jp.position = ?');
                params.push(position);
            }
            if (deadline) {
                conditions.push('jp.deadline >= ?');
                params.push(deadline);
            }
            if (postedBy) {
                conditions.push('jp.user_id = ?');
                params.push(postedBy);
            }

            if (conditions.length > 0) {
                query += ` WHERE ${conditions.join(' AND ')}`;
            }

            query += ' ORDER BY jp.created_at DESC';

            const [rows] = await pool.execute(query, params);
            return res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching job posts:', error);
            return res.status(500).json({ error: 'Failed to fetch job posts' });
        }
    }

    // Edit a job posting
    static async editJobPost(req: Request, res: Response) {
        try {
            const { job_id } = req.params;
            const { post_body, company_address, position, deadline, contact_email } = req.body;
            const userId = req.user?.user_id;

            // Validate required fields
            if (!job_id || !userId) {
                return res.status(400).json({ error: 'Job ID and user ID are required' });
            }

            // Check if user owns the job posting or is admin
            const [job] = await pool.execute(
                'SELECT user_id FROM Job_Postings WHERE job_id = ?',
                [job_id]
            );

            if (!job[0]) {
                return res.status(404).json({ error: 'Job posting not found' });
            }

            const jobOwnerId = job[0].user_id;
            const isAdmin = req.user?.user_type === 'Admin';

            if (!isAdmin && jobOwnerId !== userId) {
                return res.status(403).json({ error: 'Unauthorized to edit this job posting' });
            }

            // Update the job posting
            const updateFields: string[] = [];
            const updateParams: any[] = [];

            if (post_body) updateFields.push('post_body = ?'), updateParams.push(post_body);
            if (company_address) updateFields.push('company_address = ?'), updateParams.push(company_address);
            if (position) updateFields.push('position = ?'), updateParams.push(position);
            if (deadline) updateFields.push('deadline = ?'), updateParams.push(deadline);
            if (contact_email) {
                if (!validateEmail(contact_email)) {
                    return res.status(400).json({ error: 'Invalid email format' });
                }
                updateFields.push('contact_email = ?');
                updateParams.push(contact_email);
            }

            if (updateFields.length === 0) {
                return res.status(400).json({ error: 'No fields to update' });
            }

            const updateQuery = `
                UPDATE Job_Postings 
                SET ${updateFields.join(', ')}
                WHERE job_id = ?
            `;

            updateParams.push(job_id);
            await pool.execute(updateQuery, updateParams);

            return res.status(200).json({ message: 'Job posting updated successfully' });
        } catch (error) {
            console.error('Error updating job posting:', error);
            return res.status(500).json({ error: 'Failed to update job posting' });
        }
    }

    // Delete a job posting
    static async deleteJobPost(req: Request, res: Response) {
        try {
            const { job_id } = req.params;
            const userId = req.user?.user_id;

            // Validate required fields
            if (!job_id || !userId) {
                return res.status(400).json({ error: 'Job ID and user ID are required' });
            }

            // Check if user owns the job posting or is admin
            const [job] = await pool.execute(
                'SELECT user_id FROM Job_Postings WHERE job_id = ?',
                [job_id]
            );

            if (!job[0]) {
                return res.status(404).json({ error: 'Job posting not found' });
            }

            const jobOwnerId = job[0].user_id;
            const isAdmin = req.user?.user_type === 'Admin';

            if (!isAdmin && jobOwnerId !== userId) {
                return res.status(403).json({ error: 'Unauthorized to delete this job posting' });
            }

            // Delete the job posting and its responses
            await pool.execute('DELETE FROM Job_Posting_Responses WHERE job_id = ?', [job_id]);
            await pool.execute('DELETE FROM Job_Postings WHERE job_id = ?', [job_id]);

            return res.status(200).json({ message: 'Job posting deleted successfully' });
        } catch (error) {
            console.error('Error deleting job posting:', error);
            return res.status(500).json({ error: 'Failed to delete job posting' });
        }
    }
}
