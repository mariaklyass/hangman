import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./img/0.jpg";
import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }
  reset() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map((letter) => (this.state.guessed.has(letter) ? letter : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(e) {
    let letter = e.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(letter),
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1),
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
      <button
        className="Hangman-btn"
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
    let gameState = this.generateButtons();
    if (isWinner) gameState = <span className="Hangman-msg">You Win!</span>;
    if (gameOver) gameState = <span className="Hangman-msg">You Lose!</span>;
    return (
      <div className="Hangman">
        <h1 className="Hangman-title">Hangman</h1>
        <img
          className="Hangman-img"
          src={this.props.images[this.state.nWrong]}
          alt={altText}
        />
        <p className="Hangman-guesses">{`Wrong Guesses: ${this.state.nWrong}`}</p>
        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>
        <p className="Hangman-btns">{gameState}</p>
        <button
          className="Hangman-btn Hangman-btn-reset"
          id="reset"
          onClick={this.reset}
        >
          Play Again?
        </button>
      </div>
    );
  }
}

export default Hangman;
