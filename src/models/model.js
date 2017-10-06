import * as listForm from './list-form'
import fire from '../components/rockets'

const getRandomVerticalOffset = () => Math.floor(Math.random() * 20) + 10

function resetState() {
  return {
    playing: false,
    currentSlide: {},
    currentSlideIndex: -1,
    currentStep: 'START',
    randomVerticalOffset: getRandomVerticalOffset(),
    roadTo51: 0,
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
          items: persistedState.form.items.map(makeFormItem) || [],
        },
        roadTo51: persistedState.roadTo51 || 0,
      }
    },
    setRoadTo51(state, roadTo51) {
      return { roadTo51 }
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
      // actions.nextSlide()
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
        .then(() => pause(1.5))
        .then(() => actions.setStep('SHOW_TARGET_PERCENTAGE'))
        .then(() => pause(4))
        .then(() => actions.setStep('SHOW_ACTUAL_PERCENTAGE'))
        .then(() => pause(4))
        .then(actions.playNext)
    },
    playNext(state, actions) {
      actions.setStep('RESET')
      pause(1)
        .then(() => {
          if (state.currentSlideIndex === state.form.items.length - 1) {
            actions.playRoadTo51()
          } else {
            actions.nextSlide()
          }
        })
    },
    playRoadTo51(state, actions) {
      actions.setStep('RESET')
      pause(1)
        .then(() => actions.setStep('ROAD_TO_51_START'))
        .then(() => pause(1))
        .then(() => actions.setStep('ROAD_TO_51_SHOW_LABEL'))
        .then(() => pause(1))
        .then(() => actions.setStep('ROAD_TO_51_SHOW_TARGET'))
        .then(() => pause(4))
        .then(() => actions.setStep('ROAD_TO_51_SHOW_ACTUAL'))
        .then(() => pause(9))
        .then(() => {
          if (state.roadTo51 >= 51) {
            fire()
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
          prefix: undefined,
          suffix: undefined,
        }
      },
      defaultForm: () => {
        return {
          metric: '',
          target: 0,
          actual: 0,
          prefix: '',
          suffix: '',
        }
      },
    }),
  }
}

function makeFormItem(item) {
  return {
    metric: item.metric || '',
    target: item.target || 0,
    actual: item.actual || 0,
    prefix: item.prefix || '',
    suffix: item.suffix || '',
  }
}

export function pause(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}
