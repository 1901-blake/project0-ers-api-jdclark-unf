import { User } from '../models/user';
import { connectionPool } from '../util/connection-util';

export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users'
    );
    return result.rows.map(sqlUser => {
      return {
        userId: sqlUser['user_id'],
        username: sqlUser.username,
        password: '', // don't send back the passwords
        firstName: sqlUser.firstName,
        lastName: sqlUser.lastName,
        email: sqlUser.email,
        role: sqlUser.role
      };
    });
  } finally {
    client.release(); // release connection
  }
}

// Find User By ID
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    const sqlUser = result.rows[0]; // there should only be 1 record
    if (sqlUser) {
      return {
        userId: sqlUser['user_id'],
        username: sqlUser.username,
        password: '', // don't send back the passwords
        firstName: sqlUser.firstName,
        lastName: sqlUser.lastName,
        email: sqlUser.email,
        role: sqlUser.role
      };
    } else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}

export async function update(user: User): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      `UPDATE users SET (username = $2, password, = $3, first_name = $4, last_name = $4, email = $5, role = $6) WHERE user_id = $1
        RETURNING user_id`,
      [user.username, user.password, user.firstName, user.lastName, user.email, user.role]
    );
    if (result.rows[0]) {
      const id = result.rows[0].user_id;
      return {
        ...user,
        userId: id
      };
    } else {
      return undefined;
    }

  } finally {
    client.release(); // release connection
  }
}