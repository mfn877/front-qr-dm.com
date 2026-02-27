"use client";
import { useEffect, useRef } from "react";

export default function AdScriptSlot({ html, className = "" }) {
  const containerRef = useRef(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    
    // Exit if no container, no HTML, or already initialized
    if (!container || !html || typeof html !== "string" || isInitialized.current) {
      return;
    }

    // Clear any existing content
    container.innerHTML = "";

    // Create temporary container to parse HTML
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();

    let hasInsElement = false;

    // Process all nodes from the parsed HTML
    Array.from(temp.childNodes).forEach((node) => {
      if (node.nodeName.toLowerCase() === "script") {
        const scriptContent = node.textContent || "";

        // Skip the push() script - we'll handle it manually
        if (scriptContent.includes("adsbygoogle") && scriptContent.includes("push")) {
          return;
        }

        // Create new script element
        const script = document.createElement("script");
        
        // Copy all attributes (src, async, crossorigin, etc.)
        Array.from(node.attributes || []).forEach((attr) => {
          script.setAttribute(attr.name, attr.value);
        });
        
        // Copy inline script content
        if (scriptContent) {
          script.textContent = scriptContent;
        }

        container.appendChild(script);
      } else if (node.nodeType === 1) {
        // Clone element nodes (like <ins>)
        if (node.classList?.contains("adsbygoogle")) {
          hasInsElement = true;
        }
        container.appendChild(node.cloneNode(true));
      }
    });

    // Initialize the ad after DOM is ready
    if (hasInsElement) {
      const timer = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isInitialized.current = true;
          console.log("Ad initialized successfully");
        } catch (error) {
          console.error("AdSense initialization error:", error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    isInitialized.current = true;
  }, [html]);

  // Don't render anything if no HTML provided
  if (!html) return null;

  return (
    <section className={className}>
      <div className="container">
        <div ref={containerRef} />
      </div>
    </section>
  );
}