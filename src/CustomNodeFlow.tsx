import React, { useState, useEffect, MouseEvent } from 'react';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  SnapGrid,
  Connection,
  Edge,
} from 'react-flow-renderer';

import CustomNode from './CustomNode';
import { transform, styleEdge } from './utils';
import { IData, IFbp } from './constants';

const onNodeDragStop = (_: MouseEvent, node: Node) => {
  console.log('drag stop', node);
};
const onElementClick = (_: MouseEvent, element: FlowElement) => {
  console.log('click', element);
};

const connectionLineStyle = { stroke: '#fff' };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  customNode: CustomNode,
};

interface Props {
  data: IFbp;
  instanceRef: React.MutableRefObject<OnLoadParams<IData> | null>;
}

const CustomNodeFlow = ({ data, instanceRef }: Props): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);

  useEffect(() => {
    setElements(transform(data));
  }, [data]);

  const onLoad = (reactFlowInstance: OnLoadParams<IData>) => {
    console.log('flow loaded:', reactFlowInstance);

    instanceRef.current = reactFlowInstance;
  };

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) => {
    console.log('onConnect', params);
    setElements((els) => addEdge(styleEdge({ ...params } as Edge), els));
  };

  return (
    <ReactFlow
      elements={elements}
      onElementClick={onElementClick}
      onElementsRemove={onElementsRemove}
      onConnect={onConnect}
      onNodeDragStop={onNodeDragStop}
      style={{ background: '#1a192b' }}
      onLoad={onLoad}
      nodeTypes={nodeTypes}
      connectionLineStyle={connectionLineStyle}
      snapToGrid={true}
      snapGrid={snapGrid}
      defaultZoom={1}
    >
      <MiniMap nodeStrokeColor="#777777" nodeColor="#9e9e9e" />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
