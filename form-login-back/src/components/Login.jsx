import { Button, Flex, Stack, Link, Spacer } from '@chakra-ui/react';
import { Input } from '../components/Input';

export  function Login() {
  return (
    
    <Flex w="100vw" h="100vh" align="center" justify="center" bg="blue.900" >
      
      <Flex
        as="form"
        width="100%"
        maxW={450}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="2">
         <Input name="email" type="email" label="E-mail" id="email" />
         <Input name="senha" type="password" label="Senha" id="senha" />
        </Stack>
        <Flex>
          <Link color="cyan.800" as='a'>Esqueci minha senha</Link>
          <Spacer/>
          <Link color="cyan.800" as='a'>Cadastrar</Link>
        </Flex>

        <Button type="submit" mt="12" colorScheme="facebook">Entrar</Button>
      </Flex>
    </Flex>
  )
}