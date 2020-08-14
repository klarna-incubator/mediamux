import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useMediamux, MediamuxProvider } from '../.';

const App = () => {
  return (
    <MediamuxProvider>
      <Example />
    </MediamuxProvider>
  );
};

function Example() {
  const mmx = useMediamux()

  // this will render "small" if viewport < 768px,
  // "medium" if viewport between 768px and 1200px,
  // "large" if viewport is 1200px or larger
  return (
    <div>
      {mmx(["small", "medium", "large"])}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
