"use server";
import { IImagesData, IUploadedFile } from "@/shared/types/file";
import { addProps } from "@/shared/utils/common";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { imageSize } from "image-size";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";

const bucketName = process.env.AWS_BUCKET_NAME;
const endpoint = process.env.AWS_ENDPOINT;

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function deleteFiles(files: string[]) {
  await Promise.all(
    files.map(async (file) => {
      const filename = file.split(`${bucketName}/`)[1];
      console.log(filename);
      const aws = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: filename,
        }),
      );
    }),
  );
}

export async function deleteFile(file: any) {
  console.log("KEY:::: ", file);
  const aws = await s3Client.send(
    new DeleteObjectCommand({
      Bucket: bucketName,
      Key: file,
    }),
  );
}

export async function optimazeUploadedFiles(files: File[]) {
  let result: string[] = [];

  await Promise.all(
    files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePrefix = uuidv4();
      await sharp(buffer)
        .jpeg({ quality: 90 })
        .toBuffer({ resolveWithObject: true })
        .then(async (img) => {
          const dimension = imageSize(img.data);
          const filename = filePrefix + "_original" + "." + dimension.type;
          const presignedUrl = await getSignedUrl(
            s3Client,
            new PutObjectCommand({
              Bucket: bucketName,
              Key: filename,
              ContentType: "image/jpeg",
            }),
            { expiresIn: 60 },
          );
          await fetch(presignedUrl, {
            method: "PUT",
            body: img.data,
          });

          const data = {
            url: `${endpoint}/${bucketName}/${filename}`,
            name: filename,
            dimension,
          };
          result.push(data);
        });
    }),
  );
  return JSON.stringify(result);
}
