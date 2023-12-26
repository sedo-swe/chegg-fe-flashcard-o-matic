import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Components/Home";
import AddCard from "./Components/AddCard";
import CreateDeck from "./Components/CreateDeck";
import Deck from "./Components/Deck";
import EditCard from "./Components/EditCard";
import EditDeck from "./Components/EditDeck";
import Study from "./Components/Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route exact={true} path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <Deck />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact={true} path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
