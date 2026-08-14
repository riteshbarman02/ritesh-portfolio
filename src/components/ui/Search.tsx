"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search as SearchIcon, FileText, Code, X } from "lucide-react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allItems, setAllItems] = useState<any[]>([]);
  const [hasFetched, setHasFetched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search query
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const performSearch = async () => {
      setIsLoading(true);
      try {
        let items = allItems;
        if (!hasFetched) {
          const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
          const url = `${base.replace(/\/+$/, "")}/api/search/`.replace(/^\/{2,}/, "/");
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            items = data.results || [];
            if (isMounted) {
              setAllItems(items);
              setHasFetched(true);
            }
          }
        }

        if (!isMounted) return;

        const filtered = items.filter((item: any) => {
          const titleMatch = item.title?.toLowerCase().includes(q);
          const descMatch = item.description?.toLowerCase().includes(q);
          const techMatch = item.tech?.toLowerCase().includes(q);
          const tagMatch = Array.isArray(item.tags)
            ? item.tags.some((t: string) => String(t).toLowerCase().includes(q))
            : typeof item.tags === "string"
            ? item.tags.toLowerCase().includes(q)
            : false;

          return titleMatch || descMatch || techMatch || tagMatch;
        });

        setResults(filtered.slice(0, 8));
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const delayDebounce = setTimeout(performSearch, 150);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounce);
    };
  }, [query, allItems, hasFetched]);


  const handleSelectResult = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[220px]">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-9 pr-8 py-1 bg-background border-2 border-border doodle-border-sm text-text placeholder-text/40 focus:outline-none focus:border-primary text-sm font-body transition-colors duration-150"
        />
        <SearchIcon size={16} className="absolute left-3 text-text/50 pointer-events-none" />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 text-text/50 hover:text-text p-1 flex items-center justify-center"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown search results */}
      {isOpen && (query.trim() !== "") && (
        <div className="absolute top-11 right-0 w-[280px] sm:w-[320px] max-h-[360px] overflow-y-auto bg-background doodle-border-sm doodle-shadow z-[9999] flex flex-col p-2 select-none animate-in fade-in slide-in-from-top-1 duration-100">
          {isLoading && (
            <div className="p-4 text-center font-cursive text-text-subheading text-base">
              Searching sketchbook... ✏️
            </div>
          )}

          {!isLoading && results.length === 0 && (
            <div className="p-4 text-center font-cursive text-text-subheading text-base">
              No doodles found 🔍
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="flex flex-col gap-1">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={handleSelectResult}
                  className="flex items-start gap-3 p-2 rounded hover:bg-primary/10 transition-colors duration-100 text-left"
                >
                  <div className="mt-1 text-primary">
                    {item.type === "project" ? <Code size={16} /> : <FileText size={16} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-text-heading truncate font-body">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-xs text-text-subheading truncate font-body">
                        {item.description}
                      </div>
                    )}
                    <div className="text-[10px] text-primary/70 uppercase font-bold font-cursive mt-0.5">
                      {item.type} {item.tech && `• ${item.tech}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
