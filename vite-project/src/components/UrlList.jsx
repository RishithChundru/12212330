import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const UrlList = () => {
  const keys = Object.keys(localStorage);
  const urls = keys.map((key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return { shortcode: key, ...data };
  });

  return (
    <List>
      {urls.map(({ shortcode, originalUrl, expiry }) => (
        <ListItem key={shortcode}>
          <ListItemText
            primary={`Short URL: http://localhost:3000/${shortcode}`}
            secondary={`Original: ${originalUrl} | Expires at: ${expiry}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UrlList;
