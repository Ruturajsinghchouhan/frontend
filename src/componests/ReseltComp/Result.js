import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';
import './Result.css';

function Result() {
  const { state } = useLocation();
  const { from, to, date } = state || {};

  const [loading, setLoading] = useState(true);
  const [textData, setTextData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!from || !to || !date) {
      setError('Missing travel input. Please search again.');
      setLoading(false);
      return;
    }

    axios
      .post(`https://backend-wf81.onrender.com/search/get-data`, { from, to, date })
      .then((res) => {
        setTextData(res.data.text);
        setLoading(false);
      })
      .catch((err) => {
        const msg =
          err.response?.data?.error || 'Something went wrong while fetching data.';
        setError(msg);
        setLoading(false);
      });
  }, [from, to, date]);

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    const opt = {
      margin: 0.5,
      filename: `Travel_Options_${from}_to_${to}_${date}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!state) {
    return (
      <div className="result-page">
        <p className="result-error">No travel data provided. Please go back and search again.</p>
      </div>
    );
  }

  return (
    <div className="result-page">
      <h2>
        Best Travel Options from <b>{from}</b> to <b>{to}</b> on {date}
      </h2>

      {loading && <p className="result-loading">Loading travel options...</p>}
      {error && <p className="result-error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="download-container">
            <button className="download-btn" onClick={handleDownloadPDF}>
              📄 Download as PDF
            </button>
          </div>

          <div className="result-output markdown-body" id="pdf-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#007bff' }}
                  >
                    {props.children}
                  </a>
                ),
              }}
            >
              {textData}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;
