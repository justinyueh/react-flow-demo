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
  ArrowHeadType,
} from 'react-flow-renderer';

import CustomNode from './CustomNode';
import { transform } from './utils';
import { IFbp } from './constants';

const onLoad = (reactFlowInstance: OnLoadParams) => {
  console.log('flow loaded:', reactFlowInstance);
};

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

function styleEdge(element: Edge) {
  element.style = {
    strokeWidth: '3',
  };
  element.labelStyle = {
    fontSize: '10px',
    fontFamily: "'Courier New', Courier, monospace",
  };

  element.type = 'smoothstep';
  // element.animated = true;
  element.arrowHeadType = ArrowHeadType.ArrowClosed;
  return element;
}

interface Props {
  data: IFbp;
}

const CustomNodeFlow = ({ data }: Props): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);

  useEffect(() => {
    setElements(transform(data));
  }, [data]);

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) => {
    console.log(params);
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
