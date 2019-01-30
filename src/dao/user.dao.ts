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
        id: sqlUser['user_id'],
        username: sqlUser.username,
        password: '', // don't send back the passwords
        name: sqlUser.name
      };
    });
  } finally {
    client.release(); // release connection
  }
}

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
        id: sqlUser['user_id'],
        username: sqlUser.username,
        password: '', // don't send back the passwords
        name: sqlUser.name
      };
    } else {
      return undefined;
    }
  } finally {
    client.release(); // release connection
  }
}

export async function save(user: User): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const result = await client.query(
      `INSERT INTO users (username, password, name)
        VALUES  ($1, $2, $3)
        RETURNING user_id`,
      [user.username, user.password, user.name]
    );
    if (result.rows[0]) {
      const id = result.rows[0].user_id;
      return {
        ...user,
        id: id
      };
    } else {
      return undefined;
    }

  } finally {
    client.release(); // release connection
  }
}

