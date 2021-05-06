import React, { memo, FC, CSSProperties } from 'react';

import {
  Handle,
  Position,
  NodeProps,
  Connection,
  Edge,
  HandleType,
} from 'react-flow-renderer';

type TPorts = string[];

export interface IData {
  inPorts: TPorts;
  outPorts: TPorts;
  name: string;
  component: string;
}

export interface CustomNodeProps {
  data: IData;
}

interface HandleNodeProps {
  ports: TPorts;
  position: Position;
  type: HandleType;
}

const targetHandleStyle: CSSProperties = { background: '#555' };
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 };
// const sourceHandleStyleB: CSSProperties = {
//   ...targetHandleStyle,

//   bottom: 10,
//   top: 'auto',
// };

const onConnect = (params: Connection | Edge) =>
  console.log('handle onConnect', params);

const HandleNodes: FC<HandleNodeProps> = ({
  ports,
  position,
  type,
}: HandleNodeProps) => {
  return (
    <>
      {position === Position.Right ? (
        <div className="react-flow-customNode-side">
          <div className="react-flow-customNode-ports">
            {ports.map((id) => (
              <div className="react-flow-customNode-port" key={id}>
                <div className="react-flow-customNode-port-text">{id}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="react-flow-customNode-handles">
        {ports.map((id) => (
          <div className="react-flow-customNode-handle" key={id}>
            <Handle
              type={type}
              position={position}
              style={{
                background: '#555',
              }}
              // className="react-flow__node-customNode__"
              onConnect={onConnect}
              id={id}
            />
          </div>
        ))}
      </div>
      {position === Position.Left ? (
        <div className="react-flow-customNode-side">
          <div className="react-flow-customNode-ports">
            {ports.map((id) => (
              <div className="react-flow-customNode-port" key={id}>
                <div className="react-flow-customNode-port-text">{id}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

const CustomNode: FC<NodeProps> = ({ data }: CustomNodeProps) => {
  const { inPorts, outPorts, name, component } = data;
  return (
    <div className="react-flow-customNode-body">
      <HandleNodes ports={inPorts} position={Position.Left} type="target" />
      <div className="react-flow-customNode-center">
        <div className="react-flow-customNode-text react-flow-customNode-text__caption">
          {name}
        </div>
        <div className="react-flow-customNode-text-text react-flow-customNode-text__sm">
          {component}
        </div>
      </div>
      <HandleNodes ports={outPorts} position={Position.Right} type="source" />
    </div>
  );
};

export default memo(CustomNode);
