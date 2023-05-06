import {
  Inject,
  Injectable,
  Provider,
  UnauthorizedException,
} from "@nestjs/common";
import { EmailApi } from "./mails.interface";
import { checkApiResponse, handleApiResponse } from "src/utils/api.utils";
import { NotificationsApi } from "../notifications.interface";

@Injectable()
class EmailsApiImpl implements EmailApi {
  constructor(
    @Inject(NotificationsApi) private notificationsApi: NotificationsApi
  ) {}

  async sendConfirmationEmail(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    const response = await handleApiResponse<boolean>(
      await this.notificationsApi.fetch(`emails/send-account-confirmation`, {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          email_token,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async sendPasswordResetEmail(
    email: string,
    name: string,
    email_token: string
  ): Promise<boolean> {
    const response = await handleApiResponse<boolean>(
      await this.notificationsApi.fetch(`emails/send-password-reset`, {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          email_token,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }

  async sendInvoiceEmail(
    email: string,
    name: string,
    price: number,
    invoice_id: number,
    attachment: string
  ): Promise<boolean> {
    const response = await handleApiResponse<boolean>(
      await this.notificationsApi.fetch(`emails/send-invoice`, {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          price,
          invoice_id,
          attachment,
        }),
      })
    );

    checkApiResponse(response);

    return response;
  }
}

export const EmailApiProvider: Provider = {
  provide: EmailApi,
  useClass: EmailsApiImpl,
};
