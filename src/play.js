import React from 'react'
import Player from 'react-player'
import Collapse from 'react-collapse'

function Slide({
  metric,
  video,
  target,
  actual,
  step,
  onVideoFinished,
  isCurrentSlide
}) {
  const targetText = `Target... ${target}...`
  return (
    <div
      className={`slide animate-opacity ${isCurrentSlide ? 'in' : ''}`}
    >
      <div className='slide-inner'>
        <div>
          <Collapse isOpened={step === 'init'}>
            <div>Drum roll please...</div>
          </Collapse>
          <Collapse isOpened={step !== 'init'}>
            <div>{metric}</div>
          </Collapse>
          <Collapse
            isOpened={step === 'video'}
          >
            <div className='d-flex items-center pt3'>
              <Player
                onEnded={onVideoFinished}
                url={video}
                playing={isCurrentSlide && step === 'video'}
                width='711'
                height='400'
                className={`center animate-opacity ${isCurrentSlide && step === 'video' ? 'in' : ''}`}
              />
            </div>
          </Collapse>
          <Collapse isOpened={step === 'video' || step === 'target'}>
            <div className='pt3'>{targetText}</div>
          </Collapse>
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
              <div className='slides-wrapper'>
                <div
                  className='slide-scroller'
                  style={{
                    transform: `translateX(-${state.currentSlideIndex * 100}%)`
                  }}
                >
                  {state.slides.map((slide, index) => {
                    return (
                      <Slide
                        key={index}
                        {...slide}
                        step={state.currentStep}
                        isCurrentSlide={index === state.currentSlideIndex}
                        onVideoFinished={actions.onVideoFinished}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          ) : null
        }
        {state.playing === false
          ? (
            <button
              type='button'
              onClick={actions.nextSlide}
            >
              Start Show!
            </button>
          ) : null
        }
        <br />
        <br />
        <br />
        <br />
        <a href='/'>Make slides</a>
        <p>Slide: {state.currentSlideIndex}</p>
        <p>Step: {state.currentStep}</p>
      </div>
    )
  }
}