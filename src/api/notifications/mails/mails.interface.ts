import { ApiProperty } from "@nestjs/swagger";

export interface EmailApi {
  sendConfirmationEmail(email: string, name: string, email_token: string): Promise<boolean>;
  sendPasswordResetEmail(email: string, name: string, email_token: string): Promise<boolean>;

}

export const EmailApi = "EmailApi";
