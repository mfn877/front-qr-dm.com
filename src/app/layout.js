import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "bootstrap-icons/font/bootstrap-icons.css";

export const metadata = {
  title: "QR DM - Create Smart QR Codes in Seconds",
  description: "Fast, clean, and powerful QR generation for everyone. Create smart QR codes in seconds. Fast, clean, and powerful.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="shortcut icon"
          href="/images/favicon.ico"
          type="image/x-icon"
        />
        <link href="/css/bootstrap.min.css" rel="stylesheet"></link>
        <link href="/css/style.css" rel="stylesheet"></link>        
      </head>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <script src="/js/bootstrap.bundle.min.js"></script>
        <script src="https://use.fontawesome.com/9327b87e73.js"></script>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2935472896824690" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
