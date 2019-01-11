import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import CardList from './components/CardList'
import './styles/style.css';
import { CardsProvider } from "./providers/CardsProvider";

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
        text: 'Justin Bieber2',
        type: 'white',
      },
      {
        text: 'Justin Bieber3',
        type: 'white',
      },
      {
        text: 'This shouldnt show',
        type: 'white',
      },
      {
        text: 'During my time at Ironhack, I have felt like ______.',
        type: 'black',
      },
    ]
  }

  addNewCard = (e, newCardValue) => {
      this.state.cards.push({
        text: newCardValue,
        type: e.target.attributes.type.value,
      })
      console.log(this.state.cards)
  }

  editExistingCard = (index, cardText) => {
    this.state.cards[index].text = cardText;
    this.forceUpdate()
  }

  render() {
    console.log(this.state.cards)
    return (
      <CardsProvider value={this.state.cards}>
          <Navbar />
          <Intro/>
          <CardList onSubmit={this.addNewCard} onEdit={this.editExistingCard}/>
      </CardsProvider>
    );
  }
}
