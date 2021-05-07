export const FbpNormal = {
  name: 'Normal',
  processes: [
    { name: 'a', component: 'Normal/a' },
    { name: 'b', component: 'Normal/b' },
    { name: 'c', component: 'Normal/c' },
    { name: 'd', component: 'Normal/d' },
  ],
  connections: {
    'a.output': 'b.data',
    'b.output': 'c.data',
    'c.output': 'd.data',
  },
  positions: [
    { x: 50, y: 100 },
    { x: 200, y: 100 },
    { x: 380, y: 100 },
    { x: 550, y: 100 },
  ],
};

export const FbpMultiInPorts = {
  name: 'MultiInPorts',
  processes: [
    { name: 'a', component: 'MultiInPorts/a' },
    { name: 'b', component: 'MultiInPorts/b' },
    { name: 'c', component: 'MultiInPorts/c' },
    { name: 'd', component: 'MultiInPorts/d' },
    { name: 'e', component: 'MultiInPorts/e' },
  ],
  connections: {
    'a.output': 'd.data1',
    'b.output': 'd.data2',
    'c.output': 'd.data3',
    'd.output': 'e.data',
  },
  positions: [
    { x: 50, y: 100 },
    { x: 50, y: 200 },
    { x: 50, y: 300 },
    { x: 300, y: 200 },
    { x: 500, y: 200 },
  ],
};

export const FbpCycle = {
  name: 'Cycle',
  processes: [
    { name: 'a', component: 'Cycle/a' },
    { name: 'b', component: 'Cycle/b' },
    { name: 'c', component: 'Cycle/c' },
    { name: 'd', component: 'Cycle/d' },
  ],
  connections: {
    'a.output': 'b.data',
    'b.output': 'c.data',
    'c.output': 'd.data',
    'c.output1': 'a.data',
  },
  positions: [
    { x: 50, y: 100 },
    { x: 250, y: 100 },
    { x: 420, y: 200 },
    { x: 600, y: 100 },
  ],
};
