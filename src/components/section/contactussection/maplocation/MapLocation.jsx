"use client";
import "./maplocation.css";
import { useEffect, useRef } from "react";

const EVENTS = [
  {
    id: "event-location-2025", // aneesh make a change here raaa or else contact laya
    name: "Event 1", // aneesh make a change here raaa or else contact laya
    date: "2024-08-10", // aneesh make a change here raaa or else contact laya
    coords: [26.2978, 73.0386], // aneesh make a change here raaa or else contact laya
    address: "Sardarpura, Jodhpur, Rajasthan 342003", // aneesh make a change here raaa or else contact laya
  }, // aneesh make a change here raaa or else contact laya
  // {
  //   id: "event-location-2026", // aneesh make a change here raaa or else contact laya
  //   name: "Event 2", // aneesh make a change here raaa or else contact laya
  //   date: "2024-09-15", // aneesh make a change here raaa or else contact laya
  //   coords: [26.9124, 75.7873], // aneesh make a change here raaa or else contact laya
  //   address: "C-Scheme, Jaipur, Rajasthan 302001", // aneesh make a change here raaa or else contact laya
  // }, // aneesh make a change here raaa or else contact laya
];

function getEventPopupHtml(event) {
  const addressId = `event-address-${event.id}`;
  const buttonId = `copy-event-address-btn-${event.id}`;
  return `
  
    <b>${event.name}</b><br/>
    Date: ${event.date}<br/>
    <span id="${addressId}">${event.address}</span>
    <button 
      id="${buttonId}"
      style="margin-left:8px;padding:2px 8px;font-size:0.9em;cursor:pointer;pointer-events:auto;"
      onclick="
        event.stopPropagation();
        var address = document.getElementById('${addressId}').innerText;
        var showCopiedPopup = function() {
          var existing = document.getElementById('copied-popup-toast');
          if (existing) existing.remove();
          var toast = document.createElement('div');
          toast.id = 'copied-popup-toast';
          toast.innerText = 'Copied!';
          toast.style.position = 'fixed';
          toast.style.left = '50%';
          toast.style.bottom = '32px';
          toast.style.transform = 'translateX(-50%)';
          toast.style.background = '#222';
          toast.style.color = '#fff';
          toast.style.padding = '10px 24px';
          toast.style.borderRadius = '8px';
          toast.style.fontSize = '1.1em';
          toast.style.boxShadow = '0 2px 12px rgba(0,0,0,0.18)';
          toast.style.zIndex = 9999;
          document.body.appendChild(toast);
          setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
          }, 1500);
        };
        // Try to use Clipboard API, fallback to execCommand
        if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(address).then(function() {
            showCopiedPopup();
          }, function() {
            // fallback if Clipboard API fails
            var textarea = document.createElement('textarea');
            textarea.value = address;
            document.body.appendChild(textarea);
            textarea.select();
            try { document.execCommand('copy'); } catch (err) {}
            document.body.removeChild(textarea);
            showCopiedPopup();
          });
        } else {
          var textarea = document.createElement('textarea');
          textarea.value = address;
          document.body.appendChild(textarea);
          textarea.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(textarea);
          showCopiedPopup();
        }
      "
    >Copy</button>
  `;
}

const EVENT_LOCATIONS = EVENTS.map((event) => ({
  id: event.id,
  name: event.name,
  coords: event.coords,
  popup: getEventPopupHtml(event),
  isEvent: true,
}));

const AVASA_ICON_URL = "/svg/AVASA.svg";
const FIXED_LOCATION = {
  id: "fixed-location",
  name: " AVASA HQ",
  coords: [17.494898, 78.363327],
  iconUrl: AVASA_ICON_URL,
  popup: "<b> AVASA HQ</b>",
};
const OTHER_LOCATIONS = [
  {
    id: "random-location-1",
    name: "Random Location 1",
    coords: [27.1769, 75.9597],
    iconUrl: AVASA_ICON_URL,
    popup: "<b>Random Location 1</b>",
  },
  {
    id: "random-location-2",
    name: "Random Location 2",
    coords: [26.32, 73.03],
    iconUrl: AVASA_ICON_URL,
    popup: "<b>Random Location 2</b>",
  },
];
const FIXED_ICON_SIZE = [50, 50];
const FIXED_ICON_ANCHOR = [32, 64];
const FIXED_POPUP_ANCHOR = [0, -50];
const OTHER_ICON_SIZE = [32, 32];
const OTHER_ICON_ANCHOR = [16, 32];
const OTHER_POPUP_ANCHOR = [0, -32];
const EVENT_ICON_SIZE = [40, 40];
const EVENT_ICON_ANCHOR = [20, 40];
const EVENT_POPUP_ANCHOR = [0, -40];

