import React from 'react'
import Collapse from 'react-collapse'
import Typist from 'react-typist'
import Count from 'react-animated-number'
import Button from '../components/button'

function formatNumber(n) {
  return parseFloat(n).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').slice(0, -2)
}

function RoadTo51({
  step,
  percentage,
}) {
  return (
    <div
      className={`
        pos-fixed top0 left0 w100 h100 bgDark
        ${step.includes('ROAD_TO_51') ? 'o100' : 'o0'}
      `}
      style={{
        zIndex: 99999,
      }}
    >
      <div className='pos-fixed top50 left0 w100 tc z3'>
        <Collapse
          isOpened={step === 'ROAD_TO_51_SHOW_LABEL' || step === 'ROAD_TO_51_SHOW_TARGET'}
          className='transY-50 bgDark d-ib'
        >
          <div className='center ph3 fsMassive'>The Road to 51%</div>
        </Collapse>
      </div>
      <div
        className={`
          were-at transition-bezier
          ${step === 'ROAD_TO_51_SHOW_TARGET' || step === 'ROAD_TO_51_SHOW_ACTUAL' ? 'o100' : 'o0'}
        `}
      >
        <Bar
          step=''
          percentage={percentage}
          showing={step === 'ROAD_TO_51_SHOW_ACTUAL'}
          randomVerticalOffset={0}
          value={percentage}
          color='bgOne'
          label={`We're at`}
          showPercentageInLabel={true}
          duration='slow'
          round={false}
        />
      </div>
    </div>
  )
}

function ShowMetric({
  label,
  showing,
  value,
  className,
  showPercentageInLabel = false,
  duration = 'normal',
  round = true,
}) {
  const timing = duration === 'slow' ? 6000 : 3000
  return (
    <div className={`d-ib ${className}`}>
      <p className='tc fsHuge'>
        {label}
      </p>
      <Collapse isOpened={!!value && showing && value > 0}>
        <Count
          className='fsHuge pt3 d-ib'
          value={showing && value ? parseFloat(value) : 0}
          duration={timing}
          stepPrecision={round ? 0 : 2}
          formatValue={n => n ? `${round ? formatNumber(n) : n.toFixed(2)}${showPercentageInLabel ? '%' : ''}` : ''}
        />
      </Collapse>
    </div>
  )
}

function Bar({
  step,
  percentage,
  value,
  color,
  className,
  showing,
  label,
  randomVerticalOffset,
  showPercentageInLabel = false,
  duration = 'normal',
  round = true,
}) {
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
        pos-absolute bottom0 left0 w100 d-flex items-center bgDark
        ${className}
      `}
      style={{
        height: `${100 - randomVerticalOffset}%`,
      }}
    >
      <div
        className={`
          pos-absolute bottom0 left0 w100 h100
          ${step === 'RESET' ? 'transition-bezier' : duration === 'slow' ? 'transition-graph-slow' : 'transition-graph'}
          ${color}
        `}
        style={{
          transform: `translateY(${getGraphBottomOffset()}%)`,
        }}
      />
      <div className='pos-absolute top0 left0 w100 h100'>
        <div className='pos-absolute top50 left0 w100 z1 tc transY-50'>
          <ShowMetric
            label={label}
            showing={showing}
            value={value}
            showPercentageInLabel={showPercentageInLabel}
            duration={duration}
            round={round}
          />
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
  randomVerticalOffset,
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
            <Typist cursor={{ show: false }} className='fsMassive tc'>
              {metric}
            </Typist>
          ) : null
        }
      </div>
      <div
        className={`
          pos-absolute top0 left0 h100 w50 transition-bezier
          ${step !== 'START' && step !== 'RESET' ? 'transX0' : 'transX-100'}
        `}
      >
        <Bar
          step={step}
          percentage={(target / actual) * 100}
          showing={step === 'SHOW_TARGET_PERCENTAGE' || step === 'SHOW_ACTUAL_PERCENTAGE' || step === 'RESET'}
          randomVerticalOffset={randomVerticalOffset}
          value={target}
          color='bgTwo'
          label='Target'
        />
      </div>
      <div
        className={`
          pos-absolute top0 left0 h100 w50 bgDark transition-bezier
          ${step !== 'START' && step !== 'RESET' ? 'transX100' : 'transX200'}
        `}
      >
        <Bar
          step={step}
          percentage={(actual / target) * 100}
          showing={step === 'SHOW_ACTUAL_PERCENTAGE' || step === 'RESET'}
          randomVerticalOffset={randomVerticalOffset}
          value={actual}
          color='bgOne'
          label='Actual'
        />
      </div>
    </div>
  )
}

export default {
  view(state, prev, actions) {
    const slides = state.form.items
    return (
      <div className='fLight bgDark pos-fixed top0 left0 w100 h100 cursive'>
        {state.playing === true
          ? (
            <div>
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
                        zIndex: index === state.currentSlideIndex ? '9999' : slides.length - index,
                      }}
                      onPlayNextSlideClick={actions.playNext}
                      randomVerticalOffset={state.randomVerticalOffset}
                    />
                  )
                })}
              </div>
              <RoadTo51
                step={state.currentStep}
                percentage={state.roadTo51}
              />
            </div>
          ) : null
        }
        {state.playing === false
          ? (
            <div className='pos-fixed top0 left0 h100 w100 d-flex items-center'>
              <div className='tc w100'>
                <Button onClick={actions.nextSlide}>
                  Start
                </Button>
              </div>
            </div>
          ) : null
        }
      </div>
    )
  }
}
