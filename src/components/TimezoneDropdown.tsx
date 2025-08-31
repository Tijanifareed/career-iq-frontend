import React, { useState } from "react";

interface TimeZoneDropdownProps {
  label?: string;
  onChange: (value: string) => void;
}

const timeZones = [
  { code: "WAT", name: "West Africa Time", value: "Africa/Lagos" },
  { code: "CAT", name: "Central Africa Time", value: "Africa/Harare" },
  { code: "EAT", name: "East Africa Time", value: "Africa/Nairobi" },
  { code: "SAST", name: "South Africa Standard Time", value: "Africa/Johannesburg" },

  { code: "GMT", name: "Greenwich Mean Time", value: "Europe/London" },
  { code: "CET", name: "Central European Time", value: "Europe/Berlin" },
  { code: "CEST", name: "Central European Summer Time", value: "Europe/Berlin" },
  { code: "EET", name: "Eastern European Time", value: "Europe/Athens" },
  { code: "EEST", name: "Eastern European Summer Time", value: "Europe/Athens" },
  { code: "MSK", name: "Moscow Standard Time", value: "Europe/Moscow" },

  { code: "UTC", name: "Coordinated Universal Time", value: "UTC" },

  { code: "AST", name: "Atlantic Standard Time", value: "America/Halifax" },
  { code: "ADT", name: "Atlantic Daylight Time", value: "America/Halifax" },
  { code: "EST", name: "Eastern Standard Time", value: "America/New_York" },
  { code: "EDT", name: "Eastern Daylight Time", value: "America/New_York" },
  { code: "CST", name: "Central Standard Time", value: "America/Chicago" },
  { code: "CDT", name: "Central Daylight Time", value: "America/Chicago" },
  { code: "MST", name: "Mountain Standard Time", value: "America/Denver" },
  { code: "MDT", name: "Mountain Daylight Time", value: "America/Denver" },
  { code: "PST", name: "Pacific Standard Time", value: "America/Los_Angeles" },
  { code: "PDT", name: "Pacific Daylight Time", value: "America/Los_Angeles" },
  { code: "AKST", name: "Alaska Standard Time", value: "America/Anchorage" },
  { code: "AKDT", name: "Alaska Daylight Time", value: "America/Anchorage" },
  { code: "HST", name: "Hawaii Standard Time", value: "Pacific/Honolulu" },

  { code: "IST", name: "India Standard Time", value: "Asia/Kolkata" },
  { code: "PKT", name: "Pakistan Standard Time", value: "Asia/Karachi" },
  { code: "BST", name: "Bangladesh Standard Time", value: "Asia/Dhaka" },
  { code: "MMT", name: "Myanmar Time", value: "Asia/Yangon" },
  { code: "ICT", name: "Indochina Time", value: "Asia/Bangkok" },
  { code: "WIB", name: "Western Indonesia Time", value: "Asia/Jakarta" },
  { code: "WITA", name: "Central Indonesia Time", value: "Asia/Makassar" },
  { code: "WIT", name: "Eastern Indonesia Time", value: "Asia/Jayapura" },

  { code: "CST_CHINA", name: "China Standard Time", value: "Asia/Shanghai" },
  { code: "HKT", name: "Hong Kong Time", value: "Asia/Hong_Kong" },
  { code: "SGT", name: "Singapore Time", value: "Asia/Singapore" },
  { code: "JST", name: "Japan Standard Time", value: "Asia/Tokyo" },
  { code: "KST", name: "Korea Standard Time", value: "Asia/Seoul" },

  { code: "AFT", name: "Afghanistan Time", value: "Asia/Kabul" },
  { code: "IRST", name: "Iran Standard Time", value: "Asia/Tehran" },
  { code: "GST", name: "Gulf Standard Time", value: "Asia/Dubai" },
  { code: "AST_ARABIA", name: "Arabia Standard Time", value: "Asia/Riyadh" },

  { code: "AEST", name: "Australian Eastern Standard Time", value: "Australia/Sydney" },
  { code: "AEDT", name: "Australian Eastern Daylight Time", value: "Australia/Sydney" },
  { code: "ACST", name: "Australian Central Standard Time", value: "Australia/Adelaide" },
  { code: "ACDT", name: "Australian Central Daylight Time", value: "Australia/Adelaide" },
  { code: "AWST", name: "Australian Western Standard Time", value: "Australia/Perth" },

  { code: "NZST", name: "New Zealand Standard Time", value: "Pacific/Auckland" },
  { code: "NZDT", name: "New Zealand Daylight Time", value: "Pacific/Auckland" },
  { code: "CHAST", name: "Chatham Standard Time", value: "Pacific/Chatham" },

  { code: "ART", name: "Argentina Time", value: "America/Argentina/Buenos_Aires" },
  { code: "BRT", name: "Brasilia Time", value: "America/Sao_Paulo" },
  { code: "CLT", name: "Chile Standard Time", value: "America/Santiago" },
  { code: "GYT", name: "Guyana Time", value: "America/Guyana" },
];

const TimeZoneDropdown: React.FC<TimeZoneDropdownProps> = ({
  label = "Time Zone",
  onChange,
}) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<{ code: string; name: string } | null>(null);

  const filteredZones = timeZones.filter(
    (tz) =>
      tz.code.toLowerCase().includes(search.toLowerCase()) ||
      tz.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (zone: { code: string; name: string; value: string }) => {
    setSelected({ code: zone.code, name: zone.name });
    onChange(zone.code); // ✅ return abbreviation only
    setSearch(""); // clear search
  };

  const handleClear = () => {
    setSelected(null);
    onChange(""); // reset variable
  };

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <label className="block mb-2 font-semibold text-gray-700">{label}</label>

      {/* Input box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search timezone..."
          value={selected ? `${selected.code} (${selected.name})` : search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelected(null); // reset selection when typing
          }}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue"
        />
        {selected && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown options */}
      {search && !selected && (
        <div className="mt-1 max-h-40 overflow-y-auto border border-gray-200 rounded-md bg-white shadow-lg z-10">
          {filteredZones.length > 0 ? (
            filteredZones.map((zone) => (
              <div
                key={zone.code}
                onClick={() => handleSelect(zone)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {zone.code} ({zone.name})
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default TimeZoneDropdown;

