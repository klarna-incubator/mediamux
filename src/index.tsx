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

const MediamuxContext = React.createContext(initialValues);

function MediamuxProvider({ theme = defaultTheme, children }: Props) {
  const { breakpoints } = theme;
  const mediaQueries = breakpoints.map(n => `(min-width: ${n})`);

  const [matchingQueries, setMatchingQueries] = React.useState(
    mediaQueries.map(x => window.matchMedia(x).matches)
  );

  // todo: fix "any"
  const handleQueryChange = (
    index: number,
    currentMatchingQueries: boolean[]
  ) => (x: any) => {
    const newMatchingQueries = [...currentMatchingQueries];

    newMatchingQueries[index] = x.matches;
    setMatchingQueries(newMatchingQueries);
  };

  React.useEffect(() => {
    const matchMediaQueries = mediaQueries.map(x => window.matchMedia(x));
    for (let index = 0; index < matchMediaQueries.length; index++) {
      const mq = matchMediaQueries[index];
      mq.addEventListener('change', handleQueryChange(index, matchingQueries));
    }
  }, [mediaQueries, matchingQueries]);

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
