import { UserRepository } from "../repositories/UserRepository";

export async function generateVerifyCode(length = 6, userRepo: UserRepository) {
  const chars = "0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  const existingUser = await userRepo.findByCode(code);
  if (existingUser) {
    return generateVerifyCode(length, userRepo);
  }

  return code;
}
