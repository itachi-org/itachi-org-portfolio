import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import './VisitorCounter.css';

/**
 * Visitor counter.
 *
 * Uses the free, no-signup CountAPI service (https://countapi.xyz) to
 * keep a real shared count across all visitors. Swap NAMESPACE/KEY for
 * something unique to your domain before deploying (e.g. your GitHub
 * username), since CountAPI namespaces are public/shared.
 *
 * If the API is unreachable (offline, ad-blocker, API down), the
 * counter falls back to a local "your visits" tally stored in this
 * browser only, so the widget never breaks or shows a dead state.
 */
const NAMESPACE = 'itachi-org-portfolio';
const KEY = 'site-visits';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    const alreadyCountedThisSession = sessionStorage.getItem('vc-counted');

    const useFallback = () => {
      const stored = Number(localStorage.getItem('vc-fallback-count') || '0');
      const next = alreadyCountedThisSession ? stored : stored + 1;
      localStorage.setItem('vc-fallback-count', String(next));
      sessionStorage.setItem('vc-counted', '1');
      setIsFallback(true);
      setCount(next);
    };

    const fetchCount = async () => {
      try {
        const endpoint = alreadyCountedThisSession
          ? `https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`
          : `https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error('CountAPI request failed');
        const data = await res.json();

        if (typeof data.value !== 'number') throw new Error('Unexpected response shape');

        sessionStorage.setItem('vc-counted', '1');
        setCount(data.value);
      } catch {
        useFallback();
      }
    };

    fetchCount();
  }, []);

  return (
    <div className="visitor-counter" title={isFallback ? 'Local count (live counter unavailable)' : 'Total site visits'}>
      <Eye size={16} className="vc-icon" aria-hidden="true" />
      <span className="vc-dot" aria-hidden="true"></span>
      <span>
        {count === null ? (
          'SYNCING...'
        ) : (
          <>
            <span className="vc-count">{count.toLocaleString()}</span> VISITORS
          </>
        )}
      </span>
    </div>
  );
}