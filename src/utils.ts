import {
  Node,
  Elements,
  Edge,
  isEdge,
  isNode,
  ArrowHeadType,
  FlowExportObject,
} from 'react-flow-renderer';
import { IData, IFbp } from './constants';

export function styleEdge(element: Edge): Edge {
  element.style = {
    strokeWidth: '3',
  };
  element.labelStyle = {
    fontSize: '10px',
    fontFamily: "'Courier New', Courier, monospace",
  };

  element.id = `e${element.source}${element.sourceHandle}-${element.target}${element.targetHandle}`;

  element.type = 'smoothstep';
  // element.animated = true;
  element.arrowHeadType = ArrowHeadType.ArrowClosed;
  return element;
}

export function transform(config: IFbp): Elements {
  const elements = [] as Elements;

  const processesMap = {} as Record<string, Node<IData>>;

  config.processes.forEach((process, index) => {
    let position = { x: 0, y: 0 };
    if (config.positions && config.positions[index]) {
      position = config.positions[index];
    }
    const ele = {
      id: process.name,
      type: 'customNode',
      data: {
        name: process.name,
        component: process.component,
        inPorts: [],
        outPorts: [],
      },
      position,
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
      source: name,
      sourceHandle: output,
      target: name1,
      targetHandle: data,
      // label: output,
    } as Edge;

    elements.push(styleEdge(edge));
  });

  return elements;
}

export function transformToSource(
  object: FlowExportObject<IData>,
  fbp: IFbp
): string {
  console.log(object);
  const newFbp = {
    ...fbp,
    processes: [] as IFbp['processes'],
    connections: {} as IFbp['connections'],
    positions: [] as IFbp['positions'],
  } as IFbp;

  object.elements.forEach((element) => {
    if (isNode(element)) {
      newFbp.processes.push({
        name: element.data?.name || '',
        component: element.data?.component || '',
      });
      newFbp.positions.push({
        x: element.position.x,
        y: element.position.y,
      });
    } else if (isEdge(element)) {
      newFbp.connections[
        `${element.source}.${element.sourceHandle}`
      ] = `${element.target}.${element.targetHandle}`;
    }
  });

  return JSON.stringify(newFbp, null, 2);
}

export function parseNodes(nodes: Node<IData>[]): IFbp {
  const fbp = {} as IFbp;

  fbp.processes = nodes.map((node) => {
    return {
      name: node?.data?.name || '',
      component: node?.data?.component || '',
    };
  });
  fbp.positions = nodes.map((node) => {
    return {
      ...node.__rf.position,
    };
  });

  return fbp;
}

export function copyToClipboard(text: string): void {
  const json = JSON.parse(text);
  navigator.clipboard.writeText(JSON.stringify(json));
}

export function jsonParse(str: string): unknown {
  return eval('(function(){return ' + str + ';})()');
}

export function beautifyJson(str: string): string {
  return JSON.stringify(jsonParse(str), null, 2);
}
