import { Reimbursement} from '../models/reimbursement';
import { connectionPool } from '../util/connection-util';

export async function findByStatus(id: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM reimbursements WHERE status = $1', [id]
        );
        return result.rows.map(sqlUser => {
            return {
                reimbursementId: sqlUser['reimbursement_id'],
                author: sqlUser.author,
                amount: sqlUser.amount,
                dateSubmitted: sqlUser.dateSubmitted,
                dateResolved: sqlUser.dateResolved,
                description: sqlUser.description,
                resolver: sqlUser.resolver,
                status: sqlUser.status,
                type: sqlUser.type
            };
        });
    } finally {
      client.release(); // release connection
    }
}

export async function findByUser(id: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM reimbursements WHERE author = $1', [id]
        );
        return result.rows.map(sqlUser => {
            return {
                reimbursementId: sqlUser['reimbursement_id'],
                author: sqlUser.author,
                amount: sqlUser.amount,
                dateSubmitted: sqlUser.dateSubmitted,
                dateResolved: sqlUser.dateResolved,
                description: sqlUser.description,
                resolver: sqlUser.resolver,
                status: sqlUser.status,
                type: sqlUser.type
            };
        });
    } finally {
      client.release(); // release connection
    }
}

export async function submit(reimb: Reimbursement): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `INSERT INTO reimbursements(
                reimbursement_id,
                author,
                amount,
                date_submitted,
                date_resolved,
                description,
                resolver,
                status,
                type
            ) VALUES (
                default,
                $1,
                $2,
                now(),
                '1970-01-01 00:00:00-00',
                '0',
                '1',
                $3
            )`, [reimb.author, reimb.amount, reimb.type]
        );
        return result.rows.map(sqlUser => {
            return {
                reimbursementId: sqlUser['reimbursement_id'],
                author: sqlUser.author,
                amount: sqlUser.amount,
                dateSubmitted: sqlUser.dateSubmitted,
                dateResolved: sqlUser.dateResolved,
                description: sqlUser.description,
                resolver: sqlUser.resolver,
                status: sqlUser.status,
                type: sqlUser.type
            };
        });
    } finally {
      client.release(); // release connection
    }
}