import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
type PieceColor = 'white' | 'black'

interface Piece {
  type: PieceType
  color: PieceColor
}

type Board = (Piece | null)[][]

const initialBoard: Board = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
]

const pieceSymbols: Record<PieceType, Record<PieceColor, string>> = {
  king: { white: '♔', black: '♚' },
  queen: { white: '♕', black: '♛' },
  rook: { white: '♖', black: '♜' },
  bishop: { white: '♗', black: '♝' },
  knight: { white: '♘', black: '♞' },
  pawn: { white: '♙', black: '♟' },
}

function ChessBoard() {
  const renderSquare = (piece: Piece | null, row: number, col: number) => {
    const isLight = (row + col) % 2 === 0
    const squareColor = isLight ? 'bg-amber-100' : 'bg-amber-800'
    
    return (
      <div
        key={`${row}-${col}`}
        className={`w-12 h-12 flex items-center justify-center text-3xl cursor-pointer hover:bg-blue-200 transition-colors ${squareColor}`}
        onClick={() => console.log(`Clicked ${row}, ${col}`)}
      >
        {piece && pieceSymbols[piece.type][piece.color]}
      </div>
    )
  }

  return (
    <div className="inline-block border-2 border-gray-800 bg-gray-900 p-2">
      {initialBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((piece, colIndex) => 
            renderSquare(piece, rowIndex, colIndex)
          )}
        </div>
      ))}
    </div>
  )
}

function GameInfo() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Game Status</h2>
      <div className="space-y-2">
        <p className="text-gray-600">Current Turn: <span className="font-semibold text-black">White</span></p>
        <p className="text-gray-600">Move Count: <span className="font-semibold">0</span></p>
        <p className="text-gray-600">Status: <span className="font-semibold text-green-600">Game Ready</span></p>
      </div>
      <div className="mt-6">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 transition-colors">
          New Game
        </button>
        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
          Reset
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Chess Game</h1>
          <p className="text-gray-600">Click on pieces to see coordinates (game logic not implemented)</p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
          <div className="flex-shrink-0">
            <ChessBoard />
          </div>
          
          <div className="flex-shrink-0">
            <GameInfo />
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            This is a simple chess board display. Full game implementation would require move validation, 
            game state management, and win conditions.
          </p>
        </div>
      </div>
    </div>
  )
}
