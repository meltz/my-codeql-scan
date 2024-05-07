import axios from 'axios';
import { DateTime } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

// Json file containing outlet info
const outletJson = `./data.js`;

// Convert to required display date format
const displayDate = (outletDate) => DateTime.fromSQL(outletDate).toFormat('d MMM yy');

// Get Singapore current date and time
const todayDate = DateTime.local().setZone('Asia/Singapore').toFormat('yyyy-MM-dd');

// If today date matches any lion dance date, set date dropdown to today date, else default to first lion dance date
const getFirstDate = (objectOutlets, todayDate) => {
  const matchingTodayDate = objectOutlets.find((schedule) => schedule.date === todayDate) || objectOutlets[0];
  return matchingTodayDate.date;
};

const App = () => {
  const [outletsData, setOutletsData] = useState([]);
  const [firstDate, setFirstDate] = useState('');
  const [filterOutletData, setFilterOutletData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(firstDate);
  const [selectedZone, setSelectedZone] = useState('');

  // Onload
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(outletJson);

        // "eval" to evaluate the modified string as a JavaScript object literal
        const objectOutlets = eval(response?.data);
        setOutletsData(objectOutlets);

        // Get and set first lion dance date
        const firstDay = getFirstDate(objectOutlets, todayDate);
        setFirstDate(firstDay);

        // Onload display selected date outlet, default date dropdown and populate zone dropdown
        setSelectedDate(firstDay);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get filtered outlets by date and zone
  const getFilterOutlets = useCallback(
    (date, zone) => {
      // If date dropdown value empty, break out of the function
      if (!date) {
        return [];
      }

      // Find the first matching date and break out of the function, don' return array
      const filterData = outletsData.find((schedule) => schedule.date === date);

      // If zone dropdown value not empty (all zone), then filter by the specific zone value specify
      if (zone) {
        // Use filter function to loop through all zones to find the matching zone, does not contain date etc
        const filterDataZone = filterData?.zones?.filter((zones) => zones.zone === zone);

        // Merge  the first object found with date, together with the zone object found into one single object, become array for map to loop
        const finalFilter = filterDataZone ? { ...filterData, zones: filterDataZone } : null;

        return [finalFilter];
      }

      // Return matching date with all zone, no specific zone value
      return [filterData];
    },
    [outletsData]
  );

  // Watch for changes, when date and zone value changes or outlet data changes
  useEffect(() => {
    setFilterOutletData(getFilterOutlets(selectedDate, selectedZone));
  }, [selectedDate, selectedZone, outletsData, getFilterOutlets]);

  // Handle date dropdown changes, clear previous zone selection when date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setSelectedZone('');
  };

  // Populate date dropdown with all the lion dance dates
  const DateDropdown = () => {
    return (
      <div className='date-dropdown dropdown'>
        <label htmlFor='date' className='dropdown-label'>
          Date
        </label>
        <select id='date' className='dropdown-select' onChange={handleDateChange} value={selectedDate}>
          {outletsData &&
            outletsData.map((schedule) => (
              <option key={schedule.date} value={schedule.date}>
                {displayDate(schedule.date)}
              </option>
            ))}
        </select>
      </div>
    );
  };

  // Handle zone dropdown changes
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };

  // Populate zone dropdown with selected date's zones
  const ZoneDropdown = () => {
    // Get the selected date's zones
    const selectedDateZones = outletsData.find((schedule) => schedule.date === selectedDate);

    return (
      <div className='zone-dropdown dropdown'>
        <label htmlFor='zone' className='dropdown-label'>
          Zone
        </label>
        <select id='zone' className='dropdown-select' onChange={handleZoneChange} value={selectedZone}>
          <option value=''>All Zones</option>
          {selectedDateZones &&
            selectedDateZones.zones.map((zones) => (
              <option key={zones.zone} value={zones.zone}>
                {zones.zone}
              </option>
            ))}
        </select>
      </div>
    );
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className='dropdown-section'>
        <DateDropdown />
        <ZoneDropdown />
      </div>

      {filterOutletData.map((schedule) => (
        <div key={schedule.displayDate} className='listing-section'>
          <h1 className='schedule-date'>{schedule.displayDate}</h1>

          {schedule.zones.map((zones) => (
            <div key={zones.zone} className='zone-section'>
              <h2 className='zone-header'>{zones.zone}</h2>
              <div className='outlet-section'>
                {zones.outlets.map((outlet) => (
                  <div key={outlet.name} className='outlet'>
                    <div className='display-col'>
                      <p className='outlet-time'>{outlet.time}</p>
                    </div>
                    <div className='display-col'>
                      <p className='outlet-detail'>
                        <span className='outlet-name'>{outlet.name}</span>
                        <span className='divider'>-</span>
                        <span className='outlet-addr'>{outlet.addr}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default App;
