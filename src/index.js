import './index.css';
import helix from 'helix-react';
import log from 'helix-react/lib/log';
import make from './make'
import play from './play'
import model from './model'

const mount = document.getElementById('root')
helix({
  routes: {
    '': make,
    '/play': play,
  },
  model,
  mount,
  plugins: [log],
})
