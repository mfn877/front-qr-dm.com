"use client";

export default function DisclaimerPage() {
  return (
    <div className="container">

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>General Information Disclaimer</h2>
      <p>
        QR DM is a QR code generation platform that allows users to create, download, and share QR
        codes for personal, academic, and business use. While we strive to provide a reliable and
        accurate service, QR DM makes no guarantees regarding the completeness, accuracy,
        reliability, or availability of the website, tools, or generated QR codes.
      </p>
      <p>
        Any reliance you place on the information or services provided through QR DM is strictly at
        your own risk.
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>No Professional Advice</h2>
      <p>
        QR DM does not provide legal, financial, medical, security, or professional advice of any
        kind. Any information generated, shared, or accessed through QR codes should not be
        considered a substitute for professional advice.
      </p>
      <p>
        You are responsible for verifying the accuracy and suitability of any content before relying
        on it or sharing it with others.
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>QR Code Content Disclaimer</h2>
      <p>
        QR DM does not review, monitor, verify, or control the content embedded in QR codes created
        by users. All QR code content is created and managed solely by users.
      </p>
      <p>
        QR DM is not responsible for the legality, accuracy, safety, or appropriateness of any
        content accessed through QR codes, including links to third-party websites, documents,
        payment pages, or external services.
      </p>
      <p> Users are solely responsible for ensuring that their QR code content complies with applicable laws, regulations, and platform policies. </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>External Links Disclaimer</h2>
      <p>
        QR codes generated through QR DM may redirect users to third-party websites, applications,
        or services that are not owned or controlled by QR DM.
      </p>
      <p>
        QR DM does not endorse, guarantee, or assume responsibility for any third-party content, privacy policies, practices, products, or services. Accessing external links through QR codes is done at your own risk. 
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Technical Limitations Disclaimer</h2>
      <p>
        QR DM does not guarantee that QR codes will work on all devices, scanners, operating
        systems, browsers, or environments.
      </p>
      <p>
        Scan analytics provided by QR DM are estimates and may not be fully accurate due to device
        limitations, network issues, ad blockers, or browser settings.
      </p>
      <p>QR DM is not responsible for missed scans, incorrect analytics data, or performance variations.  </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Dynamic QR Codes Disclaimer</h2>
      <p>
        Dynamic QR codes allow users to update destination content without changing the QR image.
        QR DM does not guarantee uninterrupted access to dynamic QR redirection services.
      </p>
      <p>
        QR DM reserves the right to modify, suspend, or discontinue dynamic QR features at any time
        without notice.
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Payments and Financial Disclaimer</h2>
      <p>
        QR DM may allow users to generate QR codes that link to third-party payment platforms. QR DM
        does not process payments, store financial information, or handle transactions.
      </p>
      <p>
       All financial transactions occur solely between users and third-party payment providers. QR DM is not responsible for payment failures, disputes, refunds, chargebacks, or fraud. 
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Downloads and File Hosting Disclaimer</h2>
      <p>
        QR DM allows users to download QR codes in formats such as PNG and SVG and may allow
        document or PDF uploads for QR sharing.
      </p>
      <p>
      QR DM does not guarantee permanent storage or availability of uploaded files. Users are responsible for maintaining backups of their data and ensuring they have the right to upload and distribute any files. 
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Advertising and Google AdSense Disclaimer </h2>
      <p>
        QR DM may display advertisements, including ads served by Google AdSense or other advertising partners. 
      </p>
      <p> QR DM does not endorse any products or services advertised on the website and is not responsible for advertiser claims, content, or offers. </p>
      <p>Users must not engage in invalid ad activity, including clicking ads repeatedly, encouraging others to click ads, or using automated tools. Any misuse that violates advertising policies may result in restricted access to the website.  </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, QR DM shall not be liable for any loss or damage, including but not limited to indirect, incidental, consequential, or special damages, arising out of or in connection with the use of the website, QR codes, analytics, downloads, or third-party links. 
      </p>
      <p> This includes loss of data, loss of revenue, business interruption, reputational damage, or security incidents. </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>User Responsibility</h2>
      <p>
       By using QR DM, you accept full responsibility for how you use the platform and the consequences of generating, sharing, or scanning QR codes. 
      </p>
      <p> You are responsible for ensuring that your use of QR DM complies with all applicable laws, regulations, and third-party policies. </p>
      
      <h2 style={{ fontSize: 22, marginBottom: 16 }}>No Guarantees</h2>
      <p>
      QR DM provides services on an “as is” and “as available” basis. We do not guarantee uninterrupted service, error-free operation, or that the website will be free from viruses or harmful components. 
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Changes to This Disclaimer</h2>
      <p>
      QR DM reserves the right to update or modify this Disclaimer at any time without prior notice. Changes will be posted on this page with an updated revision date. Continued use of the website constitutes acceptance of the updated Disclaimer. 
      </p>

      <h2 style={{ fontSize: 22, marginBottom: 16 }}>Contact Information</h2>
      <p>
         <strong>Email:</strong>{" "}
           <a href="mailto:info@qrdm.com" style={{ color: "#2563eb" }}>
             info@qrdm.com
      </a>
    <br />

         <strong>Website:</strong>{" "}
        <a
         href="http://qr-dm.cm"
         target="_blank"
         rel="noopener noreferrer"
         style={{ color: "#2563eb" }}
        >
       http://qr-dm.cm
       </a>
      </p>
    </div>
  );
}
