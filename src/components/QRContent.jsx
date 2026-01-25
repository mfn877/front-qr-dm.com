import UrlQR from "./qr-contents/UrlQR";
import WifiQR from "./qr-contents/WifiQR";
import PhoneQR from "./qr-contents/PhoneQR";
import SmsQR from "./qr-contents/SmsQR";
import EmailQR from "./qr-contents/EmailQR";
import VcardQR from "./qr-contents/VcardQR";
import LocationQR from "./qr-contents/LocationQR";
import TextQR from "./qr-contents/TextQR";
import WhatsAppQR from "./qr-contents/WhatsAppQR";
import ApplicationLinkQR from "./qr-contents/ApplicationLinkQR";
import DocumentQR from "./qr-contents/DocumentQR";
import PdfQR from "./qr-contents/PdfQR";
import EventQR from "./qr-contents/EventQR";
import AppDownloadQR from "./qr-contents/AppDownloadQR";
import PaymentQR from "./qr-contents/PaymentQR";
import MultiLinkQR from "./qr-contents/MultiLinkQR";
import BusinessCardQR from "./qr-contents/BusinessCardQR";

export default function QRContent({ type }) {
  // console.log("QR Type", type);
  switch (type) {

    case "business-card":
      return <BusinessCardQR />;

    case "multi-link":
      return <MultiLinkQR />;

    case "payment":
      return <PaymentQR />;

    case "app-download":
      return <AppDownloadQR />;

    case "event":
      return <EventQR />;

    case "pdf":
      return <PdfQR />;

    case "document":
      return <DocumentQR />;

    case "app-link":
      return <ApplicationLinkQR />;

    case "whatsapp":
      return <WhatsAppQR />;

    case "text":
      return <TextQR />;

    case "location":
      return <LocationQR />;

    case "vcard":
      return <VcardQR />;

    case "email":
      return <EmailQR />;

    case "sms":
      return <SmsQR />;

    case "wifi":
      return <WifiQR />;

    case "phone":
      return <PhoneQR />;

    case "url":
    default:
      return <UrlQR />;
  }
}
