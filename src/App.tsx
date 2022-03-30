import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageRender from './pages/PageRender'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import Alert from './components/common/Alert'
import { useDispatch } from 'react-redux'
import { refreshToken } from './redux/actions/authAction'
import {getBlogs} from "./redux/actions/blogAction";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
        dispatch(getBlogs())
    }, [dispatch])
  return (
    <div className="container">
      <Router>
          <Alert />
          <Header />
          <Switch>
              <Route exact path="/" component={PageRender} />
              <Route exact path="/:page" component={PageRender} />
              <Route exact path="/:page/:slug" component={PageRender} />
          </Switch>
          <Footer />
      </Router>
    </div>
  );
}

export default App;
