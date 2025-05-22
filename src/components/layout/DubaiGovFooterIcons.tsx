
import React from 'react';
import { MessageCircleQuestion, ThumbsUp, AlertCircle } from 'lucide-react';

export function DubaiGovFooterIcons() {
  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end mb-4 mr-4 space-y-2 md:mb-6 md:mr-6">
      {/* Dubai AI Icon */}
      <a 
        href="https://www.dubaidigital.ae/en/dubaiAI.html" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Dubai AI"
      >
        <img 
          src="/images/dubai-ai-icon.svg" 
          alt="Dubai AI" 
          className="w-8 h-8"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDc5QzEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTIgMmE0IDQgMCAwIDAgLTQgNHY0YTQgNCAwIDAgMCA4IDBWNmE0IDQgMCAwIDAgLTQgLTR6Ij48L3BhdGg+PHBhdGggZD0iTTQgMTJhOCA4IDAgMCAxIDggLThhOCA4IDAgMCAxIDggOCI+PC9wYXRoPjxwYXRoIGQ9Ik0xNS42IDE0LjFhMyAzIDAgMCAxIC00LjYgMi4xYTMgMyAwIDAgMSAtLjYgLTRMMTIgMTBsMS42IDIuMWEzIDMgMCAwIDEgMiAyeiI+PC9wYXRoPjwvc3ZnPg==";
          }}
        />
      </a>

      {/* 04 Suggestions Icon */}
      <a 
        href="tel:04" 
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Call 04"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-gov-teal">04</span>
        </div>
      </a>

      {/* Complaints Icon */}
      <a 
        href="#complaints" 
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Submit Complaints"
      >
        <AlertCircle className="w-6 h-6 text-gov-teal" />
      </a>

      {/* Chatbot Icon */}
      <a 
        href="#chatbot" 
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Chat with us"
      >
        <MessageCircleQuestion className="w-6 h-6 text-gov-teal" />
      </a>

      {/* Happiness Meter Icon */}
      <a 
        href="#happiness-meter" 
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Happiness Meter"
      >
        <ThumbsUp className="w-6 h-6 text-gov-teal" />
      </a>
    </div>
  );
}

export default DubaiGovFooterIcons;
