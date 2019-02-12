import { User } from '../models/user';
import { connectionPool } from '../util/connection-util';

export async function authenticate(username: string): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const result = await client.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        const sqlUser = result.rows[0]; // there should only be 1 record
        if (sqlUser) {
            return {
                userId: sqlUser['user_id'],
                username: sqlUser['username'],
                password: sqlUser['password'],
                firstName: sqlUser['first_name'],
                lastName: sqlUser['last_name'],
                email: sqlUser['email'],
                role: sqlUser['role']
            };
        } else {
            return undefined;
        }
    } catch(err) {
        console.log(err);
    } finally {
      client.release(); // release connection
    }
  }