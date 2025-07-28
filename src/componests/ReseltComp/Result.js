import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Result.css';

function Result() {
  const { state } = useLocation();
  const { from, to, date } = state;

  const [loading, setLoading] = useState(true);
  const [textData, setTextData] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .post('https://backend-wf81.onrender.com/search/get-data', { from, to, date })
      .then((res) => {
        setTextData(res.data.text);
        setLoading(false);
      })
      .catch(() => {
        setError('Something went wrong while fetching data.');
        setLoading(false);
      });
  }, [from, to, date]);

  return (
    <div className="result-page">
      <h2>
        Best Travel Options from <b>{from}</b> to <b>{to}</b> on {date}
      </h2>

      {loading && <p className="result-loading">Loading...</p>}
      {error && <p className="result-error">{error}</p>}

      {!loading && !error && (
        <div className="result-output markdown-body">
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
      )}
    </div>
  );
}

export default Result;
