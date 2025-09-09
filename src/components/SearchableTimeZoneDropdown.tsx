// components/SearchableTimeZoneDropdown.tsx
import React, { useState } from "react";

interface TimeZoneDropdownProps {
  label?: string;
  value?: string; // backend value e.g. "Africa/Lagos"
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
  { code: "EST", name: "Eastern Standard Time", value: "America/New_York" },
  { code: "EDT", name: "Eastern Daylight Time", value: "America/New_York" },
  { code: "CST", name: "Central Standard Time", value: "America/Chicago" },
  { code: "CDT", name: "Central Daylight Time", value: "America/Chicago" },
  { code: "PST", name: "Pacific Standard Time", value: "America/Los_Angeles" },
  { code: "PDT", name: "Pacific Daylight Time", value: "America/Los_Angeles" },
  { code: "IST", name: "India Standard Time", value: "Asia/Kolkata" },
  { code: "JST", name: "Japan Standard Time", value: "Asia/Tokyo" },
  { code: "KST", name: "Korea Standard Time", value: "Asia/Seoul" },
];

const SearchableTimeZoneDropdown: React.FC<TimeZoneDropdownProps> = ({
  label = "Timezone",
  value,
  onChange,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const selectedZone = timeZones.find((tz) => tz.value === value);

  const filteredZones = timeZones.filter(
    (tz) =>
      tz.code.toLowerCase().includes(search.toLowerCase()) ||
      tz.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (zone: { code: string; name: string; value: string }) => {
    onChange(zone.value); // ✅ send backend value
    setSearch("");
    setOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setSearch("");
    setOpen(false);
  };

  return (
    <div className="w-full relative">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder="Search timezone..."
          value={selectedZone ? `${selectedZone.code} (${selectedZone.name})` : search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue pr-8"
        />
        {selectedZone && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {open && search && (
        <div className="absolute mt-1 w-full max-h-48 overflow-y-auto border border-gray-200 rounded-md bg-white shadow-lg z-20">
          {filteredZones.length > 0 ? (
            filteredZones.map((zone) => (
              <div
                key={zone.value}
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

export default SearchableTimeZoneDropdown;
