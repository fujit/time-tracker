import { createContext } from 'react'
import { initialState, Actions } from '../../reducer'

export const StateContext = createContext(initialState())
export const DispatchContext = createContext({} as React.Dispatch<Actions>)
