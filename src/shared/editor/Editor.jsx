import EditorJs from 'react-editor-js';
import styled from 'styled-components';

import { EDITOR_TOOLS } from './Tools';

const EditorContainer = styled.div`
  border: 1px solid rgb(48, 52, 54);
  width: 100%;
  position: relative;
  background: #181a1b;
  &:focus-within {
    box-shadow: 0 3px 18px -6px rgba(255,255,255,0.3);
  }
`;

const StyledEditor = styled(EditorJs)`
  width: 100%;
`;

const Editor = ({data, onChange, onBlur = () => {}}) => (
  <EditorContainer onBlur={onBlur}>
    <StyledEditor data={data} onChange={onChange} tools={EDITOR_TOOLS} />
  </EditorContainer>
);

// default for lazy loading later
export default Editor;
