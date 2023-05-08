import {
  Inject,
  Injectable,
  Provider,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { EmailApi } from "./mails.schema";
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
    invoice_id: string,
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

    checkApiResponse(response, {
      400: (response) => new UnprocessableEntityException(response),
    });

    return response;
  }

  async sendWithdrawInvoiceEmail(
    email: string,
    name: string,
    invoice_id: string,
    invoice_url: string,
    totalWithdraw: number,
    feesPercentage: string,
    feesAmount: number,
    amount: number,
    lastDigits: string
  ): Promise<boolean> {
    const response = await handleApiResponse<boolean>(
      await this.notificationsApi.fetch(`emails/send-withdraw-invoice`, {
        method: "POST",
        body: JSON.stringify({
          email,
          name,
          invoice_id,
          invoice_url,
          totalWithdraw,
          feesPercentage,
          fees: feesAmount,
          amount,
          lastDigits,
        }),
      })
    );

    checkApiResponse(response, {
      400: (response) => new UnprocessableEntityException(response),
    });

    return response;
  }
}

export const EmailApiProvider: Provider = {
  provide: EmailApi,
  useClass: EmailsApiImpl,
};
