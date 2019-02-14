import { Reimbursement} from '../models/reimbursement';
import { connectionPool } from '../util/connection-util';

export async function findByStatus(id: number): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM reimbursements WHERE status = $1', [id]
        );
        return result.rows.map(sqlReimb => {
            return {
                reimbursementId: sqlReimb['reimbursement_id'],
                author: sqlReimb.author,
                amount: sqlReimb.amount,
                dateSubmitted: sqlReimb.dateSubmitted,
                dateResolved: sqlReimb.dateResolved,
                description: sqlReimb.description,
                resolver: sqlReimb.resolver,
                status: sqlReimb.status,
                type: sqlReimb.type
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
        return result.rows.map(sqlReimb => {
            return {
                reimbursementId: sqlReimb['reimbursement_id'],
                author: sqlReimb.author,
                amount: sqlReimb.amount,
                dateSubmitted: sqlReimb.dateSubmitted,
                dateResolved: sqlReimb.dateResolved,
                description: sqlReimb.description,
                resolver: sqlReimb.resolver,
                status: sqlReimb.status,
                type: sqlReimb.type
            };
        });
    } finally {
        client.release(); // release connection
    }
}

export async function submit(reimb: Reimbursement): Promise<Reimbursement> {
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
                '1970-01-01 00:00:00',
                $3,
                '0',
                '1',
                $4
            ) RETURNING *`, [reimb.author, reimb.amount, reimb.description, reimb.type]
        );
        const sqlReimb = result.rows[0]; // there should only be 1 record
        if (sqlReimb) {
             return {
                reimbursementId: sqlReimb['reimbursement_id'],
                author: sqlReimb['author'],
                amount: sqlReimb['amount'],
                dateSubmitted: sqlReimb['date_submitted'],
                dateResolved: sqlReimb['date_resolved'],
                description: sqlReimb['description'],
                resolver: sqlReimb['resolver'],
                status: sqlReimb['status'],
                type: sqlReimb['type']
            };
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.release(); // release connection
    }
}

export async function update (reimb: Reimbursement): Promise<Reimbursement> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            `UPDATE reimbursements SET
                date_resolved = now(),
                resolver = $2,
                status = $3
            WHERE reimbursement_id = $1 RETURNING *`, [reimb.reimbursementId, reimb.resolver, reimb.status]
        );
        const sqlReimb = result.rows[0];
        if (sqlReimb) {
            return {
                reimbursementId: sqlReimb['reimbursement_id'],
                author: sqlReimb['author'],
                amount: sqlReimb['amount'],
                dateSubmitted: sqlReimb['date_submitted'],
                dateResolved: sqlReimb['date_resolved'],
                description: sqlReimb['description'],
                resolver: sqlReimb['resolver'],
                status: sqlReimb['status'],
                type: sqlReimb['type']
            };
        } else {
            return undefined;
        }
    } finally {
        client.release(); // release connection
    }
}