import React from 'react';
import CustomNodeFlow from './CustomNodeFlow';
import config from './config.json';
import './App.css';

export default function App(): JSX.Element {
  return (
    <>
      <div style={{ padding: '10px 10px 0' }}>learn react</div>
      <div className="App">
        <div className="App-flow-item">
          <CustomNodeFlow />
        </div>
        <div className="App-item">
          <textarea
            className="App-textarea"
            value={JSON.stringify(config, null, 2)}
            readOnly
          ></textarea>
        </div>
      </div>
    </>
  );
}
