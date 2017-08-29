import React from 'react'
import Player from 'react-player'

function Slide({
  metric,
  video,
  target,
  actual,
  step,
  onVideoFinished,
  shouldPlayVideo
}) {
  return (
    <div>
      <p>Metric: {metric}</p>
      <p>Target: {target}</p>
      <p>Actual: {actual}</p>
      {step === 'video' && shouldPlayVideo
        ? (
          <div>
            <Player
              onEnded={onVideoFinished}
              url={video}
              playing={true}
            />
          </div>
        ) : null
      }
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
              <p>Slide: {state.currentSlideIndex}</p>
              <p>Step: {state.currentStep}</p>
              <div className='slides-wrapper'>
                <div
                  className='slide-scroller'
                  style={{
                    transform: `translateX(-${state.currentSlideIndex * 100}%)`
                  }}
                >
                  {state.slides.map((slide, index) => {
                    return (
                      <div className='slide'>
                        <Slide
                          key={index}
                          {...slide}
                          step={state.currentStep}
                          shouldPlayVideo={index === state.currentSlideIndex}
                          onVideoFinished={actions.onVideoFinished}
                        />
                      </div>
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
        <a href='/'>Make slides</a>
      </div>
    )
  }
}