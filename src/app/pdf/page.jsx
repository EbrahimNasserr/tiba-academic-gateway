"use client";
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a PDF file first');

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    const res = await fetch('/api/extract', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.text) {
      setExtractedText(data.text);
      setSummaryText('');
    } else {
      alert('Failed to extract text');
    }
  };

  const handleSummarize = async () => {
    if (!extractedText) return alert('No text to summarize.');
  
    setSummarizing(true);
  
    const res = await fetch('/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: extractedText }),
    });
  
    const data = await res.json();
    setSummarizing(false);
  
    if (data.summary) {
      setSummaryText(data.summary);
    } else {
      alert('Failed to summarize');
    }
  };
  

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upload PDF to Extract Text</h1>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? 'Extracting...' : 'Upload & Extract'}
        </button>
      </form>

      {extractedText && (
        <div className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          <h2 className="font-semibold mb-2">Extracted Text:</h2>
          <p>{extractedText}</p>
        </div>
      )}

      {extractedText && (
        <div className="mt-6 space-y-4">
          <h2 className="font-semibold">Summarized Text:</h2>
          <textarea
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            placeholder="The summary will appear here after processing"
            className="w-full bg-white h-40 p-2 border rounded resize-none"
          />
          <button
            onClick={handleSummarize}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {summarizing ? 'Summarizing...' : 'Summarize'}
          </button>
        </div>
      )}
    </div>
  );
}
