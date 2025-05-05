import {
    ActionBar,
    Button,
    Checkbox,
    Kbd,
    Portal,
    Table,
    Pagination,
    ButtonGroup,
    Heading,
    IconButton,
    Container,
    Float,
    Box,
    Stack,
    Grid,
    GridItem,
  } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
//import { DecorativeBox } from "compositions/lib/decorative-box";
import { useState } from "react";
import data from './data/data.json';
console.log('data is ');
console.log(data);
import partyPhoto from './data/1.jpg';
import {Navigator} from './navigator';
import {Messages} from './messages';

export function App() {

  const [items, setItems] = useState(data.users);
  const [selection, setSelection] = useState<string[]>([]);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;
  const defaultPageSize = 5;

  const deleteAction = async (data: string[]) => {
    console.log('delete');
    console.log(data);
    let newItems = items;
    for(let i=0; i<=data.length; i++) {
      newItems = items.filter(item => item.name != data[i]);
    }
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
      <p style={{color: "green", fontSize: 40, textAlign: "center", background: "lightyellow"}}>Sandra's class</p>
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={0}>
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
                      Share <Kbd>T</Kbd>
                  </Button>
                  </ActionBar.Content>
              </ActionBar.Positioner>
              </Portal>
          </ActionBar.Root>
        </GridItem >
        <GridItem colSpan={2}>
          <p>Lesson Learned</p>
          <p>Unit 7 Shopping</p>
        </GridItem>
        <GridItem colSpan={2}>
          <p style={{textAlign: "center"}}>Message Boards</p>
          <div style={{padding: "5px"}}>
            <Messages/>
          </div>
        </GridItem>
      </Grid>
  </>
  )
}

