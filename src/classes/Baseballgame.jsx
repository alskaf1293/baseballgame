import React, {Component} from "react";
import * as utils from "../algorithms/utils.js"

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
                    <button onClick={() => {
                        let possibilities = []
                        for(let i=0; i<10000;i++){
                            possibilities.push(utils.addzeros(i,4))
                        }
                        let guess = getNumbersWithDifferentDigits(4)
                        this.setState({gameType :"humanGuesses", loginScreen: false, currentBox2: 0, possibilities: possibilities, guesses: [[guess,null]], initPossibilities: possibilities})}}
                        >Human Guesses</button>
                    <button onClick={() => {
                        let randomNo = randomNumber(0,9999)
                        this.setState({gameType :"computerGuesses", loginScreen: false, truth: randomNo})}}>Computer Guesses</button>
                </React.Fragment>
            );
        }
    }
    submitGuess(){
        var {guesses, truth, currentBox} = this.state
        let query = utils.query(truth, currentBox)
        if(query["S"]===4){
            this.setState({won: true});
        }
        else if(currentBox.toString().length===4){
            guesses.push([currentBox, query])
            this.setState({guesses: guesses, currentBox: 0})
        }else{
            
        }
    }
    submitHumanGuess(){
        var {guesses, currentBox, currentBox2, possibilities} = this.state
        //check illegal cases
        let sum = parseInt(currentBox2) + parseInt(currentBox)
        if(parseInt(currentBox) < 0 || parseInt(currentBox2) < 0 || sum > 4 || (parseInt(currentBox) === 3 && parseInt(currentBox2) === 1)){

        }else if(parseInt(currentBox)===4){
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
                    <input type="string" value={this.state.currentBox} onChange={this.handleCurrentChange}></input>
                    <button onClick={() => this.submitGuess()}>Submit</button>
                </React.Fragment>
            );
        }else{
            let newNo = randomNumber(0,9999)
            return (
                <React.Fragment>
                    <p>Congrats, you've won</p>
                    <button onClick={() => this.setState({won: false, guesses: [], truth: newNo, currentBox: 0})}>Play Again</button>
                </React.Fragment>
            );
        }
    }

    renderHumanInput(){
        if(!this.state.won){
            return(
                <React.Fragment>
                    <input type="number" value={this.state.currentBox} onChange={this.handleCurrentChange}></input>
                    <input type="number" value={this.state.currentBox2} onChange={this.handleCurrentChange2}></input>
                    <button onClick={() => this.submitHumanGuess()}>Submit</button>
                </React.Fragment>
            );
        }else{
            const {initPossibilities} = this.state
            let newGuess = getNumbersWithDifferentDigits(4)
            let noGuessesToWin = this.state.guesses.length
            if( noGuessesToWin>1){
                return (
                    <React.Fragment>
                        <p>Computer took {noGuessesToWin} guesses to win</p>
                        <button onClick={() => this.setState({won: false, guesses: [[newGuess, null]], currentBox: 0, currentBox2: 0, possibilities: initPossibilities})}>Play Again</button>
                    </React.Fragment>
                );
            }else{
                return (
                    <React.Fragment>
                        <p>Computer took {noGuessesToWin} guess to win</p>
                        <button onClick={() => this.setState({won: false, guesses: [[newGuess, null]], currentBox: 0, currentBox2: 0, possibilities: initPossibilities})}>Play Again</button>
                    </React.Fragment>
                );
            }
            
        }
    }
    renderGame(){
        if(!this.state.loginScreen){
            if(this.state.gameType === "humanGuesses"){
                let guessStyle = {
                    position: "absolute"
                }
                return (
                    <React.Fragment>
                        {this.state.guesses.map(item => {
                            return (
                                <div style={{height: 100}}>
                                    <h1 style={guessStyle}>{item[0]}</h1>
                                
                                </div>
                            );
                        })}
                        {this.renderHumanInput()}
                    </React.Fragment>
                );
            }
            else if(this.state.gameType === "computerGuesses"){
                let guessStyle = {
                    position: "absolute"
                }
                let strikeStyle = {
                    left: 150,
                    position: "absolute"
                }
                let ballStyle = {
                    left: 180,
                    position: "absolute"
                }
                return (
                    <React.Fragment>
                        {this.state.guesses.map(item => {
                            return (
                                <div style={{height: 100}}>
                                    <h1 style={guessStyle}>{item[0]}</h1>
                                    <h2 style={strikeStyle}>{item[1]["S"]}</h2>
                                    <h2 style={ballStyle}>{item[1]["B"]}</h2>
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
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min) + min).toString();
} 

function getNumbersWithDifferentDigits(noDigits){
    let digits = [0,1,2,3,4,5,6,7,8,9]
    let num = ""
    let randoIndex = 0
    let randoNo = 0
    for(let i=0; i<noDigits; i++){
        randoIndex = randomNumber(0,digits.length)
        randoNo = digits[randoIndex]
        num = num + randoNo.toString()
        digits.splice(randoIndex,1)
    }
    return num
}