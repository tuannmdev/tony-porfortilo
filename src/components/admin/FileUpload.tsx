"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface FileUploadProps {
  bucket: string;
  folder?: string;
  onUploadComplete: (url: string) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  currentFile?: string | null;
}

export function FileUpload({
  bucket,
  folder = "",
  onUploadComplete,
  accept = "image/*",
  maxSizeMB = 5,
  label = "Upload File",
  currentFile,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const supabase = createClient();

      // Create unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : fileName;

      // Upload file
      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadComplete(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUploadComplete("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-32 object-cover border-2 border-border-retro"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 px-2 py-1 bg-accent-red text-white font-bold border border-border-retro hover:bg-accent-red/80"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-border-retro bg-bg-retro p-4 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <span className="material-symbols-outlined text-4xl text-text-muted">
              cloud_upload
            </span>
            <span className="text-sm text-text-muted">
              {uploading ? "Uploading..." : label}
            </span>
            <span className="text-xs text-text-muted">Max {maxSizeMB}MB</span>
          </label>
        </div>
      )}

      {error && (
        <p className="text-xs text-accent-red border border-accent-red bg-accent-red/10 p-2">
          {error}
        </p>
      )}
    </div>
  );
}
