import './index.css';
import helix from 'helix-react';
import log from 'helix-react/lib/log';
import make from './pages/make'
import play from './pages/play'
import model from './models/model'

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
