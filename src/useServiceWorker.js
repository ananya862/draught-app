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

    // When SW takes control — reload to get fresh app
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        console.log("[App] Controller changed — reloading");
        window.location.reload();
      }
    });
  }, []);

  const applyUpdate = () => {
    if (registration?.waiting) {
      // Tell waiting SW to activate now
      registration.waiting.postMessage("SKIP_WAITING");
    }
  };

  return { updateAvailable, applyUpdate };
}
