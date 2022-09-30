import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAutos, getCategories } from '../actions/auto';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Auto from '../components/Auto';
import { Helmet } from 'react-helmet-async';
import { AUTO_DELETE_RESET } from '../constants/autoActionTypes';
import { BiX, BiChevronDown } from 'react-icons/bi';
import {
  yearArr,
  caroseryArray,
  fuelArray,
  steeringWheelArray,
  colourArray,
  statusArray,
  kmArray,
  horsePowerArray,
  priceArr,
  engineArray,
  autoCategories,
  allModels,
} from '../utils';
import AutoSearchBox from '../components/AutoSearchBox';

export default function FiltersAuto() {
  const [autoCategorySelected, setAutoCategorySelected] = useState('all');
  const [modelSelected, setModelSelected] = useState('all');
  const [modelArray, setModelArray] = useState([]);
  const [caroserySelected, setCaroserySelected] = useState('all');
  const [fuelSelected, setFuelSelected] = useState('all');
  const [steeringWheelSelected, setSteeringWheelSelected] = useState('all');
  const [colourSelected, setColourSelected] = useState('all');
  const [statusSelected, setStatusSelected] = useState('all');
  const [minYearSelected, setMinYearSelected] = useState('From');
  const [maxYearSelected, setMaxYearSelected] = useState('To');
  const [minPriceSelected, setMinPriceSelected] = useState('From');
  const [maxPriceSelected, setMaxPriceSelected] = useState('To');
  const [minEngineSelected, setMinEngineSelected] = useState('From');
  const [maxEngineSelected, setMaxEngineSelected] = useState('To');
  const [minHorsePowerSelected, setMinHorsePowerSelected] = useState('From');
  const [maxHorsePowerSelected, setMaxHorsePowerSelected] = useState('To');
  const [minKmSelected, setMinKmSelected] = useState('From');
  const [maxKmSelected, setMaxKmSelected] = useState('To');
  //const [editInput, setEditInput] = useState(false);

  const navigate = useNavigate();
  const {
    autoName = 'all',
    mainCategory = 'all',
    autoCategory = 'all',
    model = 'all',
    carosery = 'all',
    fuel = 'all',
    steeringWheel = 'all',
    image = 'all',
    description = 'all',
    colour = 'all',
    status = 'all',
    minYear = 0,
    maxYear = 0,
    minKm = 0,
    maxKm = 0,
    minEngine = 0,
    maxEngine = 0,
    minHorsePower = 0,
    maxHorsePower = 0,
    minPrice = 0,
    maxPrice = 0,
  } = useParams();

  const dispatch = useDispatch();
  const autosList = useSelector((state) => state.autosList);
  const { loading, error, autos, count } = autosList;

  const deletedAuto = useSelector((state) => state.deletedAuto);
  const { error: errorDelete, success: successDelete } = deletedAuto;

  // const autosCategoryList = useSelector((state) => state.autosCategoryList);
  // const {
  //   loading: loadingCategory,
  //   error: errorCategory,
  //   categories,
  // } = autosCategoryList;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: AUTO_DELETE_RESET });
    }
    //dispatch(getCategories());
    dispatch(
      getAutos({
        autoName: autoName !== 'all' ? autoName : '',
        autoCategory: autoCategory !== 'all' ? autoCategory : '',
        model: model !== 'all' ? model : '',
        steeringWheel: steeringWheel !== 'all' ? steeringWheel : '',
        carosery: carosery !== 'all' ? carosery : '',
        colour: colour !== 'all' ? colour : '',
        status: status !== 'all' ? status : '',
        fuel: fuel !== 'all' ? fuel : '',
        minYear,
        maxYear,
        minKm,
        maxKm,
        minEngine,
        maxEngine,
        minHorsePower,
        maxHorsePower,
        minPrice,
        maxPrice,
      })
    );
  }, [
    dispatch,
    autoName,
    autoCategory,
    model,
    steeringWheel,
    carosery,
    colour,
    successDelete,
    status,
    fuel,
    minYear,
    maxYear,
    minKm,
    maxKm,
    minEngine,
    maxEngine,
    minHorsePower,
    maxHorsePower,
    minPrice,
    maxPrice,
  ]);

  const getFilterUrl = (filter) => {
    const filterAutoCategory = filter.autoCategory || autoCategory;
    const filterModel = filter.model || model;
    const filterSteeringWheel = filter.steeringWheel || steeringWheel;
    const filterCarosery = filter.carosery || carosery;
    const filterColour = filter.colour || colour;
    const filterStatus = filter.status || status;
    const filterAutoName = filter.autoName || autoName;
    const filterFuel = filter.fuel || fuel;
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

    const filterMinKm = filter.minKm
      ? filter.minKm
      : filter.minKm === 0
      ? 0
      : minKm;
    const filterMaxKm = filter.maxKm
      ? filter.maxKm
      : filter.maxKm === 0
      ? 0
      : maxKm;

    const filterMinEngine = filter.minEngine
      ? filter.minEngine
      : filter.minEngine === 0
      ? 0
      : minEngine;
    const filterMaxEngine = filter.maxEngine
      ? filter.maxEngine
      : filter.maxEngine === 0
      ? 0
      : maxEngine;

    const filterMinHorsePower = filter.minHorsePower
      ? filter.minHorsePower
      : filter.minHorsePower === 0
      ? 0
      : minHorsePower;
    const filterMaxHorsePower = filter.maxHorsePower
      ? filter.maxHorsePower
      : filter.maxHorsePower === 0
      ? 0
      : maxHorsePower;

    return `/auto/filters/autoName/${filterAutoName}/autoCategory/${filterAutoCategory}/model/${filterModel}/steeringWheel/${filterSteeringWheel}/carosery/${filterCarosery}/colour/${filterColour}/status/${filterStatus}/fuel/${filterFuel}/minPrice/${filterMinPrice}/maxPrice/${filterMaxPrice}/minYear/${filterMinYear}/maxYear/${filterMaxYear}/minKm/${filterMinKm}/maxKm/${filterMaxKm}/minEngine/${filterMinEngine}/maxEngine/${filterMaxEngine}/minHorsePower/${filterMinHorsePower}/maxHorsePower/${filterMaxHorsePower}`;
  };

  function resetFilters() {
    setModelSelected('all');
  }
  useEffect(() => {
    Object.entries(allModels).map((item) => {
      if (item[0] == autoCategory) {
        setModelArray(item[1]);
      }
    });
  }, [autoCategory, allModels]);

  return (
    <div className="main-container">
      <Helmet>
        <title>Market App</title>
      </Helmet>
      <AutoSearchBox />

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
        <section className="autoCategory">
          <label className="mb-1">Category</label>
          {/* {loadingCategory ? (
            <LoadingBox></LoadingBox>
          ) : errorCategory ? (
            <MessageBox variant="danger">{errorCategory}</MessageBox>
          ) : ( */}
          <div className="dropdown" controlid="category">
            <button className="dropbtn">
              {autoCategorySelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {autoCategories.map((c, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ autoCategory: c, autoName: 'all', model: 'all' })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => {
                    setAutoCategorySelected(c); resetFilters()
                  }}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
          {/* )} */}
        </section>
        <section className="model">
          <label className="mb-1">Model</label>
          <div className="dropdown" controlid="model">
            <button className="dropbtn">
              {modelSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {modelArray.map((m, index) => (
                <Link
                  to={getFilterUrl({ model: m })}
                  style={{ textDecoration: 'none' }}
                  key={index}
                  onClick={() => setModelSelected(m)}
                >
                  {m}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="carosery">
          <label className="mb-1">Carosery</label>
          <div className="dropdown" controlid="carosery">
            <button className="dropbtn">
              {caroserySelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {caroseryArray.map((c, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ carosery: c })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setCaroserySelected(c)}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="fuel">
          <label className="mb-1">Fuel</label>
          <div className="dropdown" controlid="fuel">
            <button className="dropbtn">
              {fuelSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {fuelArray.map((f, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ fuel: f })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setFuelSelected(f)}
                >
                  {f}
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
        <section className="engine-capacity">
          <label className="mb-1">Engine capacity</label>
          <div className="interval-filter">
            <div className="dropdown-interval" controlid="engine-capacity">
              <button className="dropbtn-interval">
                {minEngineSelected}
                <span>
                  {minEngineSelected === 'From' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ minEngine: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMinEngineSelected('From')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {engineArray.map((e, index) => (
                  <Link
                    to={getFilterUrl({ minEngine: e })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMinEngineSelected(e)}
                  >
                    {e}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown-interval" controlid="engine-capacity">
              <button className="dropbtn-interval">
                {maxEngineSelected}
                <span>
                  {maxEngineSelected === 'To' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ maxEngine: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMaxEngineSelected('To')}
                      />
                    </Link>
                  )}{' '}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {engineArray.map((e, index) => (
                  <Link
                    to={getFilterUrl({ maxEngine: e })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMaxEngineSelected(e)}
                  >
                    {e}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="horse-power">
          <label className="mb-1">Horse power</label>
          <div className="interval-filter">
            <div className="dropdown-interval" controlid="horse-power">
              <button className="dropbtn-interval">
                {minHorsePowerSelected}
                <span>
                  {minHorsePowerSelected === 'From' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ minHorsePower: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMinHorsePowerSelected('From')}
                      />
                    </Link>
                  )}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {horsePowerArray.map((h, index) => (
                  <Link
                    to={getFilterUrl({ minHorsePower: h })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMinHorsePowerSelected(h)}
                  >
                    {h}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown-interval" controlid="horse-power">
              <button className="dropbtn-interval">
                {maxHorsePowerSelected}
                <span>
                  {maxHorsePowerSelected === 'To' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ maxHorsePower: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMaxHorsePowerSelected('To')}
                      />
                    </Link>
                  )}{' '}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {horsePowerArray.map((h, index) => (
                  <Link
                    to={getFilterUrl({ maxHorsePower: h })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMaxHorsePowerSelected(h)}
                  >
                    {h}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="km">
          <label className="mb-1">Km on board</label>
          <div className="interval-filter">
            <div className="dropdown-interval" controlid="km">
              <button className="dropbtn-interval">
                {minKmSelected}
                <span>
                  {minKmSelected === 'From' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ minKm: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMinKmSelected('From')}
                      />
                    </Link>
                  )}{' '}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {kmArray.map((k, index) => (
                  <Link
                    to={getFilterUrl({ minKm: k })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMinKmSelected(k)}
                  >
                    {k}
                  </Link>
                ))}
              </div>
            </div>
            <div className="dropdown-interval" controlid="km">
              <button className="dropbtn-interval">
                {maxKmSelected}
                <span>
                  {maxKmSelected === 'To' ? (
                    <BiChevronDown className="icon-style" />
                  ) : (
                    <Link to={getFilterUrl({ maxKm: 0 })}>
                      <BiX
                        className="icon-style"
                        onClick={() => setMaxKmSelected('To')}
                      />
                    </Link>
                  )}{' '}
                </span>
              </button>
              <div className="dropdown-content-interval">
                {kmArray.map((k, index) => (
                  <Link
                    to={getFilterUrl({ maxKm: k })}
                    key={index}
                    style={{ textDecoration: 'none' }}
                    onClick={() => setMaxKmSelected(k)}
                  >
                    {k}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="steering-wheel">
          <label className="mb-1">Steering wheel</label>
          <div className="dropdown" controlid="steering-wheel">
            <button className="dropbtn">
              {steeringWheelSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {steeringWheelArray.map((steer, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ steeringWheel: steer })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setSteeringWheelSelected(steer)}
                >
                  {steer}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="colour">
          <label className="mb-1">Colour</label>
          <div className="dropdown" controlid="colour">
            <button className="dropbtn">
              {colourSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {colourArray.map((col, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ colour: col })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setColourSelected(col)}
                >
                  {col}
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="status">
          <label className="mb-1">Status</label>
          <div className="dropdown" controlid="status">
            <button className="dropbtn">
              {statusSelected}
              <span>
                <BiChevronDown className="icon-style" />
              </span>
            </button>
            <div className="dropdown-content">
              {statusArray.map((sts, index) => (
                <Link
                  key={index}
                  to={getFilterUrl({ status: sts })}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setStatusSelected(sts)}
                >
                  {sts}
                </Link>
              ))}
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
            {autos.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="product-list">
              {autos.map((auto, index) => (
                <Auto key={index} auto={auto} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
