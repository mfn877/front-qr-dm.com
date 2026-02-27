import { QR_TYPES } from "@/constants/qrTypes";

export function mapQrFromApi(qr) {
  const type = QR_TYPES.find((t) => t.id === qr.qrtype);

  return {
    id: qr.id,
    qid: qr.qid,

    title: getQrTitle(qr),
    label: qr.qrtype_label || "",
    typeId: qr.qrtype,
    typeName: qr?.qrtype_label || "QR",
    typeIcon: type?.icon || "qrcode",

    scans: qr.view ?? 0,
    track: qr.track === 1,

    svg: qr.file || null,

    content: qr.content || {},
    status: qr.status,
  };
}

function getQrTitle(qr) {
  if (qr.qrtype === 1) {
    return qr.content?.url || "URL QR";
  }
  return "QR Code";
}
