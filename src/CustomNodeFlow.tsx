import React, { useState, useEffect, MouseEvent } from 'react';
// import { ChangeEvent } from 'react';
import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Node,
  FlowElement,
  OnLoadParams,
  Elements,
  // Position,
  SnapGrid,
  Connection,
  Edge,
  ArrowHeadType,
} from 'react-flow-renderer';

import ColorSelectorNode from './ColorSelectorNode';
import config from './config.json';

const onLoad = (reactFlowInstance: OnLoadParams) =>
  console.log('flow loaded:', reactFlowInstance);
const onNodeDragStop = (_: MouseEvent, node: Node) =>
  console.log('drag stop', node);
const onElementClick = (_: MouseEvent, element: FlowElement) =>
  console.log('click', element);

const initBgColor = '#1A192B';

const connectionLineStyle = { stroke: '#fff' };
const snapGrid: SnapGrid = [16, 16];
const nodeTypes = {
  selectorNode: ColorSelectorNode,
};

function styleEdge(element: Edge) {
  element.style = {
    strokeWidth: '3',
  };
  element.type = 'bezier';
  // element.animated = true;
  element.arrowHeadType = ArrowHeadType.ArrowClosed;
  // element.label = 'hello';
  return element;
}

function transform(arr: any[]): Elements {
  return arr.map((item: Edge | Node) => {
    const element = {
      ...item,
    } as FlowElement;

    if (isEdge(element)) {
      styleEdge(element);
    }

    return element;
  });
}

const CustomNodeFlow = (): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);
  const [bgColor, setBgColor] = useState<string>(initBgColor);

  // useEffect(() => {
  //   const onChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setElements((els) =>
  //       els.map((e) => {
  //         if (isEdge(e) || e.id !== '2') {
  //           return e;
  //         }

  //         const color = event.target.value;

  //         setBgColor(color);

  //         return {
  //           ...e,
  //           data: {
  //             ...e.data,
  //             color,
  //           },
  //         };
  //       })
  //     );
  //   };

  //   setElements([
  //     {
  //       id: '1',
  //       type: 'input',
  //       data: { label: 'An input node' },
  //       position: { x: 50, y: 50 },
  //       sourcePosition: Position.Right,
  //     },
  //     {
  //       id: '2',
  //       type: 'selectorNode',
  //       data: { onChange: onChange, color: initBgColor },
  //       style: { border: '1px solid #777', padding: 10 },
  //       position: { x: 250, y: 50 },
  //     },
  //     {
  //       id: '3',
  //       type: 'output',
  //       data: { label: 'Output A' },
  //       position: { x: 550, y: 25 },
  //       targetPosition: Position.Left,
  //     },
  //     {
  //       id: '4',
  //       type: 'output',
  //       data: { label: 'Output B' },
  //       position: { x: 550, y: 100 },
  //       targetPosition: Position.Left,
  //     },

  //     { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#fff' }, arrowHeadType: ArrowHeadType.ArrowClosed },
  //     { id: 'e2a-3', source: '2', sourceHandle: 'a', target: '3', animated: true, style: { stroke: '#fff' }, arrowHeadType: ArrowHeadType.ArrowClosed },
  //     { id: 'e2b-4', source: '2', sourceHandle: 'b', target: '4', animated: true, style: { stroke: '#fff' }, arrowHeadType: ArrowHeadType.ArrowClosed },
  //   ]);
  // }, []);

  useEffect(() => {
    setElements(transform(config));
  }, []);

  const onElementsRemove = (elementsToRemove: Elements) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params: Connection | Edge) =>
    setElements((els) => addEdge(styleEdge({ ...params } as Edge), els));

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
      <MiniMap
        nodeStrokeColor={(n: Node): string => {
          console.log(n);
          if (n.type === 'input') return '#0041d0';
          if (n.type === 'selectorNode') return bgColor;
          if (n.type === 'output') return '#ff0072';

          return '#eee';
        }}
        nodeColor={(n: Node): string => {
          if (n.type === 'selectorNode') return bgColor;

          return '#fff';
        }}
      />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
