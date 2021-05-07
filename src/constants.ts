import { Position, HandleType } from 'react-flow-renderer';

export type TPorts = string[];

export interface IData {
  inPorts: TPorts;
  outPorts: TPorts;
  name: string;
  component: string;
}

export interface CustomNodeProps {
  data: IData;
}

export interface HandleNodeProps {
  ports: TPorts;
  position: Position;
  type: HandleType;
}

export interface IFbp {
  name: string;
  processes: Array<{ name: string; component: string }>;
  connections: Record<string, string>;
  positions: Array<{ x: number; y: number }>;
}
