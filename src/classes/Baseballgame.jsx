import React, {Component} from "react";
import * as utils from "../algorithms/utils.js"
import * as functions from "../algorithms/functions.js"

import "./css/baseballgame.css"

export default class Baseballgame extends Component{
    constructor(props){
        super(props)
        this.state = {
            loginScreen: true,
            gameType: null,
            guesses: [],
            currentBox: 0,
            won: false,
        }
        this.handleCurrentChange = this.handleCurrentChange.bind(this)
        this.handleCurrentChange2 = this.handleCurrentChange2.bind(this)
    }
    renderLoginScreen(){
        if(this.state.loginScreen){
            return(
                <React.Fragment>
                    <img className="loginImg" src="/images/graybaseball.jpg" alt=""/>
                    <div className="strip">
                        <h className="title">A Baseball Game</h>
                        <h className="rules">Rules</h>
                        <button className="buttonComputer" onClick={() => {
                            let randomNo = functions.randomNumber(0,9999)
                            this.setState({gameType :"humanGuesses", loginScreen: false, truth: randomNo})}}
                            >Human Guesses</button>
                        <button className="buttonHuman" onClick={() => {
                            let possibilities = []
                            for(let i=0; i<10000;i++){
                                possibilities.push(utils.addzeros(i,4))
                            }
                            let guess = functions.getNumbersWithDifferentDigits(4)
                            this.setState({gameType :"computerGuesses", loginScreen: false, currentBox2: 0, possibilities: possibilities, guesses: [[guess,null]], initPossibilities: possibilities})}}>Computer Guesses</button>
                    </div>
                </React.Fragment>
            );
        }
    }
    submitGuess(){
        var {guesses, truth, currentBox} = this.state
        let query = utils.query(truth, currentBox)
        if(query["S"]===4){
            guesses.push([currentBox, query])
            this.setState({won: true});
        }
        else if(currentBox.toString().length===4){
            guesses.push([currentBox, query])
            this.setState({guesses: guesses, currentBox: 0})
        }else{
            
        }
    }
    submitComputerGuess(){
        var {guesses, currentBox, currentBox2, possibilities} = this.state
        //check illegal cases
        let sum = parseInt(currentBox2) + parseInt(currentBox)
        if(parseInt(currentBox) < 0 || parseInt(currentBox2) < 0 || sum > 4 || (parseInt(currentBox) === 3 && parseInt(currentBox2) === 1)){

        }else if(parseInt(currentBox)===4){
            let object = {
                "S": parseInt(currentBox,10),
                "B": parseInt(currentBox2,10),
            }
            guesses[guesses.length-1][1] = object
            this.setState({won: true})
        }else{
            let object = {
                "S": parseInt(currentBox,10),
                "B": parseInt(currentBox2,10),
            }
            guesses[guesses.length-1][1] = object
            let arr = utils.getNextGuessFromPrevious(possibilities, guesses[guesses.length-1][0], object)
            possibilities = arr[1]
            let nextPush = [arr[0], null]
            guesses.push(nextPush)
            this.setState({guesses:guesses, possibilities:possibilities, currentBox2: 0, currentBox: 0})
        }
    }

    handleCurrentChange(e){
        let lmao = e.target.value
        this.setState({currentBox: lmao})
    }
    handleCurrentChange2(e){
        let lmao = e.target.value
        this.setState({currentBox2: lmao})
    }

    renderInput(){
        if(!this.state.won){
            return(
                <React.Fragment>
                    <div className="humanInputDiv">
                        <input className="humanInputBox" type="string" value={this.state.currentBox} onChange={this.handleCurrentChange}></input>
                        <button className="humanInputSubmit" onClick={() => this.submitGuess()}>Submit</button>
                    </div>
                </React.Fragment>
            );
        }else{
            let newNo = functions.randomNumber(0,9999)
            return (
                <React.Fragment>
                    <p className="winParagraph">Congrats, you've won</p>
                    <button className="winButton" onClick={() => this.setState({won: false, guesses: [], truth: newNo, currentBox: 0})}>Play Again</button>
                </React.Fragment>
            );
        }
    }

    renderComputerInput(){
        if(!this.state.won){
            return(
                <React.Fragment>
                    <div className="computerInputDiv">
                        <input className="computerInputBoxStrike" type="number" value={this.state.currentBox} onChange={this.handleCurrentChange}></input>
                        <input className="computerInputBoxBall" type="number" value={this.state.currentBox2} onChange={this.handleCurrentChange2}></input>
                        <button className="computerInputSubmit" onClick={() => this.submitComputerGuess()}>Submit</button>
                    </div>
                </React.Fragment>
            );
        }else{
            const {initPossibilities} = this.state
            let newGuess = functions.getNumbersWithDifferentDigits(4)
            let noGuessesToWin = this.state.guesses.length
            if( noGuessesToWin>1){
                return (
                    <React.Fragment>
                        <p className="winParagraph">Computer took {noGuessesToWin} guesses to win</p>
                        <button className="winButton" onClick={() => this.setState({won: false, guesses: [[newGuess, null]], currentBox: 0, currentBox2: 0, possibilities: initPossibilities})}>Play Again</button>
                    </React.Fragment>
                );
            }else{
                return (
                    <React.Fragment>
                        <p className="winParagraph">Computer took {noGuessesToWin} guess to win</p>
                        <button className="winButton" onClick={() => this.setState({won: false, guesses: [[newGuess, null]], currentBox: 0, currentBox2: 0, possibilities: initPossibilities})}>Play Again</button>
                    </React.Fragment>
                );
            }
            
        }
    }
    renderGame(){
        if(!this.state.loginScreen){
            if(this.state.gameType === "computerGuesses"){
                return (
                    <React.Fragment>
                        <div className="humanLabel">
                            <h className="guessLabel">Guesses</h>
                            <img className="strikesImg" alt="" src="/images/baseballbat.png"/>
                            <img className="ballImg" alt="" src="/images/baseball.jpg"/>
                        </div>
                        {this.state.guesses.map(item => {
                            if(!(item[1] === null)){
                                return (
                                    <div className="guessDiv">
                                        <h1 className="humanGuessStyle">{item[0]}</h1>
                                        <h2 className="humanStrikeStyle">{item[1]["S"]}</h2>
                                        <h2 className="humanBallStyle">{item[1]["B"]}</h2>
                                    </div>
                                );
                            }else{
                                return (
                                    <div className="guessDiv">
                                        <h1 className="humanGuessStyle">{item[0]}</h1>
                                    </div>
                                );
                            }
                            
                        })}
                        
                        {this.renderComputerInput()}
                    </React.Fragment>
                );
            }
            else if(this.state.gameType === "humanGuesses"){
                console.log(this.state.truth)
                return (
                    <React.Fragment>
                        <div className="humanLabel">
                            <h className="guessLabel">Guesses</h>
                            <img className="strikesImg" alt="" src="/images/baseballbat.png"/>
                            <img className="ballImg" alt="" src="/images/baseball.jpg"/>
                        </div>
                        {this.state.guesses.map(item => {
                            return (
                                <div className="guessDiv">
                                    <h1 className="humanGuessStyle">{item[0]}</h1>
                                    <h2 className="humanStrikeStyle">{item[1]["S"]}</h2>
                                    <h2 className="humanBallStyle">{item[1]["B"]}</h2>
                                </div>
                            );
                        })}
                        {this.renderInput()}
                    </React.Fragment>
                );
            }
            else{return;}
        }
    }
    render(){
        return(
            <div>
                {this.renderLoginScreen()}
                {this.renderGame()}
            </div>
        );
    }

}