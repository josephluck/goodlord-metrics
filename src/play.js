import React from 'react'
import Player from 'react-player'

export default {
  view(state, prev, actions) {
    return (
      <div>
        {state.playing === true
          ? (
            <div>
              <p>Slide: {state.currentSlideIndex}</p>
              <p>Step: {state.currentStep}</p>
              <p>Metric: {state.currentSlide.metric}</p>
              <p>Target: {state.currentSlide.target}</p>
              <p>Actual: {state.currentSlide.actual}</p>
              {state.currentStep === 'video'
                ? (
                  <div>
                    <Player
                      onEnded={actions.onVideoFinished}
                      url={state.currentSlide.video}
                      playing={true}
                    />
                  </div>
                ) : null
              }
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