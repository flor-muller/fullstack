import React, {Suspense} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes, Layout } from "./navigation/routes.js";
import { NewtonsCradle } from '@uiball/loaders';
import { Container } from '@mui/material';
import LimiteError from "./components/LimiteError";



const App = () => {
  return (
    <LimiteError>
    <Suspense fallback = {
      <Container 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
      >
        <NewtonsCradle 
          size={60}
          speed={1.4} 
          color="var(--first-color)"


        />
      </Container>}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {
                routes.map(({ id, path, Element }) => (
                  <Route key={id} path={path} element={<Element />} />
                ))
              }
            </Route>
          </Routes>
        </BrowserRouter>
    </Suspense>
    </LimiteError>
  );
};

export default App;
