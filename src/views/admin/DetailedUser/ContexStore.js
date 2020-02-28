import React from 'react'

const contextStore = React.createContext({ idUser: null })

export default {
  contextStore: contextStore,
  Provider: contextStore.Provider,
  Consumer: contextStore.Consumer
}
