import { Test, TestingModule } from "@nestjs/testing";
import { ImgurService, ImageData } from "./imgur.service";
import { BadGatewayException } from "@nestjs/common";
import { ImgurApiResponse, ImgurClient } from "imgur";

describe("ImgurService", () => {
  let service: ImgurService;
  let imgurClient: ImgurClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImgurService],
    }).compile();

    service = module.get<ImgurService>(ImgurService);
    imgurClient = new ImgurClient({
      clientSecret: process.env.IMGUR_SECRET,
      clientId: "291c29461d203c1",
    });
  });

  describe("uploadImage", () => {
    it("should upload an image to Imgur and return the image data", async () => {
      const base64Image = "base64image";
      const uploadResult: ImgurApiResponse<ImageData> = {
        success: true,
        data: {
          link: "https://example.com/image.jpg",
          success: true,
          // Other image data properties
        },
        headers: {},
        status: 200,
      };
      // @ts-ignore
      jest.spyOn(imgurClient, "upload").mockResolvedValueOnce(uploadResult);

      const result = await service.uploadImage(base64Image);

      expect(imgurClient.upload).toHaveBeenCalledWith({
        type: "base64",
        image: base64Image,
      });
      expect(result).toEqual(uploadResult);
    });

    it("should throw a BadGatewayException if there is an error uploading the image", async () => {
      const base64Image = "base64image";
      const error = new Error("Error uploading image");
      jest.spyOn(imgurClient, "upload").mockRejectedValueOnce(error);

      await expect(service.uploadImage(base64Image)).rejects.toThrowError(
        BadGatewayException
      );
    });
  });
});
