import React, { useEffect, useState } from 'react';

export default function Search({ onSearch }) {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');

  useEffect(() => {
    fetch('https://meddata-backend.onrender.com/states')
      .then((r) => r.json())
      .then((data) => setStates(data || []))
      .catch(() => setStates([]));
  }, []);

  useEffect(() => {
    if (!stateValue) return setCities([]);
    fetch(`https://meddata-backend.onrender.com/cities/${encodeURIComponent(stateValue)}`)
      .then((r) => r.json())
      .then((data) => setCities(data || []))
      .catch(() => setCities([]));
  }, [stateValue]);

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) onSearch({ state: stateValue, city: cityValue });
  }

  return (
    <div
      style={{
        background: '#FFFFFF',
        boxShadow: '6px 6px 35px 0px #1028511C',
        width: '1166px',
        height: '111px',
        borderRadius: '15px',
        padding: '30px 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '179px auto 0',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          width: '1119px',
          height: '57px',
        }}
      >
        {/* State Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            value={stateValue}
            onChange={(e) => setStateValue(e.target.value)}
            style={{
              width: '326px',
              height: '50px',
              borderRadius: '8px',
              border: '1px solid #F0F0F0',
              background: '#FAFBFE',
              padding: '0 10px',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* City Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <select
            value={cityValue}
            onChange={(e) => setCityValue(e.target.value)}
            style={{
              width: '326px',
              height: '50px',
              borderRadius: '8px',
              border: '1px solid #F0F0F0',
              background: '#FAFBFE',
              padding: '0 10px',
              fontSize: '14px',
              outline: 'none',
            }}
          >
            <option value="">Select city</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          style={{
            width: '231px',
            height: '50px',
            borderRadius: '8px',
            padding: '12px 52px',
            background: '#2AA8FF',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
}
