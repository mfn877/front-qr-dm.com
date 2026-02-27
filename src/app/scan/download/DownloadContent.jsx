"use client";

import { useSearchParams } from "next/navigation";
import QRPreview3 from "@/components/QRPreview3";

export default function DownloadContent() {
  const searchParams = useSearchParams();
  const value = searchParams.get("file");

  return <QRPreview3 value={value}/>;
}

     