import React, { useState } from 'react';
import { debounce } from 'lodash';
import { useRef } from 'react';
import filterCalc from '@/lib/filterCalc';
import validateInput from '@/lib/validate';
import { factoriesType } from '../../types/types';

export default function FactoryDetail() {
  const inputVal = useRef<HTMLInputElement>(null);
  const [isError, setIsError] = useState<boolean>()
  const [results, setResults] = useState<factoriesType[]>()
  const debouncedHandleInput = debounce(() => {

    const isInputValid = validateInput(inputVal.current?.value!);
    const array = inputVal.current?.value.split(',')
    const numberArray = array!.map((element) => parseInt(element));
    isInputValid ? (setResults(filterCalc(numberArray)), setIsError(false)) : (setIsError(true), setResults([]))


  }, 1000, { leading: false, trailing: true });


  return (
    <>
      <div className='flext flex-col items-center justify-center text-center'>
        <div className='flex flex-col'>
          <label htmlFor="main-input">Please enter multiple natural numebrs separated by commas</label>
          <input id='main-input' className='text-black' type="text" ref={inputVal} onInput={debouncedHandleInput} />
          {isError ? <small className='text-red-500'>Please make sure that you only enter natural numbers separated by comma </small> : <small className='text-red-500 hidden'>Please make sure that you only enter natural numbers separated by comma </small>}
        </div>
        {results && <div className='text-left ' >
          <h1>total number of facotries:{results && results.length}</h1>
          <h1>initial total pollution:{results && results.reduce((acc, curr) => acc + curr.initPollution, 0)}</h1>
          <h1>final reduced pollution:{results && results.reduce((acc, curr) => acc + curr.pollution, 0)}</h1>
          <h1>total number of air filters utilized:{results && results.reduce((acc, curr) => acc + curr.airFilters, 0)}</h1>
          <ul>
            {results && results.map((factory, index) => <div key={factory.initPollution + index}>


              <li>{`-for the factory with initial pollution of ${factory.initPollution}, ${factory.airFilters} filter(s) were used resulting in ${factory.pollution} amount of pollution`}</li>
            </div>)}
          </ul>
        </div>}
      </div>
    </>
  );
}

