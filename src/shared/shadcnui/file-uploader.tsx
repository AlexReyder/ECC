"use client";

import { IconUpload } from "@tabler/icons-react";
import * as React from "react";
import Dropzone, {
  type DropzoneProps,
  type FileRejection,
} from "react-dropzone";
import { toast } from "sonner";

import { cn } from "@/shared/utils";
import { formatBytes } from "@/shared/utils/common";
import { useState, useTransition } from "react";
import { deleteFile, optimazeUploadedFiles } from "../api/admin/upload";
import { IImagesData, IUploadedFile } from "../types/file";
import { ProductImageMover } from "./product-table/Form/ProductImageUploader/product-image-mover";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: IUploadedFile[] | [];
  onValueChange?: React.Dispatch<React.SetStateAction<IUploadedFile[]>>;
  progresses?: Record<string, number>;
  accept?: DropzoneProps["accept"];
  maxSize?: DropzoneProps["maxSize"];
  maxFiles?: DropzoneProps["maxFiles"];
  multiple?: boolean;
  disabled?: boolean;
}

export function FileUploader(props: FileUploaderProps) {
  const {
    value: valueProp,
    onValueChange,
    progresses,
    accept = { "image/*": [] },
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
  } = props;

  const [files, setFiles] = useState<IImagesData | {}>(props.value);
  const [isPending, startTransition] = useTransition();

  const onDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[],
  ) => {
    if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
      toast.error("Cannot upload more than 1 file at a time");
      return;
    }

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ file }) => {
        toast.error(`File ${file.name} was rejected`);
      });
    }

    const dataServer = await optimazeUploadedFiles(acceptedFiles);
    const data = JSON.parse(dataServer);
    console.log(data);
    startTransition(() => {
      const res = [...files, ...data];
      setFiles(res);
      onValueChange?.(res);
      console.log(res);
    });
  };

  async function onRemove(filename: string) {
    await deleteFile(filename);
    const findIndex = files.findIndex((el) => el.name === filename);
    const copyPrevState = JSON.parse(JSON.stringify(files));
    copyPrevState.splice(findIndex, 1);
    setFiles(copyPrevState);
    onValueChange?.(copyPrevState);
  }

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <Dropzone
        onDrop={onDrop}
        accept={accept}
        maxSize={maxSize}
        maxFiles={maxFiles}
        multiple={maxFiles > 1 || multiple}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={cn(
              "group border-muted-foreground/25 hover:bg-muted/25 relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed px-5 py-2.5 text-center transition",
              "ring-offset-background focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden",
              isDragActive && "border-muted-foreground/50",
              className,
            )}
            {...dropzoneProps}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <IconUpload
                    className="text-muted-foreground size-7"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-muted-foreground font-medium">
                  Перетащите файлы
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                <div className="rounded-full border border-dashed p-3">
                  <IconUpload
                    className="text-muted-foreground size-7"
                    aria-hidden="true"
                  />
                </div>
                <div className="space-y-px">
                  <p className="text-muted-foreground font-medium">
                    Перетащите файлы сюда или нажмите чтобы выбрать
                  </p>
                  <p className="text-muted-foreground/70 text-sm">
                    Вы можете загрузить до
                    {maxFiles > 1
                      ? ` ${maxFiles === Infinity ? "multiple" : maxFiles}
                     изображений по ${formatBytes(maxSize)} каждый`
                      : ` a file with ${formatBytes(maxSize)}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      <ProductImageMover
        data={files}
        setFiles={setFiles}
        setImages={onValueChange}
        removeFile={onRemove}
        key={JSON.stringify(files)}
      />
    </div>
  );
}
