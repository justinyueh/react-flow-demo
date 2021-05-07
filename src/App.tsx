import React, { useEffect, useRef, useState } from 'react';
import { useStoreState } from 'react-flow-renderer';
import CustomNodeFlow from './CustomNodeFlow';
import { FbpNormal, FbpMultiInPorts, FbpCycle } from './fbp';
import { IFbp } from './constants';
import { parseNodes } from './utils';
import './App.css';

export default function App(): JSX.Element {
  const [data, setData] = useState<IFbp>(FbpNormal);
  const nodes = useStoreState((store) => store.nodes);
  const inputEl = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.value = JSON.stringify(data, null, 2);
    }
  }, []);

  useEffect(() => {
    const fbp = parseNodes(nodes);
    let value = {};
    if (inputEl.current) {
      value = JSON.parse(inputEl.current.value);

      inputEl.current.value = JSON.stringify(
        {
          ...value,
          ...fbp,
        },
        null,
        2
      );
    }
  }, [nodes]);

  function onChangeNetwork(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.value) {
      case 'FbpNormal':
        setData(FbpNormal);
        break;
      case 'FbpMultiInPorts':
        setData(FbpMultiInPorts);
        break;
      case 'FbpCycle':
        setData(FbpCycle);
        break;
      default:
        break;
    }
  }

  function onChangeValue(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newValue = event.target.value;

    try {
      const newData = eval('(function(){return ' + newValue + ';})()');

      if (inputEl.current) {
        inputEl.current.value = JSON.stringify(newData, null, 2);
      }
      setData(newData);
    } catch (e) {
      console.log('data is not verified json');
    }
  }

  return (
    <>
      <div style={{ padding: '10px 10px 0' }}>
        Network:
        <label>
          <input
            type="radio"
            value="FbpNormal"
            name="fbp"
            checked={data.name === 'Normal'}
            onChange={onChangeNetwork}
          />
          Normal
        </label>
        <label>
          <input
            type="radio"
            value="FbpMultiInPorts"
            name="fbp"
            checked={data.name === 'MultiInPorts'}
            onChange={onChangeNetwork}
          />
          MultiInPorts
        </label>
        <label>
          <input
            type="radio"
            value="FbpCycle"
            name="fbp"
            checked={data.name === 'Cycle'}
            onChange={onChangeNetwork}
          />
          Cycle
        </label>
      </div>

      <div className="App">
        <div className="App-flow-item">
          <CustomNodeFlow data={data} />
        </div>
        <div className="App-item">
          <textarea
            className="App-textarea"
            ref={inputEl}
            onChange={onChangeValue}
          ></textarea>
        </div>
      </div>
    </>
  );
}
