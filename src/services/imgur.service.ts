import { BadGatewayException, Injectable } from "@nestjs/common";
import { ImgurClient } from "imgur";

@Injectable()
export class ImgurService {
  private readonly imgurClient = new ImgurClient({
    clientSecret: process.env.IMGUR_SECRET,
    clientId: "291c29461d203c1",
  });
  constructor() {}

  async uploadImage(base64: string): Promise<ImageData> {
    base64 = base64.replace(/^data:image\/[a-z]+;base64,/, "");
    try {
      const image = await this.imgurClient.upload({
        type: "base64",
        image: base64,
      });

      return {
        success: image.success,
        link: image.data.link,
        data: image.data,
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}

export interface ImageData {
  success: boolean;
  link?: string;
  data?: any;
}
