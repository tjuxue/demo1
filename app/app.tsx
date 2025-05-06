import {
    ActionBar,
    Button,
    Checkbox,
    Kbd,
    Portal,
    Table,
    Pagination,
    ButtonGroup,
    Dialog,
    Field,
    Input,
    Heading,
    IconButton,
    Container,
    Float,
    Box,
    Stack,
    Grid,
    GridItem,
    CloseButton,
  } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useDisclosure } from '@chakra-ui/hooks';
//import { DecorativeBox } from "compositions/lib/decorative-box";
import { useState, useRef } from "react";
import data from './data/data.json';
console.log('data is ');
console.log(data);
import partyPhoto from './data/1.jpg';
import {Navigator} from './navigator';
import {Messages} from './messages';
import { useForm } from "react-hook-form";

export function App() {

  const [items, setItems] = useState(data.users);
  const [selection, setSelection] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;
  const defaultPageSize = 6;
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  interface FormValues {
    id: number
    name: string
    grade: number
    email: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    console.log("add user");
    console.log(data);
    items.push({
      id: data.id,
      name: data.name,
      grade: data.grade,
      email: data.email
    })
    try {
      const response = await fetch('http://localhost:3001/api/updateUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({users: items}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //const responseData = await response.json();
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }

    setItems(items);
  })

  const deleteAction = async (data: string[]) => {
    console.log('delete');
    console.log(data);
    let newItems = items;

    newItems.forEach((newItem)=> {
      data.forEach((d) => {
        if(d == newItem.name) {
          newItems.splice(newItems.indexOf(newItem), 1)
        }
      })
    });
    console.log('new items are ');
    console.log(newItems);

    try {
      const response = await fetch('http://localhost:3001/api/updateUsers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({users: newItems}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //const responseData = await response.json();
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }

    setItems(newItems);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const pageItems = items.slice((currentPage - 1) * defaultPageSize, currentPage * defaultPageSize)

  const rows = pageItems.map((item) => (
    <Table.Row
      key={item.name}
      data-selected={selection.includes(item.name) ? "" : undefined}
    >
      <Table.Cell>
        <Checkbox.Root
          size="sm"
          top="0.5"
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name),
            )
          }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
      </Table.Cell>
      <Table.Cell>{item.id}</Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.grade}</Table.Cell>
      <Table.Cell>{item.email}</Table.Cell>
    </Table.Row>
  ))

  return (
  <>
      <p style={{color: "green", fontSize: 40, textAlign: "center", background: "lightyellow"}}>Sandra's Class</p>
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={1}>
        <GridItem rowSpan={2} colSpan={1} backgroundColor={"lightgray"}>
          <div style={{padding: "6px"}}>
            <Navigator></Navigator>
          </div>
        </GridItem >
        <GridItem colSpan={2} >
          <div>
            <p>Happy Times</p>
            <img src={partyPhoto} alt="123" style={{padding: "2px"}}></img>
          </div>
        </GridItem >
        <GridItem colSpan={2}>
          <Table.Root >
              <Table.Header>
              <Table.Row>
                  <Table.ColumnHeader w="6">
                  <Checkbox.Root
                      size="sm"
                      top="0.5"
                      aria-label="Select all rows"
                      checked={indeterminate ? "indeterminate" : selection.length > 0}
                      onCheckedChange={(changes) => {
                      setSelection(
                          changes.checked ? items.map((item) => item.name) : [],
                      )
                      }}
                  >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                  </Checkbox.Root>
                  </Table.ColumnHeader>
                  <Table.ColumnHeader>Id</Table.ColumnHeader>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Grade</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Dialog.Root initialFocusEl={() => ref1.current}>

                  <Dialog.Trigger asChild>
                    <Button variant="outline" size='sm' style={{padding:"8px", marginRight:'5px', marginTop:'10px', height:"5px","minWidth":"4px"}}>+</Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Add new user</Dialog.Title>
                        </Dialog.Header>
                        <form onSubmit={onSubmit}>
                        <Dialog.Body pb="4">
                          <Stack gap="4">
                            <Field.Root>
                              <Field.Label>Id</Field.Label>
                              <Input placeholder="Id" {...register("id", { required: "Id is required" })}/>
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>Name</Field.Label>
                              <Input placeholder="Name" {...register("name", { required: "Name is required" })}/>
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>Grade</Field.Label>
                              <Input placeholder="Grade" {...register("grade")}/>
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>Email</Field.Label>
                              <Input placeholder="Email" {...register("email")}/>
                            </Field.Root>
                          </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </Dialog.ActionTrigger>
                          <Dialog.ActionTrigger asChild>
                            <Button type='submit'>Save</Button>
                          </Dialog.ActionTrigger>
                        </Dialog.Footer>
                        </form>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
              </Table.Row>
              </Table.Header>
              <Table.Body>{rows}</Table.Body>
          </Table.Root>

          <Pagination.Root count={items.length * 5} pageSize={defaultPageSize} page={currentPage}>
            <ButtonGroup variant="ghost" size="sm" wrap="wrap">
              <Pagination.PrevTrigger asChild>
                <IconButton onClick={() => setCurrentPage(currentPage - 1)}>
                  <LuChevronLeft/>
                </IconButton>
              </Pagination.PrevTrigger>

              <Pagination.Items
                render={(page) => (
                  <IconButton variant={{ base: "ghost", _selected: "outline" }} onClick={() => setCurrentPage(page.value)}>
                    {page.value}
                  </IconButton>
                )}
              />

              <Pagination.NextTrigger asChild>
                <IconButton onClick={() => setCurrentPage(currentPage + 1)}>
                  <LuChevronRight />
                </IconButton>
              </Pagination.NextTrigger>
            </ButtonGroup>
          </Pagination.Root>

          <ActionBar.Root open={hasSelection}>
              <Portal>
              <ActionBar.Positioner>
                  <ActionBar.Content>
                  <ActionBar.SelectionTrigger>
                      {selection.length} selected
                  </ActionBar.SelectionTrigger>
                  <ActionBar.Separator />
                  <Button variant="outline" size="sm" onClick={() => deleteAction(selection)}>
                      Delete <Kbd>⌫</Kbd>
                  </Button>
                  <Button variant="outline" size="sm">
                      Edit <Kbd>T</Kbd>
                  </Button>
                  </ActionBar.Content>
              </ActionBar.Positioner>
              </Portal>
          </ActionBar.Root>
        </GridItem >
        <GridItem colSpan={2} style={{paddingLeft: '6px'}}>
          <p style={{textAlign:'center', marginTop: '8px', marginBottom: '10px', fontSize: 20, fontWeight: 'bold'}}>Lesson Schedule</p>
          <Stack>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Unit 2 At School</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Unit 7 Shopping</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Unit 9 Daily Living</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root>
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>Unit 10 Free Time</Checkbox.Label>
            </Checkbox.Root>
          </Stack>
        </GridItem>
        <GridItem colSpan={2}>
          <p style={{textAlign: "center", fontSize: 20, fontWeight: 'bold'}}>Message Boards</p>
          <div style={{padding: "5px"}}>
            <Messages/>
          </div>
        </GridItem>
      </Grid>
  </>
  )
}

