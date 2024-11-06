import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Space
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthenticationForm.css';

type FormValues = {
  email: string;
  name: string;
  password: string;
  verificationCode: string;
  terms: boolean;
};

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      verificationCode: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (userDetails: FormValues) => {
    const userApiEndpoint = "http://localhost:5000/"+type;
  
    try {
      if (type === 'login') {
        const { email, password, verificationCode } = userDetails;
        const userLoginDetails = {
          username: email,
          password,
          verificationCode,
        };
        const apiResponse = await axios.post(userApiEndpoint, userLoginDetails);
        console.log(apiResponse.data);
        navigate('/home');
      } else {
        const apiResponse = await axios.post(userApiEndpoint, userDetails);
        const userData = apiResponse.data;
        navigate('/two-factor-authentication', { state: userData });
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        console.log('Error', error.message);
      }
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="authentication-form-container">
      <Paper className="authentication-form-paper" radius="md" p="xl" withBorder {...props}>
        <Link to="/">
          <img 
            src="https://www.threatcenter.se/css/images/logo-tpc.svg" 
            alt="Logo" 
            style={{ width: '100px', height: 'auto', display: 'block', margin: '20px auto' }} 
          />
        </Link>
        <Space h="lg" />
        <Text size="lg" fw={500}>
          Welcome to TPC - Ticket System
        </Text>
        <Space h="lg" />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@tpc.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />

            {type === 'login' && (
              <TextInput
                required
                label="Verification code from your Authenticator app"
                placeholder="Verification Code"
                value={form.values.verificationCode}
                onChange={(event) => form.setFieldValue('verificationCode', event.currentTarget.value)}
                error={form.errors.verificationCode && 'Verification code should be 6 characters'}
                radius="md"
              />
            )}

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}