import api from "@/lib/api";

/**
 * Fetch QR data by type
 * @param {number|null} qrtype
 */
export async function fetchQrData({ qrtype }) {
  try {
    const res = await api.get("/qr-data", {
      // backend expects qrtype in body (non-standard but supported)
      params: qrtype ? { qrtype } : {},
      data: {
        qrtype,
      },
    });
    return res.data.data;
  } catch (error) {
    console.error("fetchQrData error:", error);
    // normalize axios error for caller
    throw {
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch QR data",
      status: error?.response?.status || 500,
      raw: error,
    };
  }
}
