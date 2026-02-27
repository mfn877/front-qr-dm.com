// import axios from "axios";

// export async function GET() {
//   try {
//     const response = await axios.get("https://qr-dm.com/qr-types", {
//       headers: {
//         Accept: "application/json",
//         // If your API needs token, add it here
//         // Authorization: "Bearer YOUR_TOKEN",
//       },
//       timeout: 10000,
//     });

//     return new Response(JSON.stringify(response.data), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("QR Types API Error:", error.message);

//     return new Response(
//       JSON.stringify({
//         message: "QR Types fetch failed",
//         error: error.message,
//       }),
//       { status: 500 }
//     );
//   }
// }


import axios from "axios";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    // const endpoint = baseUrl ? `${baseUrl}/qr-types` : "https://qr-dm.com/qr-types";
    const endpoint = `${baseUrl}/qr-types`;

    const response = await axios.get(endpoint, {
      headers: {
        Accept: "application/json",
      },
      timeout: 10000,
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
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
