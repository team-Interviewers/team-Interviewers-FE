import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { QUESTION_TYPE, Question, QuestionType } from '../types/question';
import CheckBox from './CheckBox';

type AnswerMode = 'question' | 'description';

interface AnswerProps {
  answer: string;
  question: Question;
  mode: AnswerMode;
  handleChange: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
}

const Answer = ({ answer, question, mode, handleChange }: AnswerProps) => {
  const questionType = isObjective(question);

  const answerComponent = (questionType: QuestionType) => {
    if (questionType === QUESTION_TYPE.OBJECTIVE)
      return (
        <ObjectiveAnswer
          question={question}
          handleChange={handleChange}
          mode={mode}
        />
      );

    if (questionType === QUESTION_TYPE.SUBJECTIVE)
      return (
        <SubjectiveAnswer
          answer={answer}
          question={question}
          mode={mode}
          handleChange={handleChange}
        />
      );

    return null;
  };

  return <Wrapper>{answerComponent(questionType)}</Wrapper>;
};

export default Answer;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

interface SubjectiveAnswerProps {
  answer: string;
  question: Question;
  mode: AnswerMode;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const SubjectiveAnswer = ({
  answer,
  question,
  mode,
  handleChange,
}: SubjectiveAnswerProps) => {
  return (
    <>
      {mode === 'question' ? (
        <Input
          value={answer}
          onChange={handleChange}
          placeholder="정답을 입력해주세요."
        />
      ) : (
        <AnswerText>✅ : {question.correct}</AnswerText>
      )}
    </>
  );
};

const Input = styled.textarea`
  background-color: #646464;
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  color: white;
  min-height: calc(15vh);
  border-radius: 10px;
  resize: none;
  color: white;
  box-sizing: border-box;
  &::placeholder {
    color: ${(props) => props.theme.palette.grey400};
  }
`;

const AnswerText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

interface ObjectiveAnswerProps {
  question: Question;
  mode: AnswerMode;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ObjectiveAnswer = ({
  question,
  mode,
  handleChange,
}: ObjectiveAnswerProps) => {
  const [checked, setChecked] = useState(-1);

  useEffect(() => {
    if (mode === 'description')
      setChecked(question.choices.indexOf(question.correct));
  }, [mode]);

  const onChecked = (isChecked: boolean, index: number) => {
    if (mode === 'description') return;
    setChecked(isChecked ? index : -1);
    handleChange({
      target: {
        value: isChecked ? question.choices[index] : '',
      },
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      {question.choices.map((choice, index) => (
        <CheckBox
          key={index}
          id={`choice-${index}`}
          isChecked={checked === index}
          onChange={(isChecked) => onChecked(isChecked, index)}
          disabled={mode === 'description'}
        >
          <Choice>{choice}</Choice>
        </CheckBox>
      ))}
    </div>
  );
};

const isObjective = (question: Question): QuestionType => {
  return question.choices.length > 0 ? 'objective' : 'subjective';
};

const Choice = styled.span`
  color: white;
  margin-left: 10px;
  font-size: 14px;
`;
