import React, {useState} from 'react'
import * as status from '../utils/status_types.js'


import {calculateWinner} from '../utils/tools.js'
import Square from '../components/Square'

const Board = () => {
    const [state, setState] = useState(initialState)

    const handleClick = handleClickHelper(setState)
    const renderSquare = renderSquareArr(handleClick)(state)
    
    const status = getStatus(state)

    return (
    <div>
        <div className="status">{status}</div>
        <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        </div>
        <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        </div>
        <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
        </div>
    </div>
    );
}

const initialState = 
    {
        squares: Array(9).fill(null),
        xIsNext: true,
        status: status.GAME_NOT_INIT
    }

 
    const renderSquareArrHelper = (value, handleClick) => 
    <Square 
        value={value} 
        onClick={handleClick}
    />

const renderSquareArr = handleClick => state => index => 
    renderSquareArrHelper(state.squares[index], () => handleClick(state)(index))
    
const handleClickHelper = setState => state => index => {
    const checkWinner = calculateWinner(state.squares)

    switch (checkWinner) {
        case status.WINNER_O:
        case status.WINNER_X:
            return
        default:
            const arrCopy = [...state.squares]
            arrCopy[index] = state.xIsNext ? 'X' : 'O'
            return setState({...state,
                squares: arrCopy,
                xIsNext: !state.xIsNext
            })
    }
}

const getStatus = (state) => {
    const checkWinner = calculateWinner(state.squares)

    switch (checkWinner) {
        case status.WINNER_X:
            return 'Winner: X'

        case status.WINNER_O:
            return 'Winner: O'

        case status.NOT_WINNER_YET:
            return 'Next player: ' + (state.xIsNext ? 'X' : 'O')
        
        default:
            return 'ERROR'
    }
}

export default Board
