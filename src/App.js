import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import CardList from './components/CardList'
import './styles/style.css';
import { CardsProvider } from "./providers/CardsProvider";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import Surprise from './components/Surprise'

export default class App extends Component {
  state = {
    cards: [
      {
        text: 'Dying',
        type: 'white',
      },
      {
        text: 'Justin Bieber',
        type: 'white',
      },
      {
        text: 'Drinking alone.',
        type: 'white',
      },
      {
        text: 'During my time at Ironhack, I have felt like ______.',
        type: 'black',
      },
      {
        text: 'What gets better with age?',
        type: 'black',
      },
    ]
  }

  addNewCard = (e, newCardValue) => {
    this.state.cards.push({
      text: newCardValue,
      type: e.target.attributes.type.value,
    })
  }

  editExistingCard = (index, cardText) => {
    this.state.cards[index].text = cardText;
    this.forceUpdate()
  }

  render() {
    return (
      <CardsProvider value={this.state.cards}>
        <Navbar />
        <Intro />
        <Switch>
          <Route exact path="/">
            <CardList onSubmit={this.addNewCard} onEdit={this.editExistingCard} />
          </Route>
          <Route exact path="/surprise">
            <Surprise />
          </Route>
        </Switch>
      </CardsProvider>
    );
  }
}
