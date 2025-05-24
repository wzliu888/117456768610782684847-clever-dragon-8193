import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: ChessApp,
})

// Simple chess piece definitions
type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'

interface Piece {
  type: PieceType
  color: PieceColor
}

type Square = Piece | null
type Board = Square[][]

// Chess piece Unicode symbols
const PIECE_SYMBOLS = {
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

// Initialize chess board with starting positions
function initializeBoard(): Board {
  const board: Board = Array(8).fill(null).map(() => Array(8).fill(null))
  
  // Place black pieces
  board[0] = [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' }
  ]
  
  for (let i = 0; i < 8; i++) {
    board[1][i] = { type: 'pawn', color: 'black' }
    board[6][i] = { type: 'pawn', color: 'white' }
  }
  
  // Place white pieces
  board[7] = [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' }
  ]
  
  return board
}

function ChessApp() {
  const [board, setBoard] = useState<Board>(initializeBoard)
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<PieceColor>('white')
  
  const handleSquareClick = (row: number, col: number) => {
    if (selectedSquare) {
      // Move piece
      const [fromRow, fromCol] = selectedSquare
      const newBoard = board.map(row => [...row])
      
      // Simple move validation - only check if there's a piece to move
      const piece = newBoard[fromRow][fromCol]
      if (piece && piece.color === currentPlayer) {
        newBoard[row][col] = piece
        newBoard[fromRow][fromCol] = null
        setBoard(newBoard)
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white')
      }
      
      setSelectedSquare(null)
    } else {
      // Select piece
      const piece = board[row][col]
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col])
      }
    }
  }
  
  const resetGame = () => {
    setBoard(initializeBoard())
    setSelectedSquare(null)
    setCurrentPlayer('white')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Simple Chess Game</h1>
          <div className="flex justify-center items-center gap-4 mb-4">
            <p className="text-lg font-medium">
              Current Player: 
              <span className={`ml-2 px-3 py-1 rounded ${
                currentPlayer === 'white' ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'
              }`}>
                {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
              </span>
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
            >
              Reset Game
            </button>
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 w-fit">
            {board.map((row, rowIndex) =>
              row.map((square, colIndex) => {
                const isDark = (rowIndex + colIndex) % 2 === 1
                const isSelected = selectedSquare && 
                  selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`w-16 h-16 flex items-center justify-center text-3xl cursor-pointer transition-colors ${
                      isDark ? 'bg-amber-700' : 'bg-amber-100'
                    } ${
                      isSelected ? 'ring-4 ring-blue-500' : ''
                    } hover:brightness-110`}
                    onClick={() => handleSquareClick(rowIndex, colIndex)}
                  >
                    {square && (
                      <span className="select-none">
                        {PIECE_SYMBOLS[square.color][square.type]}
                      </span>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <div className="text-sm text-gray-600 max-w-md mx-auto">
            <p className="mb-2">Click on a piece to select it, then click on another square to move.</p>
            <p>This is a simple chess board - basic rules apply but advanced features like check detection are not implemented.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
