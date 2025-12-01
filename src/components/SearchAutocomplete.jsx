import React, { useEffect, useState } from 'react';
import { searchCities } from '../utils/api.js';
import { useDebounce } from '../hooks/useDebounce.js';

const SearchAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(query, 400);

  useEffect(() => {
    if (!debounced || debounced.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const data = await searchCities(debounced);
        if (cancelled) return;
        const items = (data.results || []).map((r) => ({
          id: `${r.lat}-${r.lon}`,
          name: r.city || r.name,
          country: r.country,
          lat: r.lat,
          lon: r.lon
        }));
        setResults(items);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  const handleSelect = (item) => {
    setQuery(`${item.name}, ${item.country}`);
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <form
      className="relative max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) {
          handleSelect(results[0]);
        } else if (query.trim()) {
          onSelect?.({
            id: query.trim(),
            name: query.trim(),
            country: '',
            lat: null,
            lon: null
          });
        }
      }}
    >
      <div className="flex items-center gap-2 glass-card px-3 py-2.5">
        <span className="text-slate-400 text-sm">🔍</span>
        <input
          className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
          placeholder="Search any city in the world..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
        />
        {loading && (
          <span className="h-3 w-3 border-2 border-slate-200 border-t-transparent rounded-full animate-spin" />
        )}
        <button
          type="submit"
          className="text-xs px-3 py-1.5 rounded-full bg-white/80 text-slate-900 font-medium border border-white/40 shadow-sm hover:bg-white transition-colors"
        >
          Search
        </button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute mt-1 w-full glass-card max-h-64 overflow-y-auto text-sm z-10 border border-white/15">
          {results.map((r) => (
            <button
              key={r.id}
              type="button"
              className="w-full text-left px-3 py-2 hover:bg-white/10 flex justify-between items-center"
              onClick={() => handleSelect(r)}
            >
              <span className="text-slate-100">{r.name}</span>
              <span className="text-[11px] text-slate-400">{r.country}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchAutocomplete;
