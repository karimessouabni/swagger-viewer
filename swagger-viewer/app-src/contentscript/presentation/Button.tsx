import React from "react"

type Props = {
  onClick: () => void
}

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      className="btn"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
