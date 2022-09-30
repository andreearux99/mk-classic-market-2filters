import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const infoSearch = () =>
  toast(
    <div>
      <span className="info-icon">
        <i className="fas fa-info-circle"></i>
      </span>{' '}
      Type something in the search box!
    </div>
  );

export default function AutoSearchBox(props) {
  const [autoName, setAutoName] = useState('');
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (autoName === '') {
      infoSearch();
    } else {
      navigate(`/auto/filters/autoName/${autoName}`);
    }
  };

  return (
    <Form className="inputSearch" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          type="text"
          name="autoName"
          id="autoName"
          onChange={(e) => setAutoName(e.target.value)}
          placeholder="search auto..."
          aria-label="Search Product"
          aria-describedby="button-search"
        ></FormControl>
        <button className="button-search" type="submit" >
          <i className="fas fa-search"></i>
        </button>
      </InputGroup>
    </Form>
  );
}
