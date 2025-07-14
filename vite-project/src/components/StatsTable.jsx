import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const StatsTable = () => {
  const keys = Object.keys(localStorage);
  const rows = keys.map((key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return { shortcode: key, ...data };
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Shortcode</TableCell>
          <TableCell>Original URL</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Expiry</TableCell>
          <TableCell>Total Clicks</TableCell>
          <TableCell>Click Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(({ shortcode, originalUrl, createdAt, expiryTime, clicks }) => (
          <TableRow key={shortcode}>
            <TableCell>{shortcode}</TableCell>
            <TableCell>{originalUrl}</TableCell>
            <TableCell>{createdAt}</TableCell>
            <TableCell>{expiryTime}</TableCell>
            <TableCell>{clicks.length}</TableCell>
            <TableCell>
              {clicks.map((c, i) => (
                <div key={i}>
                  {c.timestamp} - {c.source} - {c.location}
                </div>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsTable;