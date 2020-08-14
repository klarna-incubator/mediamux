import * as React from 'react';

type MediamuxContextType = {
  matchingQueries: boolean[];
};

type Theme = {
  breakpoints: String[];
};

type Props = {
  theme?: Theme;
  children: React.ReactNode;
};

const initialValues: MediamuxContextType = {
  matchingQueries: [],
};

const defaultTheme = {
  breakpoints: ['40em', '56em', '64em'],
};

function getMediaQueries(theme: Theme) {
  const { breakpoints } = theme;
  const mediaQueries = breakpoints
    .map(n => `(min-width: ${n})`)
    .map(window.matchMedia);

  return mediaQueries;
}

const MediamuxContext = React.createContext(initialValues);

function MediamuxProvider({ theme = defaultTheme, children }: Props) {
  const [matchingQueries, setMatchingQueries] = React.useState(
    getMediaQueries(theme).map(x => x.matches)
  );

  const handleQueryChange = React.useRef(() => {
    setMatchingQueries(getMediaQueries(theme).map(x => x.matches));
  });

  React.useEffect(() => {
    const mediaQueryListeners = getMediaQueries(theme);
    const eventHandler = handleQueryChange.current;
    for (let mq of mediaQueryListeners) {
      mq.addEventListener('change', eventHandler);
    }
    return () => {
      for (let mq of mediaQueryListeners) {
        mq.removeEventListener('change', eventHandler);
      }
    };
  }, [theme, handleQueryChange]);

  return (
    <MediamuxContext.Provider value={{ matchingQueries }}>
      {children}
    </MediamuxContext.Provider>
  );
}

function useMediamux() {
  const { matchingQueries } = React.useContext(MediamuxContext);
  const matchingQueriesCount = matchingQueries.filter((x: boolean) => x).length;

  return (x: any[]) => x[Math.min(x.length - 1, matchingQueriesCount)];
}

export { useMediamux, MediamuxProvider, MediamuxContext as __Context };
