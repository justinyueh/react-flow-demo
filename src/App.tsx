import React, { useEffect, useRef, useState } from 'react';
import {
  useStoreState,
  // useStoreActions,
  OnLoadParams,
} from 'react-flow-renderer';
import CustomNodeFlow from './CustomNodeFlow';
import { FbpNormal, FbpMultiInPorts, FbpCycle } from './fbp';
import { IData, IFbp } from './constants';
import {
  parseNodes,
  copyToClipboard,
  transformToSource,
  beautifyJson,
  jsonParse,
} from './utils';
import './App.css';

export default function App(): JSX.Element {
  const [data, setData] = useState<IFbp>(FbpNormal);
  const nodes = useStoreState((store) => store.nodes);
  // const setSelectedElements = useStoreActions(
  //   (actions) => actions.setSelectedElements
  // );
  const inputEl = useRef<HTMLTextAreaElement>(null);
  const instanceRef = useRef<OnLoadParams<IData> | null>(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.value = JSON.stringify(data, null, 2);
    }
  }, []);

  useEffect(() => {
    const fbp = parseNodes(nodes);
    let value = {};
    if (inputEl.current) {
      value = jsonParse(inputEl.current.value) as string;

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

  // const selectAll = () => {
  //   setSelectedElements(
  //     nodes.map((node) => ({ id: node.id, type: node.type }))
  //   );
  // };

  const instanceToSource = () => {
    if (instanceRef.current && inputEl.current) {
      inputEl.current.value = transformToSource(
        instanceRef.current.toObject(),
        JSON.parse(inputEl.current.value) as IFbp
      );
    }
  };

  const sourceToInstance = () => {
    if (inputEl.current) {
      try {
        const newData = jsonParse(inputEl.current.value) as IFbp;
        setData(newData);
      } catch (e) {
        console.log('data is not verified json');
      }
    }
  };

  const handleBeautifyJson = () => {
    if (inputEl.current) {
      const newValue = beautifyJson(inputEl.current.value);
      inputEl.current.value = newValue;

      setData(JSON.parse(newValue));
    }
  };

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
    try {
      const newValue = event.target.value;
      if (inputEl.current) {
        inputEl.current.value = newValue;
      }

      if (beautifyJson(newValue) === newValue) {
        setData(JSON.parse(newValue));
      }
    } catch (e) {
      console.log('JSON not verify');
    }
  }

  function handleCopy() {
    if (inputEl.current) {
      copyToClipboard(inputEl.current.value);
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
          <CustomNodeFlow data={data} instanceRef={instanceRef} />
        </div>
        <div className="App-item">
          <div className="App-item-box">
            <textarea
              className="App-item-textarea"
              ref={inputEl}
              onChange={onChangeValue}
            />
          </div>
          <div>
            <button onClick={sourceToInstance}>←</button>
            <button onClick={instanceToSource}>→</button>
            {/* <button onClick={selectAll}>selectAll</button> */}
            <button onClick={handleBeautifyJson}>beautifyJson</button>
            <button onClick={handleCopy}>Copy to Clipboard</button>
          </div>
        </div>
      </div>
    </>
  );
}
