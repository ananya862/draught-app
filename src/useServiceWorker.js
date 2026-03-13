// useServiceWorker.js
// Place in src/
// Detects when a new version is available and auto-reloads the app

import { useEffect, useState } from "react";

export function useServiceWorker() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js").then((reg) => {
      setRegistration(reg);
      console.log("[App] SW registered");

      // New SW is waiting — update is ready
      if (reg.waiting) {
        setUpdateAvailable(true);
      }

      // New SW found while app is running
      reg.addEventListener("updatefound", () => {
        const newWorker = reg.installing;
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.log("[App] New version available");
            setUpdateAvailable(true);
          }
        });
      });
    });

    // Only reload when the user explicitly clicked "Refresh"
    // NOT on every controller change (that caused the blink loop)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (sessionStorage.getItem("sw-update-pending") === "true") {
        sessionStorage.removeItem("sw-update-pending");
        window.location.reload();
      }
    });
  }, []);

  const applyUpdate = () => {
    if (registration?.waiting) {
      // Flag so controllerchange knows this was user-triggered
      sessionStorage.setItem("sw-update-pending", "true");
      registration.waiting.postMessage("SKIP_WAITING");
    }
  };

  return { updateAvailable, applyUpdate };
}
