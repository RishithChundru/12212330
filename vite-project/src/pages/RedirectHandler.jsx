import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { logger } from '../utils/loggerMiddleware';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const data = JSON.parse(localStorage.getItem(shortcode));

  if (!data || new Date() > new Date(data.expiry)) {
    logger.error('Invalid or expired shortcode', shortcode);
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const clickInfo = {
      timestamp: new Date().toISOString(),
      source: document.referrer || 'Direct',
      location: 'India',
    };
    data.clicks.push(clickInfo);
    localStorage.setItem(shortcode, JSON.stringify(data));
    logger.info('Redirect logged', clickInfo);
    window.location.href = data.originalUrl;
  }, [data, shortcode]);

  return null;
};

export default RedirectHandler;
