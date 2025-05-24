import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: ChessGame,
})

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'

interface Piece {
  type: PieceType
  color: PieceColor
}

type Board = (Piece | null)[][]

const pieceSymbols: Record<PieceColor, Record<PieceType, string>> = {
  white: {
    king: '♔',
    queen: '♕',
    rook: '♖',
    bishop: '♗',
    knight: '♘',
    pawn: '♙'
  },
  black: {
    king: '♚',
    queen: '♛',
    rook: '♜',
    bishop: '♝',
    knight: '♞',
    pawn: '♟'
  }
}

function createInitialBoard(): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null))
  
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' }
    board[6][i] = { type: 'pawn', color: 'white' }
  }
  
  const backRow: PieceType[] = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
  
  for (let i = 0; i < 8; i++) {
    board[0][i] = { type: backRow[i], color: 'black' }
    board[7][i] = { type: backRow[i], color: 'white' }
  }
  
  return board
}

function ChessGame() {
  const [board, setBoard] = useState<Board>(createInitialBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')
  const [gameStatus, setGameStatus] = useState<string>('White to move')

  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      const [selectedRow, selectedCol] = selectedSquare
      const piece = board[selectedRow][selectedCol]
      
      if (piece && piece.color === currentPlayer) {
        if (row !== selectedRow || col !== selectedCol) {
          const newBoard = board.map(r => [...r])
          newBoard[row][col] = piece
          newBoard[selectedRow][selectedCol] = null
          
          setBoard(newBoard)
          setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
          setGameStatus(`${currentPlayer === 'white' ? 'Black' : 'White'} to move`)
        }
      }
      
      setSelectedSquare(null)
    } else {
      const piece = board[row][col]
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col])
      }
    }
  }

  const resetGame = () => {
    setBoard(createInitialBoard())
    setSelectedSquare(null)
    setCurrentPlayer('white')
    setGameStatus('White to move')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">
          Chess Game
        </h1>
        
        <div className="text-center mb-6">
          <p className="text-xl text-amber-800 mb-4">{gameStatus}</p>
          <button
            onClick={resetGame}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Reset Game
          </button>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-8 bg-amber-900 p-2 rounded-lg shadow-2xl">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => {
                const isLight = (rowIndex + colIndex) % 2 === 0
                const isSelected = selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className={`
                      w-16 h-16 flex items-center justify-center text-4xl font-bold
                      transition-all duration-200 hover:scale-105
                      ${
                        isLight
                          ? isSelected
                            ? 'bg-yellow-300'
                            : 'bg-amber-100 hover:bg-amber-200'
                          : isSelected
                            ? 'bg-yellow-600'
                            : 'bg-amber-800 hover:bg-amber-700'
                      }
                      ${
                        piece && piece.color === currentPlayer
                          ? 'cursor-pointer'
                          : piece
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                      }
                    `}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {piece && pieceSymbols[piece.color][piece.type]}
                  </button>
                )
              })
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">How to Play</h2>
          <div className="bg-white/70 rounded-lg p-6 text-amber-800">
            <ul className="text-left max-w-md mx-auto space-y-2">
              <li>• Click on a piece to select it</li>
              <li>• Click on another square to move the piece</li>
              <li>• Players alternate turns (White starts)</li>
              <li>• This is a simplified version - all moves are allowed</li>
              <li>• Click "Reset Game" to start over</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
