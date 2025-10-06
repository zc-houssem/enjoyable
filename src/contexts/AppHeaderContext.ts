import React from 'react'

interface AppHeaderContextProps {
  title: string
  description: string
  sideBlock?: React.ReactNode
  setIntro: (title: string, description: string) => void
  setSideBlock: (block: React.ReactNode) => void
  clear: () => void
}

export const AppHeaderContext = React.createContext<Partial<AppHeaderContextProps>>({})

export const useAppHeader = () => React.useContext(AppHeaderContext)
