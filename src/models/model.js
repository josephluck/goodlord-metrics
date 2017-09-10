import * as listForm from './list-form'

const getRandomVerticalOffset = () => Math.floor(Math.random() * 20) + 10

function resetState() {
  return {
    playing: false,
    currentSlide: {},
    currentSlideIndex: -1,
    currentStep: 'START',
    randomVerticalOffset: getRandomVerticalOffset(),
  }
}

export default {
  state: resetState(),
  reducers: {
    resetState,
    bootstrap(state, persistedState) {
      return {
        form: {
          ...state.form,
          items: persistedState.form.items,
        }
      }
    },
    setPlaying(state, playing) {
      return { playing }
    },
    setSlide(state, newSlideIndex) {
      const currentSlide = state.form.items[newSlideIndex]
      return { currentSlideIndex: newSlideIndex, currentSlide }
    },
    setStep(state, newStep) {
      return { currentStep: newStep }
    },
    setRandomVerticalOffset() {
      return { randomVerticalOffset: getRandomVerticalOffset() }
    }
  },
  effects: {
    startShow(state, actions) {
      actions.location.set('/play')
      actions.nextSlide()
    },
    nextSlide(state, actions) {
      actions.setRandomVerticalOffset()
      if (state.playing === false) {
        actions.setPlaying(true)
      }
      actions.setStep('START')
      actions.setSlide(state.currentSlideIndex + 1)
      pause(3)
        .then(() => actions.setStep('SHOW_TARGET_ACTUAL_TEXT'))
        .then(() => pause(0.5))
        .then(() => actions.setStep('SHOW_TARGET_PERCENTAGE'))
        .then(() => pause(4))
        .then(() => actions.setStep('SHOW_ACTUAL_PERCENTAGE'))
    },
    playNext(state, actions) {
      actions.setStep('RESET')
      pause(0.3)
        .then(() => {
          if (state.currentSlideIndex === state.form.items.length) {
            actions.resetState()
          } else {
            actions.nextSlide()
          }
        })
    }
  },
  models: {
    form: listForm.model({
      constraints: () => {
        return {
          metric: { presence: true },
          target: { presence: true },
          actual: { presence: true },
        }
      },
      defaultForm: () => {
        return {
          metric: '',
          target: 0,
          actual: 0,
        }
      },
    }),
  }
}

export function pause(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}
