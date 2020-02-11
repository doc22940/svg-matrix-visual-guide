import React, { MutableRefObject, createRef } from 'react';
import { Flex } from 'theme-ui';
import Axis from './axis';
import Rectangle from './rectangle';
import MovedRectangle from './moved_rectangle';
import Transition from './transition';

const margin: { [key: string]: number } = {
  top: 30,
  left: 30,
  right: 30,
  bottom: 30,
};

const Graph: React.FC = () => {
  const [currentWidth, setCurrentWidth] = React.useState<number>(0);
  const [currentHeight, setCurrentHeight] = React.useState<number>(0);
  const ref: MutableRefObject<HTMLFieldSetElement> = createRef();

  const handleResize = React.useCallback(() => {
    if (ref.current) {
      const { width, height } = ref.current.parentElement.getBoundingClientRect();
      setCurrentWidth(Math.round(width));
      setCurrentHeight(Math.round(height));
    }
  }, [ref, setCurrentWidth, setCurrentHeight]);

  React.useEffect(() => {
    if (currentHeight === 0 && currentWidth === 0) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <Flex
      id="graph"
      sx={{
        boxSizing: 'border-box',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'inherit',
      }}
      ref={ref}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${currentWidth} ${currentHeight}`}
      >
        <Axis
          axis="x"
          marginTop={margin.top}
          marginLeft={margin.left}
          viewBoxHeight={currentHeight}
          viewBoxWidth={currentWidth}
        />
        <Axis
          axis="y"
          marginTop={margin.top}
          marginLeft={margin.left}
          viewBoxHeight={currentHeight}
          viewBoxWidth={currentWidth}
        />
        <g
          transform={`translate(${margin.left}, ${margin.right})`}
        >
          <Transition />
          <Rectangle />
          <MovedRectangle />
        </g>
      </svg>
    </Flex>
  );
};

export default Graph;
