import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const qrtype = searchParams.get("qrtype");
  const authorization = req.headers.get("authorization");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  const endpoint = `${baseUrl}/qr-data`;

  try {
    const response = await axios.get(endpoint, {
      params: qrtype ? { qrtype } : {},
      headers: authorization ? { Authorization: authorization } : {},
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    const status = error?.response?.status || 500;
    const upstreamMessage =
      error?.response?.data?.message ||
      error?.response?.statusText ||
      error?.message ||
      "Unknown error";

    console.error("QR Types API Error:", upstreamMessage);

    return new Response(
      JSON.stringify({
        message: "QR Types fetch failed",
        error: upstreamMessage,
      }),
      { status, headers: { "Content-Type": "application/json" } }
    );
  }
}
