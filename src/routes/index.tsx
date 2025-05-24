import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: ChessGame,
})

type ChessPiece = {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn'
  color: 'white' | 'black'
}

const initialBoard: (ChessPiece | null)[][] = [
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

const pieceSymbols: Record<ChessPiece['type'], Record<ChessPiece['color'], string>> = {
  king: { white: '♔', black: '♚' },
  queen: { white: '♕', black: '♛' },
  rook: { white: '♖', black: '♜' },
  bishop: { white: '♗', black: '♝' },
  knight: { white: '♘', black: '♞' },
  pawn: { white: '♙', black: '♟' },
}

function ChessSquare({ piece, isLight, row, col }: {
  piece: ChessPiece | null
  isLight: boolean
  row: number
  col: number
}) {
  const squareColor = isLight ? 'bg-amber-100' : 'bg-amber-800'
  
  return (
    <div
      className={`
        ${squareColor}
        w-16 h-16 flex items-center justify-center
        text-4xl cursor-pointer hover:bg-opacity-80
        transition-colors duration-200
      `}
    >
      {piece && (
        <span className="select-none">
          {pieceSymbols[piece.type][piece.color]}
        </span>
      )}
    </div>
  )
}

function ChessBoard() {
  return (
    <div className="inline-block border-4 border-amber-900 shadow-2xl">
      {initialBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0
            return (
              <ChessSquare
                key={`${rowIndex}-${colIndex}`}
                piece={piece}
                isLight={isLight}
                row={rowIndex}
                col={colIndex}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

function ChessGame() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-200 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-amber-900 mb-8 text-center">
        Simple Chess Game
      </h1>
      <ChessBoard />
      <p className="mt-6 text-amber-800 text-center max-w-md">
        A simple chess board layout with pieces in their starting positions.
        Click and drag functionality coming soon!
      </p>
    </div>
  )
}
