import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProperties, getCategories } from '../actions/property';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Property from '../components/Property';
import { Helmet } from 'react-helmet-async';
import { PROPERTY_DELETE_RESET } from '../constants/propertyActionTypes';
import { BiX, BiChevronDown } from 'react-icons/bi';
import {
  yearArr,
  usefulSurfaceArray,
  furnishedArray,
  priceArr,
  roomsArray,
  propertyCategories,
  allModels,
} from '../utils';
import PropertySearchBox from '../components/PropertySearchBox';

export default function FiltersProperty() {
  const [modelArray, setModelArray] = useState([]);
  const [propertyCategorySelected, setPropertyCategorySelected] = useState('all');
  const [furnishedSelected, setFurnishedSelected] = useState('all');
  const [roomsSelected, setRoomsSelected] = useState('all');
  const [minYearSelected, setMinYearSelected] = useState('From');
  const [maxYearSelected, setMaxYearSelected] = useState('To');
  const [minPriceSelected, setMinPriceSelected] = useState('From');
  const [maxPriceSelected, setMaxPriceSelected] = useState('To');
  const [minUsefulSurfaceSelected, setMinUsefulSurfaceSelected] = useState('From');
  const [maxUsefulSurfaceSelected, setMaxUsefulSurfaceSelected] = useState('To');
  //const [editInput, setEditInput] = useState(false);

  const navigate = useNavigate();
  const {
    propertyName = 'all',
    mainCategory = 'all',
    propertyCategory = 'all',
    furnished = 'all',
    rooms = 'all',
    minYear = 0,
    maxYear = 0,
    minUsefulSurface = 0,
    maxUsefulSurface = 0,
    minPrice = 0,
    maxPrice = 0,
  } = useParams();

  const dispatch = useDispatch();
  const propertiesList = useSelector((state) => state.propertiesList);
  const { loading, error, properties, count } = propertiesList;

  const deletedProperty = useSelector((state) => state.deletedProperty);
  const { error: errorDelete, success: successDelete } = deletedProperty;

  // const propertiesCategoryList = useSelector((state) => state.propertiesCategoryList);
  // const {
  //   loading: loadingCategory,
  //   error: errorCategory,
  //   categories,
  // } = propertiesCategoryList;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PROPERTY_DELETE_RESET });
    }
    //dispatch(getCategories());
    dispatch(
      getProperties({
        propertyName: propertyName !== 'all' ? propertyName : '',
        propertyCategory: propertyCategory !== 'all' ? propertyCategory : '',
        furnished: furnished !== 'all' ? furnished : '',
        rooms: rooms !== 'all' ? rooms : '',
        minYear,
        maxYear,
        minUsefulSurface,
        maxUsefulSurface,
        minPrice,
        maxPrice,
      })
    );
  }, [
    dispatch,
    propertyName,
    propertyCategory,
    furnished,
    rooms,
    successDelete,
    minUsefulSurface,
    maxUsefulSurface,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
  ]);

  const getFilterUrl = (filter) => {
    const filterPropertyCategory = filter.propertyCategory || propertyCategory;
    const filterFurnished = filter.furnished || furnished;
    const filterRooms = filter.rooms || rooms;
    const filterPropertyName = filter.propertyName || propertyName;

    const filterMinPrice = filter.minPrice
      ? filter.minPrice
      : filter.minPrice === 0
      ? 0
      : minPrice;
    const filterMaxPrice = filter.maxPrice
      ? filter.maxPrice
      : filter.maxPrice === 0
      ? 0
      : maxPrice;

    const filterMinYear = filter.minYear
      ? filter.minYear
      : filter.minYear === 0
      ? 0
      : minYear;
    const filterMaxYear = filter.maxYear
      ? filter.maxYear
      : filter.maxYear === 0
      ? 0
      : maxYear;

    const filterMinUsefulSurface = filter.minUsefulSurface
      ? filter.minUsefulSurface
      : filter.minUsefulSurface === 0
      ? 0
      : minUsefulSurface;
    const filterMaxUsefulSurface = filter.maxUsefulSurface
      ? filter.maxUsefulSurface
      : filter.maxUsefulSurface === 0
      ? 0
      : maxUsefulSurface;

    return `/properties/filters/propertyName/${filterPropertyName}/propertyCategory/${filterPropertyCategory}/furnished/${filterFurnished}/rooms/${filterRooms}/minPrice/${filterMinPrice}/maxPrice/${filterMaxPrice}/minYear/${filterMinYear}/maxYear/${filterMaxYear}/minUsefulSurface/${filterMinUsefulSurface}/maxUsefulSurface/${filterMaxUsefulSurface}`;
  };

  
  useEffect(() => {
    Object.entries(allModels).map((item) => {
      if (item[0] == propertyCategory) {
        setModelArray(item[1]);
      }
    });
  }, [propertyCategory, allModels]);

  return (
    <div className="main-container">
      <Helmet>
        <title>Market App</title>
      </Helmet>
      <PropertySearchBox />
      <h3>Filters</h3>{' '}
      <div className="filters-container">
        <section className="mainCategory">
          <label className="mb-1">Main category</label>
          <div className="dropdown" controlid="mainCategory">
            <button className="dropbtn">
              {' '}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content"></div>
          </div>
        </section>
        <section className="propertyCategory">
          <label className="mb-1">Category</label>
          {/* {loadingCategory ? (
            <LoadingBox></LoadingBox>
          ) : errorCategory ? (
            <MessageBox variant="danger">{errorCategory}</MessageBox>
          ) : ( */}
          <div className="dropdown" controlid="propertyCategory">
            <button className="dropbtn">
              {propertyCategorySelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {propertyCategories.map((p, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ propertyCategory: p, propertyName: 'all'})}
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    setPropertyCategorySelected(p)
                  }}
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>
          {/* )} */}
        </section>
        <section className="furnished">
          <label className="mb-1">Furnished</label>
          <div className="dropdown" controlid="furnished">
            <button className="dropbtn">
              {furnishedSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {furnishedArray.map((m, index) => (
                <Link
                  to={getFilterUrl({ furnished: m })}
                  style={{ textDecoration: 'none' }}
                  key={index}
                  onClick={() => setFurnishedSelected(m)}
                >
                  {m}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="rooms">
          <label className="mb-1">Rooms</label>
          <div className="dropdown" controlid="rooms">
            <button className="dropbtn">
              {roomsSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {roomsArray.map((c, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ rooms: c })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setRoomsSelected(c)}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="year">
          <label className="mb-1">Fabrication year</label>
          <div className="interval-filter">
            <div className="dropdown-interval" controlid="year">
              <button className="dropbtn-interval">
                {minYearSelected}
                <span>
                  {minYearSelected === 'From' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ minYear: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMinYearSelected('From')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {yearArr.map((y, index) => (
                  <Link
                    to={getFilterUrl({ minYear: y })}
                    key={index}
                    onClick={() => setMinYearSelected(y)}
                  >
                    {y}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown-interval" controlid="year">
              <button className="dropbtn-interval">
                {maxYearSelected}
                <span>
                  {maxYearSelected === 'To' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ maxYear: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMaxYearSelected('To')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {yearArr.map((y, index) => (
                  <Link
                    to={getFilterUrl({ maxYear: y })}
                    key={index}
                    onClick={() => setMaxYearSelected(y)}
                  >
                    {y}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="price">
          <label className="mb-1">Price</label>
          <div className="interval-filter">
            <div className="dropdown-interval" controlid="price">
              <button className="dropbtn-interval">
                {minPriceSelected}

                <span>
                  {minPriceSelected === 'From' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ minPrice: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMinPriceSelected('From')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {priceArr.map((p, index) => (
                  <Link
                    to={getFilterUrl({ minPrice: p })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMinPriceSelected(p)}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown-interval" controlid="price">
              <button className="dropbtn-interval">
                {maxPriceSelected}
                <span>
                  {maxPriceSelected === 'To' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ maxPrice: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMaxPriceSelected('To')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {priceArr.map((p, index) => (
                  <Link
                    to={getFilterUrl({ maxPrice: p })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMaxPriceSelected(p)}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="usefulSurface">
          <label className="mb-1">Useful Surface</label>
          <div className="interval-filter">
            <div className="dropdown-interval" controlid="usefulSurface">
              <button className="dropbtn-interval">
                {minUsefulSurfaceSelected}
                <span>
                  {minUsefulSurfaceSelected === 'From' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ minUsefulSurface: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMinUsefulSurfaceSelected('From')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {usefulSurfaceArray.map((e, index) => (
                  <Link
                    to={getFilterUrl({ minUsefulSurface: e })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMinUsefulSurfaceSelected(e)}
                  >
                    {e}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown-interval" controlid="usefulSurface">
              <button className="dropbtn-interval">
                {maxUsefulSurfaceSelected}
                <span>
                  {maxUsefulSurfaceSelected === 'To' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ maxUsefulSurface: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMaxUsefulSurfaceSelected('To')}
                      />
                    </Link>
                  )}{' '}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {usefulSurfaceArray.map((e, index) => (
                  <Link
                    to={getFilterUrl({ maxUsefulSurface: e })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMaxUsefulSurfaceSelected(e)}
                  >
                    {e}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {properties.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="product-list">
              {properties.map((property, index) => (
                <Property key={index} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
