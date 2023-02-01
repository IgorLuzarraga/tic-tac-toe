import * as status from './status_types.js'

export const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let result = status.NOT_WINNER_YET

    lines.forEach((line) => {
        const [a, b, c] = line

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            result = (squares[a] === 'X') ? status.WINNER_X : status.WINNER_O
        }
    })
    
    return result
}