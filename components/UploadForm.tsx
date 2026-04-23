"use client";

import { useState } from "react";

import type { UploadResult } from "@/types";

type UploadFormProps = {
  onResult: (result: UploadResult) => void;
  userId: string;
};

export default function UploadForm({ onResult, userId }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!file) {
      setError("Please choose a CSV file.");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed.");
      }

      const uploadJson = (await uploadResponse.json()) as { upload_id?: string };
      const uploadId = uploadJson.upload_id;

      if (!uploadId) {
        throw new Error("Upload ID missing from response.");
      }

      const analyzeResponse = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upload_id: uploadId }),
      });

      if (!analyzeResponse.ok) {
        throw new Error("Analysis failed.");
      }

      const result = (await analyzeResponse.json()) as UploadResult;
      onResult(result);
    } catch {
      setError("Something went wrong while analysing the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Analysing..." : "Analyse"}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
