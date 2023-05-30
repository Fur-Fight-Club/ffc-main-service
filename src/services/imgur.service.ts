import { Injectable } from "@nestjs/common";
import { ImgurClient } from "imgur";

@Injectable()
export class ImgurService {
  private readonly imgurClient = new ImgurClient({
    clientSecret: process.env.IMGUR_SECRET,
  });
  constructor() {}

  async uploadImage(base64: string): Promise<ImageData> {
    const image = await this.imgurClient.upload({
      type: "base64",
      image: base64,
    });

    return {
      success: image.success,
      link: image.data.link,
    };
  }
}

export interface ImageData {
  success: boolean;
  link?: string;
}
