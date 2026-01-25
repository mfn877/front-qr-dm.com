import api from "@/lib/api";

/**
 * Fetch QR data by type
 * @param {number|null} qrtype
 */
export async function fetchQrData({ qrtype }) {
  const res = await api.get("/qr-data", {
    // backend expects qrtype in body (non-standard but supported)
    params: qrtype ? { qrtype } : {},
    data: {
      qrtype,
    },
  });

  return res.data.data;
}
