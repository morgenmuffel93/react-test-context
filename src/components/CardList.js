import React, { Component } from 'react';
import Card from './Card'
import CardDetails from './CardDetails'
import { CardsConsumer } from "../providers/CardsProvider";
import { withRouter } from 'react-router'


class CardList extends Component {
  state = {
    isInBlack: true,
    isInWhite: false,
    addingNewCard: false,
    showingCardDetails: false,
    detailedCardIndex: null,
    newCardText: '',
    error: '',
  }

  showBlackCards = () => {
    this.setState({
      isInBlack: true,
      isInWhite: false,
      addingNewCard: false,
    })
  }

  showWhiteCards = () => {
    this.setState({
      isInBlack: false,
      isInWhite: true,
      addingNewCard: false,
    })
  }

  displayButtons = () => {
    if (this.state.isInBlack) {
      return <div className="card-list-opt">
        <div onClick={this.showBlackCards} className="selected-option list-option">Black</div>
        <div onClick={this.showWhiteCards} className="list-option">White</div>
      </div>
    } else if (this.state.isInWhite) {
      return <div className="card-list-opt">
        <div onClick={this.showBlackCards} className="list-option">Black</div>
        <div onClick={this.showWhiteCards} className="selected-option list-option">White</div>
      </div>
    }
  }

  displayBlackOrWhiteCards = (cardList) => {
    if (this.state.isInBlack) {
      return (
        cardList.map((card, index) => {
          if (card.type === 'black') {
            return <div key={index} className="guide-card-container">
              <Card info={card} index={index} class="black-card" onSubmit={this.editCard} onDetails={this.showCardDetails} />
            </div>
          }
        })
      )
    } else if (this.state.isInWhite) {
      return (
        cardList.map((card, index) => {
          if (card.type === 'white') {
            return <div key={index} className="guide-card-container">
              <Card info={card} index={index} class="white-card" onSubmit={this.editCard} onDetails={this.showCardDetails} />
            </div>
          }
        })
      )
    }
  }

  checkIfAdding = () => {
    if (this.state.addingNewCard && this.state.isInBlack) {
      return <div className="guide-card-container">
        <form className="black-card add-card">
          <textarea name="text" cols="20" rows="13" className="add-black-text" onChange={this.handleNewCardText} />
          <button type="black" className="add-card-btn" onClick={this.addNewCard}>Add</button>
          <button className="add-card-btn" onClick={this.discardNewCard}>Discard</button>
          <div className="error-msg">{this.state.error}</div>
        </form>
      </div>
    } else if (this.state.addingNewCard && this.state.isInWhite) {
      return <div className="guide-card-container">
        <form className="white-card add-card">
          <textarea name="text" cols="20" rows="13" className="add-white-text" onChange={this.handleNewCardText} />
          <button type="white" className="add-card-btn" onClick={this.addNewCard}>Add</button>
          <button className="add-card-btn" onClick={this.discardNewCard}>Discard</button>
          <div className="error-msg">{this.state.error}</div>
        </form>
      </div>
    } else {
      return <div className="add-img-container">
        <img src={require('../images/add-card.svg')} className="add-card-img" alt="Add new card" onClick={this.showAddCardForm} />
      </div>
    }
  }

  showAddCardForm = () => {
    this.setState({
      addingNewCard: true,
      error: '',
    })
  }

  handleNewCardText = (e) => {
    this.setState({
      newCardText: e.target.value
    })
  }

  addNewCard = (e) => {
    e.preventDefault()
    if (this.state.newCardText) {
      if (this.state.newCardText.indexOf('_') >= 0) {

        if (e.target.attributes.type.value === 'white') {
          this.setState({
            error: 'White cards cannot have blanks.'
          })

        } else {
          let replaced = this.state.newCardText.replace(/_+/, '______')

          this.props.onSubmit(e, replaced)

          this.setState({
            addingNewCard: false,
            error: '',
            newCardText: '',
          })
        }
      } else {
        let cardText = this.state.newCardText;

        this.props.onSubmit(e, cardText)

        this.setState({
          addingNewCard: false,
          error: '',
          newCardText: '',
        })
      }
    } else {
      this.setState({
        error: 'You are supposed to write something there'
      })
    }


  }

  discardNewCard = (e) => {
    e.preventDefault()
    this.setState({
      newCardText: '',
      addingNewCard: false,
      error: '',
    })
  }

  editCard = (data) => {
    let index = data.cardIndex
    let newText = data.cardText
    this.props.onEdit(index, newText)
  }

  showCardDetails = (index) => {
    this.setState({
      showingCardDetails: true,
      detailedCardIndex: index,
    })
  }

  showCardList = () => {
    this.setState({
      showingCardDetails: false,
      detailedCardIndex: null,
    })
  }

  render() {
    if (this.state.showingCardDetails && this.state.detailedCardIndex) {
      return (
        <CardsConsumer>
          {cardsList => {
            return <CardDetails cardInfo={cardsList[this.state.detailedCardIndex]} cardList={cardsList} handleBackButton={this.showCardList} />
          }}
        </CardsConsumer>
      )
    } else {
      return (
        <CardsConsumer>
          {cardsList => {
            return (
              <section>
                {this.displayButtons(cardsList)}
                <div className="card-cuadricle">
                  {this.displayBlackOrWhiteCards(cardsList)}
                  {this.checkIfAdding()}
                </div>
              </section>
            )
          }
          }
        </CardsConsumer>
      )
    }
  }
}

export default withRouter(CardList)