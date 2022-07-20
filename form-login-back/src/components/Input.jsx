import { FormControl, FormLabel, Input as ChakraInput } from "@chakra-ui/react";



export function Input({ label, name, ...rest }) {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraInput
        name={name}
        focusBorderColor="cyan.500"
        bgColor="gray.900"
        variant="outline"
        {...rest}
      />
    
    </FormControl>

  )
}