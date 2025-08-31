import React, { useState } from 'react'
import CenterFormWrapper from '../../components/CenterFormWrapper'
import TimezoneDropdown from '../../components/TimezoneDropdown';
import Button from '../../components/Button';

export default function Timezone() {
const [selectedTimezone, setSelectedTimezone] = useState<string>("");

  const handleTimezoneChange = (abbr: string) => {
    console.log("Selected timezone:", abbr);
    setSelectedTimezone(abbr);
  };

  return (
    <div>
      <CenterFormWrapper title="CareerIQ" logoSrc="/public/logo.png">
          <h2 className="text-xl font-bold font-inter text-black text-center mb-1">
          Set Your Time Zone
        </h2>
        <TimezoneDropdown onChange={handleTimezoneChange} />
        <Button type="submit">Continue</Button>
      </CenterFormWrapper>
    </div>
  )
}

