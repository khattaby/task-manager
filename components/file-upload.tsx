"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { $Enums } from "@prisma/client";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "./profile-avatar";
import Image from "next/image";
import { X } from "lucide-react";

interface FileUploaderProps {
  onChange: (
    value: {
      name: string;
      url: string;
      type: $Enums.FileType;
    }[]
  ) => void;
  value: {
    name: string;
    url: string;
    type: $Enums.FileType;
  }[];
}
export const FileUpload = ({ onChange, value }: FileUploaderProps) => {
  const [selectedType, setSelectedType] = useState<$Enums.FileType | undefined>(
    undefined
  );
  return (
    <div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-4">
          {value.map((file, index) => (
            <div
              key={file.url}
              className="relative w-[200px] h-[200px] rounded-lg"
            >
              <Image
                src={file.type === "IMAGE" ? file.url : "/pdf.png"}
                alt={file.name}
                className="object-cover rounded-lg"
                fill
              />
              <button 
                onClick={() => {
                  onChange(value.filter((f) => f.url !== file.url));
                }}
                className="absolute top-2 -right-2 p-1 bg-rose-500 text-white rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedType ? (
        <UploadDropzone
          endpoint={
            selectedType === "IMAGE" ? "imageUploader" : "documentUploader"
          }
          onClientUploadComplete={(res) => {
            const newFile = res.map((f) => ({
              name: f.name,
              url: f.url,
              type: selectedType,
            }));

            const updateFiles = [...value, ...newFile];
            onChange(updateFiles);
            setSelectedType(undefined);
          }}
          onUploadError={(err) => {
            console.log(err);
          }}
        />
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => setSelectedType("IMAGE")}
            className={cn(
              selectedType === "IMAGE" && "bg-slate-200 text-white"
            )}
          >
            Image
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setSelectedType("PDF")}
            className={cn(selectedType === "PDF" && "bg-slate-200 text-white")}
          >
            PDF
          </Button>
        </div>
      )}
    </div>
  );
};
