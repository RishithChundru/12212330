import React from 'react';
import { Container, Typography } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

const ShortenerPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <UrlForm />
      <UrlList />
    </Container>
  );
};

export default ShortenerPage;