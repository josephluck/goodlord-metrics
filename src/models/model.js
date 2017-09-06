import * as listForm from './list-form'

const slides = [
  {
    metric: 'Number of tenancies created',
    target: 3,
    actual: 2
  },
  {
    metric: 'Number of tenants processed',
    target: 2,
    actual: 1,
  },
  {
    metric: 'Number of agencies onboarded',
    target: 6,
    actual: 5,
  },
  {
    metric: 'Number of sales',
    target: 100,
    actual: 90,
  }
]

function resetState() {
  return {
    playing: false,
    currentSlide: {},
    currentSlideIndex: -1,
    currentStep: 'START',
    slides,
  }
}

export default {
  state: resetState(),
  reducers: {
    resetState,
    setPlaying(state, playing) {
      return { playing }
    },
    setSlide(state, newSlideIndex) {
      const currentSlide = slides[newSlideIndex]
      return { currentSlideIndex: newSlideIndex, currentSlide }
    },
    setStep(state, newStep) {
      return { currentStep: newStep }
    }
  },
  effects: {
    nextSlide(state, actions) {
      if (state.playing === false) {
        actions.setPlaying(true)
      }
      actions.setStep('START')
      actions.setSlide(state.currentSlideIndex + 1)
      pause(3)
        .then(() => actions.setStep('SHOW_TARGET_ACTUAL_TEXT'))
        .then(() => pause(3))
        .then(() => actions.setStep('SHOW_TARGET_PERCENTAGE'))
        .then(() => pause(3))
        .then(() => actions.setStep('SHOW_ACTUAL_PERCENTAGE'))
    },
    playNext(state, actions) {
      actions.setStep('RESET')
      pause(0.3)
        .then(() => {
          if (state.currentSlideIndex === state.slides.length) {
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
