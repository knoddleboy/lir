import sharp from "sharp";

import { Logger } from "@nestjs/common";

export async function cropImage(base64: string) {
  const buffer = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  try {
    const imageInfo = await sharp(buffer).metadata();
    const minDimension = Math.min(imageInfo.width!, imageInfo.height!);
    const centerOffsetX = Math.max(0, (imageInfo.width! - minDimension) / 2);
    const centerOffsetY = Math.max(0, (imageInfo.height! - minDimension) / 2);

    const croppedBuffer = await sharp(buffer)
      .extract({
        left: centerOffsetX,
        top: centerOffsetY,
        width: minDimension,
        height: minDimension,
      })
      .resize(120, 120)
      .png()
      .toBuffer();

    return croppedBuffer.toString("base64");
  } catch (error) {
    Logger.error("Error cropping image:", error);
  }
}
