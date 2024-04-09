import React, {useState} from 'react';

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: ${dimensions.topNavHeight};
  background: ${colors.themes.dark.navBackground};
`;

const SearchBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  border-left: 2px solid ${colors.themes.dark.backgroundLayers[3]};
`;