import React from 'react';
import { Container } from 'react-bootstrap'

import './App.css';
import CompaniesProvider from './context/companies-context'
import CompaniesList from './components/CopmaniesList'

const App = () => {

  return (
    <Container>
      <CompaniesProvider>
        <CompaniesList />
      </CompaniesProvider>
    </Container>
  );
}

export default App;
