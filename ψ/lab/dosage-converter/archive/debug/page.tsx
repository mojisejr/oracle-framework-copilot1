'use client';

import { useDosageCalculator } from '@/hooks/use-dosage-calculator';
import { useEffect } from 'react';

export default function DebugPage() {
  const {
    values,
    result,
    history,
    isLoaded,
    setStandardAmount,
    setStandardVolume,
    setTargetVolume,
    addToHistory,
    clearHistory,
    deleteHistoryItem
  } = useDosageCalculator();

  // Auto-test logic on mount
  useEffect(() => {
    console.log('Debug Page Mounted');
    console.log('Initial State:', { values, result, history });
  }, []);

  useEffect(() => {
    console.log('Result Updated:', result);
  }, [result]);

  if (!isLoaded) return <div>Loading storage...</div>;

  return (
    <div className="p-8 font-mono text-sm">
      <h1 className="text-xl font-bold mb-4">Phase 1: Logic & Persistence Debug</h1>
      
      <div className="grid gap-4 max-w-md border p-4 mb-4">
        <h2 className="font-bold">Inputs</h2>
        <div>
          <label>Standard Amount (cc): </label>
          <input 
            type="number" 
            className="border p-1"
            value={values.standardAmount}
            onChange={(e) => setStandardAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Standard Volume (L): </label>
          <input 
            type="number" 
            className="border p-1"
            value={values.standardVolume}
            onChange={(e) => setStandardVolume(e.target.value)}
          />
        </div>
        <div>
          <label>Target Volume (L): </label>
          <input 
            type="number" 
            className="border p-1"
            value={values.targetVolume}
            onChange={(e) => setTargetVolume(e.target.value)}
          />
        </div>
      </div>

      <div className="border p-4 mb-4 bg-green-50 dark:bg-green-900/20">
        <h2 className="font-bold">Calculation Result</h2>
        <p className="text-2xl">{result !== null ? result.toFixed(2) : '---'}</p>
        <button 
          onClick={addToHistory}
          className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
          disabled={result === null}
        >
          Save to History
        </button>
      </div>

      <div className="border p-4">
        <div className="flex justify-between mb-2">
          <h2 className="font-bold">History ({history.length})</h2>
          <button onClick={clearHistory} className="text-red-500">Clear All</button>
        </div>
        <ul className="space-y-2">
          {history.map((item) => (
            <li key={item.id} className="border-b pb-1 flex justify-between">
              <span>
                {item.standardAmount}/{item.standardVolume}L -&gt; {item.targetVolume}L = 
                <strong> {item.result.toFixed(2)}</strong>
              </span>
              <button onClick={() => deleteHistoryItem(item.id)} className="text-red-500 ml-2">x</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800">
        <h2 className="font-bold">LocalStorage Dump</h2>
        <pre>{typeof window !== 'undefined' && localStorage.getItem('dosage-converter-storage')}</pre>
      </div>
    </div>
  );
}
