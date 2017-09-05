import React from 'react'
// import Collapse from 'react-collapse'

function Slide({
  metric,
  target,
  actual,
  step,
  index,
  currentSlideIndex,
}) {
  const isCurrentSlide = index === currentSlideIndex
  const getGraphBottomOffset = () => {
    const percentage = (actual / target) * 100
    if (step === 2) {
      return 100 - percentage
    } else if (step > 2) {
      return 0
    } {
      return 100
    }
  }
  return (
    <div
      className={`
        pos-fixed top0 left0 w100 h100
      `}
    >
      <div
        className={`
          pos-fixed top0 left0 w50 h100 bgBlue d-flex items-center transition
          ${step === 0 ? 'transX50' : 'transX0'}
        `}
      >
        <div className='center'>
          {metric}
        </div>
      </div>
      <div
        className={`
          pos-fixed top0 left0 h100 bgRed transition
          ${step === 3 ? 'transX0' : step !== 0 ? 'transX100' : 'transX200'}
          ${step === 3 ? 'w100' : 'w50'}
        `}
      >
        <div
          className={`
            pos-absolute bottom0 left0 w100 h100 bgYellow
            ${step === 3 ? 'transition' : 'transition-graph'}
          `}
          style={{
            transform: `translateY(${getGraphBottomOffset()}%)`
          }}
        >
        </div>
      </div>
    </div>
  )
}

export default {
  view(state, prev, actions) {
    return (
      <div>
        {state.playing === true
          ? (
            <div>
              {state.slides.map((slide, index) => {
                return (
                  <Slide
                    key={index}
                    {...slide}
                    step={state.currentStep}
                    index={index}
                    currentSlideIndex={state.currentSlideIndex}
                  />
                )
              })}
            </div>
          ) : null
        }
        {state.playing === false
          ? (
            <button
              type='button'
              onClick={actions.nextSlide}
            >
              Start
            </button>
          ) : null
        }
        <br />
        <br />
        <br />
        <br />
        <a href='/'>Make</a>
        <p>Slide: {state.currentSlideIndex}</p>
        <p>Step: {state.currentStep}</p>
      </div>
    )
  }
}