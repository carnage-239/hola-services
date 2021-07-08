import { customAlphabet } from 'nanoid';

const VALID_CHARS = '0123456789abcdefghijklmnopqrstuvwxyz';
const SIZE = 30;

export const generateMediaKey = (): string => {
  const generator = customAlphabet(VALID_CHARS, SIZE);
  const key = generator();
  return key;
};
