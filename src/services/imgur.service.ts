import { BadGatewayException, Injectable } from "@nestjs/common";
import { ImgurClient } from "imgur";

@Injectable()
export class ImgurService {
  private readonly imgurClient = new ImgurClient({
    clientSecret: process.env.IMGUR_SECRET,
  });
  constructor() {}

  async uploadImage(base64: string): Promise<ImageData> {
    try {
      const image = await this.imgurClient.upload({
        type: "base64",
        image: base64,
      });

      return {
        success: image.success,
        link: image.data.link,
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}

export interface ImageData {
  success: boolean;
  link?: string;
}
