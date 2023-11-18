import * as userSvc from '../services/user.service';

export const create = async (req, res) => {
  const { username, email, password } = req.body;

  const result = await userSvc.create({ username, email, password });

  res.created(result);
};

export const findAll = async (req, res) => {
  const result = await userSvc.findAll();

  res.ok(result);
};

export const findOne = async (req, res) => {
  const { id } = req.params;

  const result = await userSvc.findOne(id);

  res.ok(result);
};

export const update = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  const result = await userSvc.update(id, username);

  res.ok(result);
};

export const remove = async (req, res) => {
  const { id } = req.params;

  const result = await userSvc.remove(id);

  res.ok(result);
};
