import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from './logo.svg';
import './App.css';

const useDoubleCallableGsapFrom = (): /*typeof gsap.from*/ ((targets: gsap.TweenTarget, vars: gsap.TweenVars) => gsap.core.Tween) => {
  const endValuesRef = useRef<gsap.TweenVars | null>(null);
  return (targets, fromValues) => {
    const cachedEndValues = endValuesRef.current
    if (cachedEndValues) {
      return gsap.fromTo(targets, fromValues, cachedEndValues)
    } else {
      const tween = gsap.from(targets, fromValues)
      tween.progress(1)
      const firstTargetElement = tween.targets()[0]
      const endValues = {}
      Object.keys(fromValues).forEach(propertyName => {
        (endValues as any)[propertyName] = gsap.getProperty(firstTargetElement as any, propertyName)
      })
      endValuesRef.current = endValues
      tween.progress(0)
      return tween
    }
  }
}

function App() {
  const logoRef = useRef<HTMLImageElement | null>(null);
  const gsapFrom = useDoubleCallableGsapFrom()
  useEffect(() => {
    console.log('calling effect on mount')
    gsapFrom(logoRef.current, {
      scale: 0.5,
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img ref={logoRef} src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
