import './index.css';
import helix from 'helix-react';
import log from 'helix-react/lib/log';
import make from './pages/make'
import play from './pages/play'
import model from './models/model'

const state = JSON.parse(window.localStorage.getItem('state'))

const persist = {
  onReducerCalled(state) {
    window.localStorage.setItem('state', JSON.stringify(state))
  }
}

const mount = document.getElementById('root')
const actions = helix({
  routes: {
    '': make,
    '/play': play,
  },
  model,
  mount,
  plugins: [log, persist],
})

if (state) {
  actions.bootstrap(state)
}