import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import db from '../configs/database.config';
import { BadRequest, NotFound } from '../core/error.response';

export const create = async ({ username, email, password }) => {
  const id = uuidv4();
  const hashPassword = await bcrypt.hashSync(password, 10);

  const [insertResult, insertFields] = await db.query(
    `INSERT INTO users (id, username, email, password) VALUES (?,?,?,?)`,
    [id, username, email, hashPassword],
  );

  if (insertResult.affectedRows <= 0) {
    throw new BadRequest('Unable to create user');
  }

  const [selectResult, selectFields] = await db.query(
    `SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?`,
    [id],
  );

  return selectResult[0];
};

export const findAll = async () => {
  const [selectResult, selectFields] = await db.query(`
    SELECT id, username, email, created_at, updated_at FROM users
  `);

  return selectResult;
};

export const findOne = async (id) => {
  const [selectResult, selectFields] = await db.query(
    `SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?`,
    [id],
  );

  if (!selectResult && selectResult.length <= 0) {
    throw new NotFound('User not found');
  }

  return selectResult[0];
};

export const update = async (id, username) => {
  const updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const [updateResults, updateFields] = await db.query(
    `
      UPDATE users SET username = ?, updated_at = ? WHERE id = ?
    `,
    [username, updatedAt, id],
  );

  if (updateResults.affectedRows <= 0) {
    throw new BadRequest('Unable to update user');
  }

  const [selectResult, selectFields] = await db.query(
    `SELECT id, username, email, created_at, updated_at FROM users WHERE id = ?`,
    [id],
  );

  return selectResult[0];
};

export const remove = async (id) => {
  await db.query(`DELETE FROM users WHERE id = ?`, [id]);

  return { message: 'Successfully removed user' };
};
