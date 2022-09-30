import Spinner from 'react-bootstrap/Spinner';
import React from 'react';

export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status" className='ms-20'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
