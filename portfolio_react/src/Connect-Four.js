import {useState} from "react";

export default function ConnectFour() {
    const [board, setboard] = useState([
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
    ]);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [isWinner, setIsWinner] = useState(false);

    const fullBoard = board.map((row, rowIdx) => {
        return row.map((val,colIdx) => {
            return (
                <ConnectFourSquare
                    key={colIdx + "" + rowIdx}
                    setboard={setboard}
                    colIdx={colIdx}
                    rowIdx={rowIdx}
                    currentPlayer={currentPlayer}
                    board={board}
                    setCurrentPlayer={setCurrentPlayer}
                    setIsWinner={setIsWinner}
                    isWinner={isWinner}
                />
            )
        })
    })
}