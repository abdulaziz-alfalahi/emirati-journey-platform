
import React, { useState, useEffect } from 'react';
import './DubaiGovStickyBar.css';

const DubaiGovStickyBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior for showing/hiding the sticky bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Main sticky bar container */}
      <div className={`dubai-gov-sticky-bar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="dubai-gov-sticky-icons">
          {/* Dubai.ae */}
          <a 
            href="https://www.dubai.ae" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sticky-icon dubai-ae"
            aria-label="Dubai.ae - Official Portal of the Dubai Government"
          >
            <img 
              src="/images/dubai-ae-icon.svg" 
              alt="Dubai.ae" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDZFNkQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMyA5bDktNyA5IDd2MTFhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJ6Ij48L3BhdGg+PHBvbHlsaW5lIHBvaW50cz0iOSAyMiA5IDEyIDE1IDEyIDE1IDIyIj48L3BvbHlsaW5lPjwvc3ZnPg==";
              }}
            />
            <span className="tooltip">Dubai.ae</span>
          </a>

          {/* Dubai AI */}
          <a 
            href="https://www.dubaidigital.ae/en/dubaiAI.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="sticky-icon dubai-ai"
            aria-label="Dubai AI"
          >
            <img 
              src="/images/dubai-ai-icon.svg" 
              alt="Dubai AI" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDZFNkQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMmE0IDQgMCAwIDAgLTQgNHY0YTQgNCAwIDAgMCA4IDBWNmE0IDQgMCAwIDAgLTQgLTR6Ij48L3BhdGg+PHBhdGggZD0iTTQgMTJhOCA4IDAgMCAxIDggLThhOCA4IDAgMCAxIDggOCI+PC9wYXRoPjxwYXRoIGQ9Ik0xNS42IDE0LjFhMyAzIDAgMCAxIC00LjYgMi4xYTMgMyAwIDAgMSAtLjYgLTRMMTIgMTBsMS42IDIuMWEzIDMgMCAwIDEgMiAyeiI+PC9wYXRoPjwvc3ZnPg==";
              }}
            />
            <span className="tooltip">Dubai AI</span>
          </a>

          {/* 04 Suggestions */}
          <a 
            href="tel:04" 
            className="sticky-icon suggestions-04"
            aria-label="Call 04 for suggestions"
          >
            <div className="icon-04">
              <span>04</span>
            </div>
            <span className="tooltip">Call 04</span>
          </a>

          {/* Mawred Chatbot */}
          <button 
            onClick={() => window.open('#chatbot', '_blank')}
            className="sticky-icon mawred-chatbot"
            aria-label="Chat with Mawred"
          >
            <img 
              src="/images/mawred-icon.svg" 
              alt="Mawred Chatbot" 
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMzYgMjBDMzYgMjguODM2NiAyOC44MzY2IDM2IDIwIDM2TDQgNDRWMzZDNCAyNy4xNjM0IDExLjE2MzQgMjAgMjAgMjBIMzZaIiBmaWxsPSIjMDA2RTZEIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyNiIgcj0iNCIgZmlsbD0id2hpdGUiLz48cGF0aCBkPSJNMTYgMzJDMTYgMjkuNzkwOSAxNy43OTA5IDI4IDIwIDI4QzIyLjIwOTEgMjggMjQgMjkuNzkwOSAyNCAzMlYzNkgxNlYzMloiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTI2IDI4TDMwIDI0TDM0IDI4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMCAyNFYzNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=";
              }}
            />
            <span className="tooltip">Chat with Mawred</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DubaiGovStickyBar;
