import React from 'react';

MapStateComponent = () => {
    const [mapState, setMapState] = useState(new Map());

    const updateMap = (key, value) => {
      setMapState(map => new Map(map.set(key, value)));
    }
    render ()
    return (
        {mapState}
    )
  };