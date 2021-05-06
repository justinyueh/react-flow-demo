export default {
  name: 'CloseFailure',
  processes: [
    { name: 'findFixedElements', component: 'CloseFailure/findFixedElements' },
    { name: 'listenEvent', component: 'CloseFailure/listenEvent' },
    { name: 'end', component: 'CloseFailure/end' },
  ],
  connections: {
    'findFixedElements.output': 'listenEvent.data',
    'listenEvent.output': 'end.data',
  },
};
