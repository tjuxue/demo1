import {
    ActionBar,
    Button,
    Checkbox,
    Kbd,
    Portal,
    Table,
    Container,
    Float,
    Box,
    Stack,
    Grid,
    GridItem,
  } from "@chakra-ui/react";
  //import { DecorativeBox } from "compositions/lib/decorative-box";
import { useState } from "react";

export function Navigator() {
    return (
        <Stack>
            <Button>Class Information</Button>
            <Button>Useful Links</Button>
        </Stack>
    )
}