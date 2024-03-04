import React from 'react'


function StepProgressBar(props) {
  const {
    steps,
    currentStep,
    completedStep,
    disableNavigation,
    handleStepClicked
  } = props

  const isStepCurrent = (index) => index + 1 === currentStep
  const isStepCompleted = (index) => index + 1 !== currentStep && completedStep >= index + 1
  const isStepNavigable = (index) => completedStep >= index

  const getStepClassNames = (index) => {
    let result = 'stepProgressBar__step'
    if (isStepCurrent(index)) {
      result = `${result} stepProgressBar__step--current`
    }
    if (isStepCompleted(index)) {
      result = `${result} stepProgressBar__step--completed`
    }
    if (isStepNavigable(index)) {
      result = `${result} stepProgressBar__step--navigable`
    }
    return result
  }

  return (
    <div>
        <style>
            {
                `
                .stepProgressBar {
                    --stepProgressBar-space-unit: 4px;
                    --stepProgressBar-indicator-size: 16px;
                    --stepProgressBar-font-size: 14px;
                    --stepProgressBar-step-size: 80px;
                    --stepProgressBar-step-line-size: 2px;
                    --stepProgressBar-color-primary: #FF26B2;
                    --stepProgressBar-color-secondary: #d1d5db;
                    --stepProgressBar-color-neutral: #fff;
                    --stepProgressBar-color-neutral-400: #a3a3a3;
                    --stepProgressBar-color-neutral-800: #262626;
                    display: flex;
                    width: 100%;
                  }
                  
                  .stepProgressBar__step {
                    display: flex;
                  }
                  
                  .stepProgressBar__step:not(:first-child) {
                    width: 100%;
                  }
                  
                  /* --- button ---- */
                  .stepProgressBar__step__button {
                    align-items: center;
                    color: var(--stepProgressBar-color-neutral-400);
                    display: flex;
                    font-size: var(--stepProgressBar-font-size);
                    flex-direction: column;
                    flex-shrink: 0;
                    position: relative;
                    transition: color 0.2s ease-in;
                    width: var(--stepProgressBar-step-size);
                  }
                  
                  .stepProgressBar__step--current .stepProgressBar__step__button {
                    color: var(--stepProgressBar-color-neutral-800);
                  }
                  
                  .stepProgressBar__step__button__indicator {
                    align-items: center;
                    background-color: var(--stepProgressBar-color-secondary);
                    border: calc(var(--stepProgressBar-indicator-size) / 3.5) solid var(--stepProgressBar-color-neutral);
                    border-radius: 100%;
                    display: flex;
                    justify-content: center;
                    height: var(--stepProgressBar-indicator-size);
                    transition: background-color 0.3s ease-in;
                    width: var(--stepProgressBar-indicator-size);
                  }
                  
                  .stepProgressBar__step--current .stepProgressBar__step__button__indicator {
                    background-color: var(--stepProgressBar-color-neutral);
                    border: calc(var(--stepProgressBar-indicator-size) / 4) solid var(--stepProgressBar-color-primary);
                    transition: all 0.3s ease-in;
                  }
                  
                  .stepProgressBar__step--completed .stepProgressBar__step__button__indicator {
                    border: 0;
                    transition: all 0.3s ease-in;
                  }
                  
                  .stepProgressBar__step:not(.stepProgressBar__step--current).stepProgressBar__step--navigable .stepProgressBar__step__button__indicator {
                    background-color: var(--stepProgressBar-color-primary);
                    transition: all 0.3s ease-in;
                  }
                  
                  .stepProgressBar__step__button__indicator__icon-completed {
                    fill: transparent; 
                  }
                  
                  .stepProgressBar__step--completed .stepProgressBar__step__button__indicator__icon-completed {
                    animation: fillColorChange 0.2s ease-in 0.3s forwards;
                  }
                  
                  .stepProgressBar__step__button__label {
                    margin-top: var(--stepProgressBar-space-unit);
                  }
                  
                  /* --- button states ---- */
                  
                  @supports  selector(:hover) {
                    .stepProgressBar__step__button:hover {
                      color: var(--stepProgressBar-color-primary);
                    }
                    .stepProgressBar__step:not(.stepProgressBar__step--current) .stepProgressBar__step__button:hover .stepProgressBar__step__button__indicator {
                      background-color: var(--stepProgressBar-color-primary);
                    }
                  }
                  
                  .stepProgressBar__step__button:focus-visible {
                    border-radius: 4px;
                    outline: var(--stepProgressBar-color-primary) solid 2px;
                  }
                  
                  @supports not selector(:focus-visible) { /* fallback for browsers without focus-visible support */
                    .stepProgressBar__step__button:focus {
                      border-radius: 4px;
                      outline: var(--stepProgressBar-color-primary) solid 2px;
                    }
                  }
                  
                  /* --- line ---- */
                  .stepProgressBar__step__line {
                    background-color: var(--stepProgressBar-color-secondary);
                    height: var(--stepProgressBar-step-line-size);
                    margin-top: calc(var(--stepProgressBar-indicator-size) / 2 - var(--stepProgressBar-step-line-size) / 2);
                    margin-left: calc(var(--stepProgressBar-step-size) / 2 * -1);
                    margin-right: calc(var(--stepProgressBar-step-size) /2 * -1);
                    transition: background-color 0.3s ease-in;
                    width: 100%;
                  }
                  
                  .stepProgressBar__step--navigable .stepProgressBar__step__line {
                    background-color: var(--stepProgressBar-color-primary);
                    transition: background-color 0.2s ease-in;
                  }
                  
                  /* --- other ---- */
                  
                  @keyframes fillColorChange {
                    0% {
                      fill: var(--stepProgressBar-color-primary);
                    }
                    100% {
                      fill: var(--stepProgressBar-color-neutral)
                    }
                  }
                  
                   /* This media query is based on step-size * 5,
                      if you change the value of it update it here too
                   */
                  @media (max-width: 400px) {
                    .stepProgressBar__step__button {
                      width: auto;
                    }
                  
                    .stepProgressBar__step__line {
                      margin-left: 0;
                      margin-right: 0;
                    }
                  
                    .stepProgressBar__step__button__label {
                      display: flex;
                    }
                  }
                  
                  /*
                    Pen styles (ignore these styles)
                  */
                  .container {
                    margin: 0 auto;
                    max-width: 1000px;
                    min-width: 320px;
                    padding: 100px 24px;
                    width: 100%;
                  }
                                    

                `
            }
        </style>
    <ol className='stepProgressBar'>
        
      {steps.map((step, index) => (
        <li key={step.id} className={getStepClassNames(index)}>
          {index > 0 && <div className="stepProgressBar__step__line"></div>}
          <button
            className="stepProgressBar__step__button btn"
            style={{marginTop:"-10px"}}
            type="button"
            disabled={disableNavigation && !isStepNavigable(index)}
            onClick={() => handleStepClicked}
          >
            <span className="stepProgressBar__step__button__indicator">
              {isStepCompleted(index) && (
                <svg
                  className="stepProgressBar__step__button__indicator__icon-completed"
                  width="10"
                  height="7"
                  viewBox="0 0 12 9"
                  fill="currentColor"
                >
                  {/* SVG Path Data */}
                </svg>
              )}
            </span>
            <span className="stepProgressBar__step__button__label">
              {step.label}
            </span>
          </button>
        </li>
      ))}
    </ol>
    </div>
  )
}

export default StepProgressBar