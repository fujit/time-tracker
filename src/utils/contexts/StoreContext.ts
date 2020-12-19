import { createContext, Dispatch } from 'react'
import { initialState, Actions } from '../../reducer'

export const StateContext = createContext(initialState())
export const DispatchContext = createContext({} as Dispatch<Actions>)
