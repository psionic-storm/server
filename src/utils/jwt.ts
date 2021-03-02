import jwt from 'jsonwebtoken';
import User, { UserInfo } from 'model/user-model';

export function createJWT(id: number): string {
  return jwt.sign({ id }, process.env.JWT_TOKEN || '');
}

export async function verifyJWT(token: string): Promise<UserInfo | null> {
  const verifyResult: any = jwt.verify(token, process.env.JWT_TOKEN || '');
  if (!verifyResult) {
    return null;
  }

  const { id } = verifyResult;
  return await User.findById(id);
}
