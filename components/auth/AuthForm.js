import { StyleSheet, View } from 'react-native';
import Input from '../ui/Input';
import { useState } from 'react';
import Button from '../ui/Button';

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [entereConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsValid,
    name: nameIsValid,
    password: passwordIsValid,
    confirmPassword: PasswordDontMatch,
  } = credentialsInvalid;

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredConfirmPassword(enteredValue);
        break;

      default:
        break;
    }
  };

  const submitHandler = () => {
    console.log('버튼 클릭됨! submit!');
    // 사용자의 입력 상태값을 객체로 포장해서 AuthContent에게 넘긴다 -> 부모쪽에서 유효성 검증 할 것.
    onSubmit({
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword,
      confirmPassword: entereConfirmPassword,
    });
  };

  return (
    <View>
      <View>
        <Input
          label='이메일주소'
          keyBoardType='email-address'
          // bind()는 표준 javaScript 함수로, 나중에 실행할 함수를 미리 조정할 수 있게 합니다.
          // bind에 제공되는 첫 번째 인수는 곧 실행할 함수의 this 키워드로 설정됩니다.
          // 두 번째 인수는 지정한 함수의 전달할 값을 세팅하면 됩니다.
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          isInvalid={emailIsValid}
          value={enteredEmail}
        />
        {!isLogin && (
          <Input
            label='이름'
            onUpdateValue={updateInputValueHandler.bind(this, 'name')}
            isInvalid={nameIsValid}
            value={enteredName}
          />
        )}
        <Input
          label='비밀번호'
          secure
          onUpdateValue={updateInputValueHandler.bind(this, 'password')}
          isInvalid={passwordIsValid}
          value={enteredPassword}
        />
        {!isLogin && (
          <Input
            label='비밀번호 확인'
            secure
            onUpdateValue={updateInputValueHandler.bind(
              this,
              'confirmPassword',
            )}
            isInvalid={PasswordDontMatch}
            value={entereConfirmPassword}
          />
        )}
      </View>
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? '로그인' : '회원가입'}
        </Button>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