const MapLocation = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let mapInstance = null;
    let markerRefs = [];
    let fixedMarker = null;
    let animationTimeouts = [];

    function loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }

    function loadCSS(href) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`link[href="${href}"]`)) {
          resolve();
          return;
        }
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.crossOrigin = "";
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
      });
    }

    const leafletJsCdn = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    const leafletCssCdn = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";

    const initialCoords = FIXED_LOCATION.coords;

    if (mapRef.current) {
      mapRef.current.removeAttribute("style");
    }

    Promise.all([loadScript(leafletJsCdn), loadCSS(leafletCssCdn)]).then(() => {
      if (!window.L || !mapRef.current) return;
      const L = window.L;

      if (mapRef.current._leaflet_id) {
        try {
          L.map(mapRef.current).remove();
        } catch (e) {}
      }

      mapInstance = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
        center: initialCoords,
        zoom: 15,
      });

      mapInstance.setView(initialCoords, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      // Make animation slower: increase delay and duration
      function animateMapToLocations(locations, delay = 2000) {
        if (!mapInstance) return;
        let i = 0;
        function flyNext() {
          if (i >= locations.length) {
            return;
          }
          const loc = locations[i];
          mapInstance.flyTo(loc.coords, loc.zoom || 15, {
            animate: true,
            duration: 2.0, // was 1.2, now slower
          });
          i++;
          animationTimeouts.push(setTimeout(flyNext, delay));
        }
        flyNext();
      }

      function addMarkerWithIcon(
        location,
        openPopupImmediately = false,
        isFixedLocation = false
      ) {
        const popupId = `popup-${
          location.id || location.name.replace(/\s+/g, "-").toLowerCase()
        }`;

        if (location.isEvent) {
          const eventDivIcon = L.divIcon({
            className: "blinking-black-marker",
            iconSize: EVENT_ICON_SIZE,
            iconAnchor: EVENT_ICON_ANCHOR,
            popupAnchor: EVENT_POPUP_ANCHOR,
            html: `
              <div class="event-marker-outer">
                <div class="event-marker-inner"></div>
              </div>
            `,
          });

          const marker = L.marker(location.coords, {
            icon: eventDivIcon,
          }).addTo(mapInstance);

          const popupHtml =
            location.popup && !location.popup.includes(`id="`)
              ? `<div id="${popupId}">${location.popup}</div>`
              : location.popup ||
                `<div id="${popupId}"><b>${location.name}</b></div>`;

          marker.bindPopup(popupHtml, {
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            className: "event-popup",
          });
          markerRefs.push(marker);

          const styleId = "event-leaflet-marker-style";
          if (!document.getElementById(styleId)) {
            const style = document.createElement("style");
            style.id = styleId;
            style.innerHTML = `
              .blinking-black-marker .event-marker-outer {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #fff;
                border: 2.5px solid #111;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                position: relative;
                animation: event-blink 0.7s linear infinite;
              }
              .blinking-black-marker .event-marker-inner {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #111;
                box-shadow: 0 0 0 8px rgba(0,0,0,0.15);
              }
              @keyframes event-blink {
                0% { box-shadow: 0 0 0 10px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.15);}
                50% { box-shadow: 0 0 0 22px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.15);}
                100% { box-shadow: 0 0 0 10px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.15);}
              }
              .leaflet-popup.event-popup {
                pointer-events: none;
                margin-top: -10px;
              }
              .leaflet-popup.event-popup .leaflet-popup-content-wrapper {
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                border: 1.5px solid #111;
              }
              .leaflet-popup.event-popup .leaflet-popup-close-button {
                display: none;
              }
            `;
            document.head.appendChild(style);
          }

          if (openPopupImmediately) {
            marker.openPopup();
            setTimeout(() => {
              const popupEl = document.querySelector(
                `.leaflet-popup[id^="${popupId}"], .leaflet-popup`
              );
              if (popupEl) {
                popupEl.classList.add("event-popup");
              }
            }, 100);
          }
          marker.on("click", () => {
            markerBounce(marker);
          });
          return;
        }

        const isFixed = location.id === FIXED_LOCATION.id;
        const iconSize = isFixed ? FIXED_ICON_SIZE : OTHER_ICON_SIZE;
        const iconAnchor = isFixed ? FIXED_ICON_ANCHOR : OTHER_ICON_ANCHOR;
        const popupAnchor = isFixed ? FIXED_POPUP_ANCHOR : OTHER_POPUP_ANCHOR;

        if (location.iconUrl) {
          const testImg = new window.Image();
          testImg.src = location.iconUrl;
          testImg.onload = () => {
            const customIcon = L.icon({
              iconUrl: location.iconUrl,
              iconSize,
              iconAnchor,
              popupAnchor,
              className: isFixedLocation ? "blinking-fixed-marker" : "",
            });
            const marker = L.marker(location.coords, {
              icon: customIcon,
            }).addTo(mapInstance);

            const popupHtml =
              location.popup && !location.popup.includes(`id="`)
                ? `<div id="${popupId}">${location.popup}</div>`
                : location.popup ||
                  `<div id="${popupId}"><b>${location.name}</b></div>`;

            marker.bindPopup(popupHtml, {
              autoClose: false,
              closeOnClick: false,
              closeButton: false,
              className: isFixedLocation ? "fixed-popup" : "",
            });
            markerRefs.push(marker);

            if (isFixedLocation) {
              fixedMarker = marker;
            }

            const styleId = "avasa-leaflet-marker-style";
            if (!document.getElementById(styleId)) {
              const style = document.createElement("style");
              style.id = styleId;
              style.innerHTML = `
                .leaflet-marker-icon[src$="AVASA.svg"] {
                  background: white;
                  border-radius: 50%;
                  border: 2px solid #333;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                  object-fit: contain;
                }
                .blinking-fixed-marker.leaflet-marker-icon[src$="AVASA.svg"] {
                  animation: avasa-blink 0.4s linear infinite;
                  box-shadow: 0 0 0 10px rgba(255, 20, 147, 0.7), 0 2px 8px rgba(0,0,0,0.15);
                  border: 2.5px solid #ff1493;
                  background: #ffe0f4;
                }
                @keyframes avasa-blink {
                  0% { box-shadow: 0 0 0 10px rgba(255, 20, 147, 0.7), 0 2px 8px rgba(0,0,0,0.15); }
                  50% { box-shadow: 0 0 0 22px rgba(255, 20, 147, 1), 0 2px 8px rgba(0,0,0,0.15); }
                  100% { box-shadow: 0 0 0 10px rgba(255, 20, 147, 0.7), 0 2px 8px rgba(0,0,0,0.15); }
                }
                .leaflet-popup.fixed-popup {
                  pointer-events: none;
                  margin-top: -10px;
                }
                .leaflet-popup.fixed-popup .leaflet-popup-content-wrapper {
                  background: #fff;
                  border-radius: 8px;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                  border: 1.5px solid #333;
                }
                .leaflet-popup.fixed-popup .leaflet-popup-close-button {
                  display: none;
                }
                @keyframes marker-bounce {
                  0%   { transform: translateY(0);}
                  10%  { transform: translateY(-20px);}
                  20%  { transform: translateY(-30px);}
                  30%  { transform: translateY(-20px);}
                  40%  { transform: translateY(-10px);}
                  50%  { transform: translateY(-5px);}
                  60%  { transform: translateY(-2px);}
                  70%  { transform: translateY(0);}
                  100% { transform: translateY(0);}
                }
                .leaflet-marker-icon.marker-bounce {
                  animation: marker-bounce 0.7s cubic-bezier(.25,.46,.45,.94) both;
                }
              `;
              document.head.appendChild(style);
            }
            if (openPopupImmediately) {
              marker.openPopup();

              if (isFixedLocation) {
                marker._popup.options.autoClose = false;
                marker._popup.options.closeOnClick = false;
                marker._popup.options.closeButton = false;

                setTimeout(() => {
                  const popupEl = document.querySelector(
                    `.leaflet-popup[id^="${popupId}"], .leaflet-popup`
                  );
                  if (popupEl) {
                    popupEl.classList.add("fixed-popup");
                  }
                }, 100);
              }
            }
            marker.on("click", () => {
              markerBounce(marker);
            });
          };
          testImg.onerror = () => {
            const fallbackIcon = L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              shadowSize: [41, 41],
            });
            const marker = L.marker(location.coords, {
              icon: fallbackIcon,
            }).addTo(mapInstance);

            const popupHtml =
              (location.popup && !location.popup.includes(`id="`)
                ? `<div id="${popupId}">${location.popup}</div>`
                : location.popup ||
                  `<div id="${popupId}"><b>${location.name}</b></div>`) +
              "<br/><span style='color:red'>Custom icon failed to load.</span>";

            marker.bindPopup(popupHtml, {
              autoClose: false,
              closeOnClick: false,
              closeButton: false,
              className: isFixedLocation ? "fixed-popup" : "",
            });
            markerRefs.push(marker);
            if (isFixedLocation) {
              fixedMarker = marker;
            }
            if (openPopupImmediately) {
              marker.openPopup();
              if (isFixedLocation) {
                marker._popup.options.autoClose = false;
                marker._popup.options.closeOnClick = false;
                marker._popup.options.closeButton = false;
                setTimeout(() => {
                  const popupEl = document.querySelector(
                    `.leaflet-popup[id^="${popupId}"], .leaflet-popup`
                  );
                  if (popupEl) {
                    popupEl.classList.add("fixed-popup");
                  }
                }, 100);
              }
            }
            marker.on("click", () => {
              markerBounce(marker);
            });
          };
        } else {
          const fallbackIcon = L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
            shadowSize: [41, 41],
          });
          const marker = L.marker(location.coords, {
            icon: fallbackIcon,
          }).addTo(mapInstance);

          const popupHtml =
            location.popup && !location.popup.includes(`id="`)
              ? `<div id="${popupId}">${location.popup}</div>`
              : location.popup ||
                `<div id="${popupId}"><b>${location.name}</b></div>`;

          marker.bindPopup(popupHtml, {
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            className: isFixedLocation ? "fixed-popup" : "",
          });
          markerRefs.push(marker);
          if (isFixedLocation) {
            fixedMarker = marker;
          }
          if (openPopupImmediately) {
            marker.openPopup();
            if (isFixedLocation) {
              marker._popup.options.autoClose = false;
              marker._popup.options.closeOnClick = false;
              marker._popup.options.closeButton = false;
              setTimeout(() => {
                const popupEl = document.querySelector(
                  `.leaflet-popup[id^="${popupId}"], .leaflet-popup`
                );
                if (popupEl) {
                  popupEl.classList.add("fixed-popup");
                }
              }, 100);
            }
          }
          marker.on("click", () => {
            markerBounce(marker);
          });
        }
      }

      function markerBounce(marker) {
        if (!marker || !marker._icon) return;
        marker._icon.classList.remove("marker-bounce");
        void marker._icon.offsetWidth;
        marker._icon.classList.add("marker-bounce");
        setTimeout(() => {
          if (marker._icon) marker._icon.classList.remove("marker-bounce");
        }, 700);
      }

      // Add all markers
      addMarkerWithIcon(FIXED_LOCATION, true, true);
      EVENT_LOCATIONS.forEach((eventLoc) => {
        addMarkerWithIcon(eventLoc, true, false);
      });
      OTHER_LOCATIONS.forEach((location) => {
        addMarkerWithIcon(location, false, false);
      });

      // Animate: fixed location -> each event (in order) -> back to fixed location
      const animationLocations = [
        { ...FIXED_LOCATION, zoom: 15 },
        ...EVENT_LOCATIONS.map((ev) => ({ ...ev, zoom: 15 })),
        { ...FIXED_LOCATION, zoom: 15 },
      ];
      animateMapToLocations(animationLocations, 2000); // was 1200, now slower

      mapInstance.setView(initialCoords, 15, { animate: false });
    });

    return () => {
      if (animationTimeouts.length) {
        animationTimeouts.forEach((t) => clearTimeout(t));
      }
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="leaflet-map"
      className="overflow-hidden mx-auto rounded-md"
    />
  );
};

export default MapLocation;
