import React, { useEffect, useRef } from 'react';
import { useSite } from '../context/SiteContext';

declare global {
  interface Window {
    naver: any;
  }
}

const NaverMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const { config } = useSite();
  const { address, name } = config.companyInfo;

  useEffect(() => {
    // Fix: Changed NodeJS.Timeout to ReturnType<typeof setInterval> for browser compatibility.
    let interval: ReturnType<typeof setInterval>;

    const initMap = () => {
      if (!mapElement.current || !window.naver || !window.naver.maps) return;

      window.naver.maps.Service.geocode({ query: address }, (status: any, response: any) => {
        let centerPoint: any;

        if (status !== window.naver.maps.Service.Status.OK || !response.v2.addresses.length) {
          console.error('Geocoding failed for address:', address, '. Defaulting to Naver HQ.');
          // Fallback to a default location if geocoding fails
          centerPoint = new window.naver.maps.LatLng(37.3595704, 127.105399);
        } else {
          const result = response.v2.addresses[0];
          centerPoint = new window.naver.maps.LatLng(result.y, result.x);
        }

        const map = new window.naver.maps.Map(mapElement.current, {
          center: centerPoint,
          zoom: 17,
          scrollWheel: false,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
            style: window.naver.maps.ZoomControlStyle.SMALL
          }
        });

        new window.naver.maps.Marker({
          position: centerPoint,
          map,
          title: name,
          icon: {
            content: `
              <div style="position: absolute; transform: translateX(-50%);">
                <div style="
                  background-color: #34D399; 
                  color: white; 
                  padding: 5px 12px; 
                  border-radius: 9999px; 
                  font-weight: 700; 
                  font-size: 14px; 
                  border: 2px solid white; 
                  box-shadow: 0 4px 8px rgba(0,0,0,0.2); 
                  white-space: nowrap;
                ">${name}</div>
                <div style="
                  width: 0;
                  height: 0;
                  border-left: 8px solid transparent;
                  border-right: 8px solid transparent;
                  border-top: 10px solid #34D399;
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  transform: translateX(-50%) translateY(-2px);
                "></div>
              </div>`,
            anchor: new window.naver.maps.Point(0, 42),
          }
        });
      });
    };
    
    // Wait for naver.maps to be loaded from the script
    if (window.naver && window.naver.maps) {
        initMap();
    } else {
        interval = setInterval(() => {
          if (window.naver && window.naver.maps) {
            clearInterval(interval);
            initMap();
          }
        }, 100);
    }
    
    return () => {
      if(interval) clearInterval(interval);
    };

  }, [address, name]);

  return <div ref={mapElement} style={{ width: '100%', height: '100%' }} />;
};

export default NaverMap;
