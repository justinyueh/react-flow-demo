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

import CustomNode, { IData } from './CustomNode';
import fbp from './fbp';

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

interface IElement {
  id: string;
  type: string;
  data: IData;
}

interface IFbp {
  name: string;
  processes: any[];
  connections: Record<string, string>;
}

function getPosition(index = 0) {
  if (index === 0) {
    return {
      x: 50,
      y: 200,
    };
  }
  if (index === 1) {
    return {
      x: 350,
      y: 100,
    };
  }
  return {
    x: 650,
    y: 210,
  };
}

function transform(config: IFbp): Elements {
  const elements = [] as Elements;

  const processesMap = {} as Record<string, Node<IData>>;

  config.processes.forEach((process, index) => {
    const ele = {
      id: process.name,
      type: 'customNode',
      data: {
        name: process.name,
        component: process.component,
        inPorts: [],
        outPorts: [],
      },
      position: getPosition(index),
      sourcePosition: 'right',
    } as Node<IData>;
    processesMap[process.name] = ele;
    elements.push(ele);
  });

  Object.entries(config.connections).forEach(([key, value]) => {
    const [name, output] = key.split('.');
    const [name1, data] = value.split('.');

    processesMap[name]?.data?.outPorts.push(output);

    if (processesMap[name1]?.data?.inPorts.indexOf(data) === -1) {
      processesMap[name1]?.data?.inPorts.push(data);
    }

    const edge = {
      id: `e${name}${output}-${name1}${data}`,
      source: name,
      sourceHandle: output,
      target: name1,
      targetHandle: data,
      // label: output,
    } as Edge;

    elements.push(styleEdge(edge));
  });

  console.log(elements);
  return elements;
}

const CustomNodeFlow = (): JSX.Element => {
  const [elements, setElements] = useState<Elements>([]);
  const [bgColor, setBgColor] = useState<string>(initBgColor);

  useEffect(() => {
    setElements(transform(fbp));
  }, []);

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
      <MiniMap nodeStrokeColor="#000000" nodeColor="#FFFFFF" />
      <Controls />
    </ReactFlow>
  );
};

export default CustomNodeFlow;
