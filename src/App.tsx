import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import logo from './logo.svg';
import './App.css';

function App() {
  const logoRef = useRef<HTMLImageElement | null>(null);
  const cacheTweenEndValuesRef = useRef<any | null>(null);
  useEffect(() => {
    console.log('calling effect on mount')
    if (cacheTweenEndValuesRef.current) {
      console.log('using cached end values for .fromTo()')
      gsap.fromTo(logoRef.current, {
        scale: 0.5,
      }, cacheTweenEndValuesRef.current)
    } else {
      const tween = gsap.from(logoRef.current, {
        scale: 0.5,
      })
      tween.progress(1)
      const endValues: any = {}
      console.log({endValuesPre: endValues})
      Object.keys({scale: 0.5}).forEach(propertyName => {
        console.log({propertyName})
        endValues[propertyName] = gsap.getProperty(logoRef.current, propertyName)
        console.log({endValuesDuring: endValues})
      })
      console.log({endValues})
      cacheTweenEndValuesRef.current = endValues
      tween.progress(0)
    }
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
