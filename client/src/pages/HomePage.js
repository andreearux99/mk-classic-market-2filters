import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1 className="title">Main Categories</h1>
      <div className="main-categories">
        <div className="auto-category">
          <Link to={"/auto/filters"}>

          <button>Auto</button>
          </Link>
        </div>
        <div className="immobility-category category">
        <Link to={"/properties/filters"}>

          <button>Properties</button>
          </Link>
        </div>
        <div className="electronic-category category">
          <button>Electronics</button>
        </div>
        <div className="sport-category category">
          <button>Sports</button>
        </div>
        <div className="house-garden-category category">
          <button>House and garden stuff</button>
        </div>
        <div className="fashion-category category">
          <button>Clothes</button>
        </div>
        <div className="animals-category category">
          <button>Animals</button>
        </div>
      </div>
    </div>
  );
}
