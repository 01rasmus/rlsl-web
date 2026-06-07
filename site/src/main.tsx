import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import styled from 'styled-components'
import './index.css'
import Header, { HEADER_HEIGHT } from './components/Header.tsx'
import Playground, { PLAYGROUND_ROUTE } from './routes/Playground.tsx'
import Home, { HOME_ROUTE } from './routes/Home.tsx'
import Documentation, { DOCUMENTATION_ROUTE } from './routes/Documentation.tsx'
import NotFound from './routes/NotFound.tsx'

const RouteContainer = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT});
  margin-top: ${HEADER_HEIGHT};
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header/>
      <RouteContainer>
        <Routes>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path={PLAYGROUND_ROUTE} element={<Playground />} />
          <Route path={DOCUMENTATION_ROUTE} element={<Documentation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </RouteContainer>
    </BrowserRouter>
  </StrictMode>,
);