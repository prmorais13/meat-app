import { Request, Response } from 'express';
import { User, users } from './user';

export const handleAuthentication = (req: Request, res: Response) => {
  const user: User = req.body;

  if (isValid(user)) {
    const dbUser: User = users[user.email];
    res.json(dbUser);
  } else {
    res.status(403).json({ message: 'Dados inválidos!' });
  }
};
function isValid(user: User): boolean {
  if (!user) {
    return false;
  }
  const dbUser = users[user.email];
  return dbUser !== undefined && dbUser.matches(user);
}
