// src/useServiceWorker.js
import { useEffect, useState, useRef } from "react";

export function useServiceWorker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const swReg = useRef(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        swReg.current = reg;

        // Case 1: SW already waiting (user reopened app after update)
        if (reg.waiting) {
          setUpdateAvailable(true);
        }

        // Case 2: New SW found and installs while app is open
        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              swReg.current = reg;
              setUpdateAvailable(true);
            }
          });
        });

        // Poll every 60s for updates (keeps long-running sessions fresh)
        const interval = setInterval(() => reg.update().catch(() => {}), 60 * 1000);
        return () => clearInterval(interval);
      } catch (err) {
        console.warn("[SW] Registration failed:", err);
      }
    };

    registerSW();

    // Case 3: SW takes control — only reload if user triggered it
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloading) return;
      if (sessionStorage.getItem("sw-update-pending") === "true") {
        reloading = true;
        sessionStorage.removeItem("sw-update-pending");
        window.location.reload();
      }
    });
  }, []);

  const applyUpdate = () => {
    const reg = swReg.current;
    if (reg && reg.waiting) {
      // Normal: SW waiting — tell it to activate
      sessionStorage.setItem("sw-update-pending", "true");
      reg.waiting.postMessage("SKIP_WAITING");
    } else {
      // Fallback: SW already active — force hard reload
      window.location.reload(true);
    }
  };

  return { updateAvailable, applyUpdate };
}