import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMediamux, MediamuxProvider } from '../.';

const App = () => {
  return (
    <MediamuxProvider theme={{breakpoints: ["768px", "1200px"]}}>
      <Example />
    </MediamuxProvider>
  );
};

function Example() {
  const mmx = useMediamux()
  return (
    <div>
      <div>hello there</div>
      {mmx(["smol", "medium", "large"])}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
