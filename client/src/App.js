import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import CreateAuto from './pages/CreateAuto';
import EditAuto from './pages/EditAuto';
import CreateProperty from './pages/CreateProperty';
import EditProperty from './pages/EditProperty';
import SearchBox from './components/AutoSearchBox';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import logo from './data/metaquantum3.0.png';
import FiltersAuto from './pages/FiltersAuto';
import FiltersProperty from './pages/FiltersProperty';

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <div>
        <header>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img src={logo} alt="metaquantum icon" />
          </Link>
          <Nav.Link href="/createAuto">
            <Button>New Auto</Button>
          </Nav.Link>
          <Nav.Link href="/createProperty">
            <Button>New Property</Button>
          </Nav.Link>
        </header>

        <main>
          <Routes>
            <Route path="/createAuto" element={<CreateAuto />} />
            <Route path="/:id/editAuto" element={<EditAuto />} />
            <Route path="/auto/filters" exact element={<FiltersAuto />} />
            <Route
              path="/auto/filters/autoName/:autoName"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status/fuel/:fuel"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status/fuel/:fuel/minPrice/:minPrice/maxPrice/:maxPrice"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status/fuel/:fuel/minPrice/:minPrice/maxPrice/:maxPrice/minYear/:minYear/maxYear/:maxYear"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status/fuel/:fuel/minPrice/:minPrice/maxPrice/:maxPrice/minYear/:minYear/maxYear/:maxYear/minKm/:minKm/maxKm/:maxKm"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status/fuel/:fuel/minPrice/:minPrice/maxPrice/:maxPrice/minYear/:minYear/maxYear/:maxYear/minKm/:minKm/maxKm/:maxKm/minEngine/:minEngine/maxEngine/:maxEngine"
              exact
              element={<FiltersAuto />}
            />
            <Route
              path="/auto/filters/autoName/:autoName/autoCategory/:autoCategory/model/:model/steeringWheel/:steeringWheel/carosery/:carosery/colour/:colour/status/:status/fuel/:fuel/minPrice/:minPrice/maxPrice/:maxPrice/minYear/:minYear/maxYear/:maxYear/minKm/:minKm/maxKm/:maxKm/minEngine/:minEngine/maxEngine/:maxEngine/minHorsePower/:minHorsePower/maxHorsePower/:maxHorsePower"
              exact
              element={<FiltersAuto />}
            />

            <Route path="/createProperty" element={<CreateProperty />} />
            <Route path="/:id/editProperty" element={<EditProperty />} />
           
            <Route
              path="/properties/filters"
              exact
              element={<FiltersProperty />}
            />
            <Route
              path="/properties/filters/propertyName/:propertyName"
              exact
              element={<FiltersProperty />}
            />
            <Route
              path="/properties/filters/propertyName/:propertyName/propertyCategory/:propertyCategory"
              exact
              element={<FiltersProperty />}
            />
            
            <Route
              path="/properties/filters/propertyName/:propertyName/propertyCategory/:propertyCategory/furnished/:furnished/rooms/:rooms/minPrice/:minPrice/maxPrice/:maxPrice"
              exact
              element={<FiltersProperty />}
            />
            <Route
              path="/properties/filters/propertyName/:propertyName/propertyCategory/:propertyCategory/furnished/:furnished/rooms/:rooms/minPrice/:minPrice/maxPrice/:maxPrice/minYear/:minYear/maxYear/:maxYear"
              exact
              element={<FiltersProperty />}
            />
            <Route
              path="/properties/filters/propertyName/:propertyName/propertyCategory/:propertyCategory/furnished/:furnished/rooms/:rooms/minPrice/:minPrice/maxPrice/:maxPrice/minYear/:minYear/maxYear/:maxYear/minUsefulSurface/:minUsefulSurface/maxUsefulSurface/:maxUsefulSurface"
              exact
              element={<FiltersProperty />}
            />
            <Route path="/" exact element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
