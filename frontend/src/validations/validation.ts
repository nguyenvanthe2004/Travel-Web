import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const validateLoginForm = (data: LoginFormData) => {
  return loginSchema.safeParse(data);
};

export const validateLoginField = (
  field: keyof LoginFormData,
  value: string
) => {
  return loginSchema.partial().safeParse({ [field]: value });
};

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const validateRegisterForm = (data: RegisterFormData) =>
  registerSchema.safeParse(data);

export const validateRegisterField = (
  field: keyof RegisterFormData,
  value: string
) => {
  return registerSchema.partial().safeParse({
    [field]: value,
  });
};

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers"),
});

export type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

export const validateVerifyForm = (data: VerifyCodeFormData) =>
  registerSchema.safeParse(data);

export const validateVerifyField = (
  field: keyof VerifyCodeFormData,
  value: string
) => {
  return verifyCodeSchema.partial().safeParse({
    [field]: value,
  });
};

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const validateForgotPasswordForm = (data: ForgotPasswordFormData) =>
  registerSchema.safeParse(data);

export const validateForgotPasswordField = (
  field: keyof ForgotPasswordFormData,
  value: string
) => {
  return forgotPasswordSchema.partial().safeParse({
    [field]: value,
  });
};
