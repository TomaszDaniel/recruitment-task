import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'react-bootstrap'

import './App.css';
import CompaniesProvider from './context/companies-context'
import CompaniesList from './components/Companies/CompaniesList'
import Company from './components/Companies/Company'

const App = () => {

  return (
    <Router>
      <Container>
        <CompaniesProvider>
          <Switch>
            <Route path="/" exact>
              <CompaniesList />
            </Route>
            <Route path="/company/:id" component={Company} />>
          </Switch>
        </CompaniesProvider>
      </Container>
    </Router>
  );
}

export default App;
