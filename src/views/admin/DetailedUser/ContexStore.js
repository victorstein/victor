import React from 'react'

const contextStore = React.createContext(null)

export default {
  contextStore: contextStore,
  Provider: contextStore.Provider,
  Consumer: contextStore.Consumer
}
