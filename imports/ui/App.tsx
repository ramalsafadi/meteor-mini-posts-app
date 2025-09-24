
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { GlobalStyles } from './GlobalStyles';
import { StarsBackground } from './components/StarsBackground';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ListPage } from './pages/ListPage';
import { CreatePage } from './pages/CreatePage';
import { ViewPage } from './pages/ViewPage';
import { EditPage } from './pages/EditPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <StarsBackground />
    <Router>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={ListPage} />
            <Route exact path="/new" component={CreatePage} />
            <Route exact path="/posts/:_id" component={ViewPage} />
            <Route exact path="/posts/:_id/edit" component={EditPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </Router>
  </ThemeProvider>
);