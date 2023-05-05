import { Inject, Injectable } from "@nestjs/common";
import { MatchMessageApi } from "src/api/notifications/match-message/match-message.interface";

@Injectable()
export class MatchService {
  constructor(
    @Inject(MatchMessageApi) private matchMessageApi: MatchMessageApi
  ) {}

  async sendMessage(sender: number, match: number, message: string) {
    return this.matchMessageApi.sendMessage(sender, match, message);
  }
}
