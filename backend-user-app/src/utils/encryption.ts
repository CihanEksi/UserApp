import * as bcrypt from 'bcrypt';

const hashUnRecoveable = async (text: string,salt=10): Promise<string> => {
  return bcrypt.hash(text, salt);
};

const compareUnRecoverableTexts = async (
  text: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(text, hash);
};

export { hashUnRecoveable, compareUnRecoverableTexts };
