import React from 'react'
import { initialState, Actions } from '../../reducer'

export const StateContext = React.createContext(initialState())
export const DispatchContext = React.createContext({} as React.Dispatch<Actions>)
