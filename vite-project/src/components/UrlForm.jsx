import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { isValidUrl, isValidShortcode } from '../utils/Validators';
import { generateShortcode } from '../utils/ShortCodeGenerator';
import { logger } from '../utils/loggerMiddleware';

const UrlForm = () => {
  const [inputs, setInputs] = useState([{ url: '', validity: '', code: '' }]);

  const handleChange = (index, field, value) => {
    const copy = [...inputs];
    copy[index][field] = value;
    setInputs(copy);
  };

  const formatIST = (date) =>
    date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
    });

  const handleSubmit = () => {
    const newUrls = [];
    inputs.forEach(({ url, validity, code }) => {
      if (!isValidUrl(url)) return;

      let finalCode = code || generateShortcode();
      if (code && !isValidShortcode(code)) return;

      if (localStorage.getItem(finalCode)) return;

      const createdAt = new Date();
      const expiry = new Date(createdAt.getTime() + (parseInt(validity || 30) * 60000));

      const newObj = {
        originalUrl: url,
        createdAt: formatIST(createdAt),
        expiry: formatIST(expiry),
        clicks: [],
      };

      localStorage.setItem(finalCode, JSON.stringify(newObj));
      logger.info('URL shortened', { url, finalCode });
      newUrls.push({ url, finalCode });
    });
    setInputs([{ url: '', validity: '', code: '' }]);
  };

  return (
    <Grid container spacing={2}>
      {inputs.map((input, i) => (
        <Grid item xs={12} key={i}>
          <TextField
            label="Long URL"
            value={input.url}
            onChange={(e) => handleChange(i, 'url', e.target.value)}
            fullWidth
          />
          <TextField
            label="Validity (min)"
            value={input.validity}
            onChange={(e) => handleChange(i, 'validity', e.target.value)}
            fullWidth
          />
          <TextField
            label="Custom Shortcode"
            value={input.code}
            onChange={(e) => handleChange(i, 'code', e.target.value)}
            fullWidth
          />
        </Grid>
      ))}
      {inputs.length < 5 && (
        <Button onClick={() => setInputs([...inputs, { url: '', validity: '', code: '' }])}>
          + Add Another URL
        </Button>
      )}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Shorten URLs
      </Button>
    </Grid>
  );
};

export default UrlForm;
