import React from 'react'
// import Collapse from 'react-collapse'

function Slide({
  metric,
  target,
  actual,
  step,
  index,
  currentSlideIndex,
  style = {},
}) {
  const isCurrentSlide = index === currentSlideIndex
  const getGraphBottomOffset = () => {
    const percentage = (actual / target) * 100
    if (step === 2) {
      return 100 - percentage // Animate to actual
    } else if (step > 2) {
      return 0 // Animate to top
    } {
      return 100 // Initially off screen
    }
  }
  return (
    <div
      className={`
        pos-fixed top0 left0 w100 h100
      `}
      style={style}
    >
      <div
        className={`
          pos-fixed top0 left0 w50 h100 d-flex items-center
          ${step === 0 ? 'transX50' : 'transition transX0'}
          ${currentSlideIndex % 2 === 0 ? 'bgRed' : 'bgYellow'}
        `}
      >
        <div className='center'>
          {metric}
        </div>
      </div>
      <div
        className={`
          pos-fixed top0 left0 h100 bgWhite
          ${step === 3 ? 'transX0 transition' : step !== 0 ? 'transX100 transition' : 'transX200'}
          ${step === 3 ? 'w100' : 'w50'}
        `}
      >
        <div
          className={`
            pos-absolute bottom0 left0 w100 h100
            ${step === 3 ? 'transition' : 'transition-graph'}
            ${index % 2 === 0 ? 'bgYellow' : 'bgRed'}
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
      <div
        className={`
          w100 h100
          ${state.currentSlideIndex === -1 ? '' : state.currentSlideIndex % 2 === 0 ? 'bgRed' : 'bgYellow'}`
        }
      >
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
                    style={{
                      zIndex: index === state.currentSlideIndex ? '100' : state.slides.length - index,
                    }}
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
      </div>
    )
  }
}