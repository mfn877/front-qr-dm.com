"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getToken } from "@/utils/storage";
import { updateQrLabel } from "./updateQrLabel";

export const QR_TYPES_QUERY_KEY = ["qr-types"];
export const QRS_QUERY_KEY = ["qrs"];

export async function fetchQrTypes() {
  const res = await fetch("/api/qr-types", {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    let message = "Unable to fetch QR types";
    try {
      const errData = await res.json();
      message = errData?.error || errData?.message || message;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  const data = await res.json();
  if (data?.status_code !== 1 || !Array.isArray(data?.data)) {
    throw new Error(data?.message || "Failed to load QR types");
  }

  return data.data.filter((q) => q.status === 1);
}

export async function fetchQrs({ qrtype = null }) {
  const token = getToken();
  const res = await fetch("/api/qrs?qrtype=" + qrtype, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    let message = "Unable to fetch QRs";
    try {
      const errData = await res.json();
      message = errData?.error || errData?.message || message;
    } catch {
      // keep default message
    }
    throw new Error(message);
  }

  const data = await res.json();
  if (data?.status_code !== 1 || !Array.isArray(data?.data)) {
    throw new Error(data?.message || "Failed to load QRs");
  }
  return data.data.filter((q) => q.status === 1);
}

export function useQrTypesQuery(options = {}) {
  return useQuery({
    queryKey: QR_TYPES_QUERY_KEY,
    queryFn: fetchQrTypes,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}


export function useQrsQuery(qrtype = null, options = {}) {
  return useQuery({
    queryKey: [...QRS_QUERY_KEY, qrtype],
    queryFn: () => fetchQrs({ qrtype }),
    enabled: true,
    ...options,
  });

}

export function useUpdateQr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateQrLabel({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QRS_QUERY_KEY,
      });
    },
  });
}
