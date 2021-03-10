import React from 'react';
import {Route, Switch} from "react-router-dom";

//call pages
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';

const Utama = () => (
    <Switch>
        <Route exact path="/" component={Gallery} />
        <Route path="/Cart" component={Cart} />
    </Switch>
)
export default Utama;