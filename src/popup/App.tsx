import { styled } from 'styled-components';

function App() {
  return (
    <div className="App">
      <Wrapper>
        <div>질문을 입력해주세요</div>
        <Input></Input>
        <button>제출</button>
      </Wrapper>
    </div>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.15);
  padding: 1rem;
  border-radius: 6px;
`;

const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
`;
