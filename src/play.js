import React from 'react'
// import Collapse from 'react-collapse'
import Typist from 'react-typist'
import Count from 'react-animated-number'

function Slide({
  metric,
  target,
  actual,
  step,
  index,
  currentSlideIndex,
  style = {},
  onPlayNextSlideClick,
}) {
  const getGraphBottomOffset = () => {
    const percentage = (actual / target) * 100
    if (step === 'BAR_TO_PERCENTAGE') {
      return 100 - percentage // Animate to actual
    } else if (step === 'BAR_FULL_SCREEN') {
      return 0 // Animate to top
    } else {
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
          ${step === 'SHOW_METRIC' ? 'transX50' : 'transition-bezier transX0'}
          ${currentSlideIndex % 2 === 0 ? 'bgOne' : 'bgTwo'}
        `}
      >
        <div className='center'>
          {currentSlideIndex === index
            ? (
              <Typist cursor={{ show: false }}>
                {metric}
              </Typist>
            ) : null
          }
          Target:
          <Count
            value={currentSlideIndex === index ? target : 0}
            duration={1000}
            cursor={{ show: false }}
            stepPrecision={0}
          />
        </div>
      </div>
      <div
        className={`
          pos-fixed top0 left0 h100 bgLight d-flex items-center
          ${step === 'BAR_FULL_SCREEN' ? 'transX0 transition' : step !== 'SHOW_METRIC' ? 'transX100 transition-bezier' : 'transX200'}
          ${step === 'BAR_FULL_SCREEN' ? 'w100' : 'w50'}
        `}
      >
        <div
          className={`
            pos-absolute bottom0 left0 w100 h100
            ${step === 'BAR_FULL_SCREEN' ? 'transition-bezier' : 'transition-graph'}
            ${index % 2 === 0 ? 'bgTwo' : 'bgOne'}
          `}
          style={{
            transform: `translateY(${getGraphBottomOffset()}%)`
          }}
        />
        <div className='center pos-relative fDark z1'>
          Actual:
          <Count
            value={currentSlideIndex === index && step === 'BAR_TO_PERCENTAGE' ? actual : 0}
            duration={3000}
            stepPrecision={0}
          />
        </div>
      </div>
      {step === 'BAR_TO_PERCENTAGE'
        ? (
          <button
            onClick={onPlayNextSlideClick}
            className='pos-fixed bottom0 right0'
          >
            Next
          </button>
        )
        : null
      }
    </div>
  )
}

export default {
  view(state, prev, actions) {
    return (
      <div
        className={`
          w100 h100 fLight
          ${state.currentSlideIndex === -1 ? '' : state.currentSlideIndex % 2 === 0 ? 'bgOne' : 'bgTwo'}`
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
                    onPlayNextSlideClick={actions.playNext}
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
