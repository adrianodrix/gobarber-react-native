import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: #fc4c75;
`;
