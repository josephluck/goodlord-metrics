const slides = [
  {
    metric: 'Number of tenancies created',
    video: 'https://www.youtube.com/watch?v=hP9pEpCwggE',
    target: 30000,
    actual: 32547
  },
  {
    metric: 'Number of tenants processed',
    video: 'https://www.youtube.com/watch?v=S31284EkxOc',
    target: 140000,
    actual: 124397,
  },
  {
    metric: 'Number of agencies onboarded',
    video: 'https://www.youtube.com/watch?v=B2F5IYIjrD8',
    target: 10,
    actual: 14,
  },
  {
    metric: 'Number of sales',
    video: 'https://www.youtube.com/watch?v=hP9pEpCwggE',
    target: 16,
    actual: 19,
  }
]

export const steps = {
  init: 'init',
  metric: 'metric',
  target: 'target',
  video: 'video'
}

export function pause(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000)
  })
}

function resetState() {
  return {
    playing: false,
    currentSlide: {},
    currentSlideIndex: 0,
    currentStep: steps.init,
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
      console.log(newStep)
      return { currentStep: newStep }
    }
  },
  effects: {
    nextSlide(state, actions) {
      if (state.currentSlideIndex === 0) {
        actions.setPlaying(true)
      }
      actions.setStep('init')
      actions.setSlide(state.currentSlideIndex + 1)
      pause(3)
        .then(() => actions.setStep('metric'))
        .then(() => pause(3))
        .then(() => actions.setStep('target'))
        .then(() => pause(3))
        .then(() => actions.setStep('video'))
    },
    onVideoFinished(state, actions) {
      if (state.currentSlideIndex + 1 === state.slides.length) {
        actions.resetState()
      } else {
        actions.nextSlide()
      }
    }
  }
}
