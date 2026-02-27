export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get("file");

  if (!fileUrl) {
    return new Response("File URL missing", { status: 400 });
  }

  // ✅ ALLOWED DOMAINS (SECURITY CHECK)
  const allowedDomains = [
    "https://api.qr-dm.com/storage/",
    "https://cloudinary-marketing-res.cloudinary.com/",
  ];

  const isAllowed = allowedDomains.some((domain) =>
    fileUrl.startsWith(domain)
  );

  if (!isAllowed) {
    return new Response("Unauthorized file source", { status: 403 });
  }

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return new Response("File not found", { status: 404 });
    }

    const contentType =
      response.headers.get("content-type") ||
      "application/octet-stream";

    // Extract filename safely (remove query params)
    const urlParts = fileUrl.split("/");
    const lastPart = urlParts[urlParts.length - 1];
    const fileName = lastPart.split("?")[0] || "download-file";

    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    return new Response("Download failed", { status: 500 });
  }
}
