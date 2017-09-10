import React from 'react'
import Collapse from 'react-collapse'
import Typist from 'react-typist'
import Count from 'react-animated-number'

function Bar({
  step,
  percentage,
  value,
  color,
  className,
  showing,
  label,
}) {
  // const Label = () => {
  //   return (
  //     <div className='d-ib'>
  //       <p className='tc fwBold fsHuge'>
  //         {label}
  //       </p>
  //       <Collapse isOpened={showing && value > 0}>
  //         <Count
  //           className='fwBold fsHuge pt4'
  //           value={showing ? value : 0}
  //           duration={3000}
  //           stepPrecision={0}
  //         />
  //       </Collapse>
  //     </div>
  //   )
  // }
  let clampedPercentage = percentage > 100 ? 100 : percentage
  const getGraphBottomOffset = () => {
    if (showing) {
      return 100 - clampedPercentage
    } else {
      return 100 // Initially off screen
    }
  }
  return (
    <div
      className={`
        pos-absolute top0 left0 h100 w100 d-flex items-center
        ${className}
      `}
    >
      <div
        className={`
          pos-absolute bottom0 left0 w100 h100
          ${step === 'RESET' ? 'transition-bezier' : 'transition-graph'}
          ${color}
        `}
        style={{
          transform: `translateY(${getGraphBottomOffset()}%)`
        }}
      />
      <div className='center pos-relative fDark z1 tc'>
        <div className='d-ib'>
          <p className='tc fwBold fsHuge'>
            {label}
          </p>
          <Collapse isOpened={showing && value > 0}>
            <Count
              className='fwBold fsHuge pt4'
              value={showing ? value : 0}
              duration={3000}
              stepPrecision={0}
            />
          </Collapse>
        </div>
      </div>
    </div>
  )
}

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
  return (
    <div
      className={`
        pos-fixed top0 left0 w100 h100
      `}
      style={style}
    >
      <div
        className={`
          pos-fixed top0 h100 w100 transition-bezier z2
          ${step === 'RESET' ? 'o0' : 'o100'}
          ${step === 'START' ? 'transY50' : 'transY25'}
        `}
      >
        {currentSlideIndex === index
          ? (
            <Typist cursor={{ show: false }} className='fsHuge fwBold tc'>
              {metric}
            </Typist>
          ) : null
        }
      </div>
      <div
        className={`
          pos-absolute top0 left0 h100 w50 bgLight transition-bezier
          ${step !== 'START' && step !== 'RESET' ? 'transX0' : 'transX-100'}
        `}
      >
        <Bar
          step={step}
          percentage={(target / actual) * 100}
          showing={step === 'SHOW_TARGET_PERCENTAGE' || step === 'SHOW_ACTUAL_PERCENTAGE' || step === 'RESET'}
          value={target}
          color='bgTwo'
          label='Target'
        />
      </div>
      <div
        className={`
          pos-absolute top0 left0 h100 w50 bgLight transition-bezier
          ${step !== 'START' && step !== 'RESET' ? 'transX100' : 'transX200'}
        `}
      >
        <Bar
          step={step}
          percentage={(actual / target) * 100}
          showing={step === 'SHOW_ACTUAL_PERCENTAGE' || step === 'RESET'}
          value={actual}
          color='bgOne'
          label='Actual'
        />
      </div>
      {step === 'SHOW_ACTUAL_PERCENTAGE'
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
    const slides = state.form.items
    return (
      <div>
        {state.playing === true
          ? (
            <div>
              {slides.map((slide, index) => {
                return (
                  <Slide
                    key={index}
                    {...slide}
                    step={state.currentStep}
                    index={index}
                    currentSlideIndex={state.currentSlideIndex}
                    style={{
                      zIndex: index === state.currentSlideIndex ? '100' : slides.length - index,
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
