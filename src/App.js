import React from 'react';
import './App.css';

import CompaniesProvider from './context/companies-context'
import CompaniesList from './components/CopmaniesList'

const App = () => {

  return (
    <CompaniesProvider>
      <CompaniesList />
    </CompaniesProvider>
  );
}

export default App;
