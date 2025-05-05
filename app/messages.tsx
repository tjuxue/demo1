
import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useState, type ReactElement } from "react";

interface FormValues {
  username: string
  bio: string
}

export function Messages() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>()
  const userName = watch('username');
  const bioValue = watch('bio');
  const [messageValue, setMessageValue] = useState<ReactElement>(<div/>);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setMessageValue(<div>{messageValue}<p>{userName}: {bioValue}</p></div>)
    //console.log("messageValue is : " + messageValue);
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" maxW="sm">
        <Field.Root invalid={!!errors.username}>
          <Field.Label>Username</Field.Label>
          <Input
            placeholder="@username"
            {...register("username", { required: "Username is required" })}
          />
          <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.bio}>
          <Field.Label>Your comments</Field.Label>
          <Textarea
            //placeholder="I am ..."
            {...register("bio", { required: "Bio is required" })}
          />
          <Field.HelperText>What would you like to comment?</Field.HelperText>
          <Field.ErrorText>{errors.bio?.message}</Field.ErrorText>
        </Field.Root>
        <Button type="submit">Submit</Button>
        <p>{messageValue}</p>
      </Stack>
    </form>
  )
}
