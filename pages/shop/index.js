import classNames from "classnames";
import React from "react";
import {
  Flex,
  Switch,
  Text,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Spacer,
  Button,
  Wrap,
  HStack,
  WrapItem,
  Select,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Link,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";
import ListCheck from "@/components/MenuList";
import CardShop from "@/components/cardShop";

export default function shop() {
  const colunm = [
    {
      label: "เรียงตามตัวอักษร",
    },
    {
      label: "เรียงตามวันที่สร้าง",
    },
    {
      label: "เรียงตามวันที่แก้ไข",
    },
    {
      label: "จำนวนผู้เข้าชม",
    },
  ];

  return (
    <>
      <Box m="10px" pt="10px" pb={"10px"}>
        <Flex>
          <Box>
            <InputGroup>
              <InputLeftElement pointerEvents="none" ml={"5px"}>
                <Image src="/images/search.png" h="20px" w="20px" />
              </InputLeftElement>
              <Input
                borderRadius="3xl"
                type="text"
                fontSize="21px"
                borderColor="gray.500"
                placeholder="ค้นหารายการ"
              />
            </InputGroup>
          </Box>
          <Box ml="10px">
            <InputGroup>
              <InputLeftElement pointerEvents="none" ml={"5px"}>
                <Image src="/images/calendar.png" h="20px" w="20px" />
              </InputLeftElement>
              <Input
                type="date"
                borderRadius="3xl"
                fontSize="21px"
                borderColor="gray.500"
                placeholder="เลือกวันที่"
              />
            </InputGroup>
          </Box>
          <Box ml="10px" border="1px" borderColor="black" borderRadius="md">
            <ListCheck data={colunm} />
          </Box>
          <Spacer />
          <Box borderWidth="1px" borderColor="red" borderRadius="md">
            <Link href="/stock/addProduct">
              <Button
                fontSize="21px"
                leftIcon={
                  <Image src="/images/pluswhite.png" h="15px" w="15px" />
                }
                bg="red"
                variant="solid"
                color="white"
                _hover={{}}
              >
                สร้างร้านค้า
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
      <Box pt="5px" pb={"5px"}>
        <Flex flexWrap={'wrap'} justifyContent={"space-around"}>
          <CardShop />
          <CardShop />
          <CardShop />
          <CardShop />
          <CardShop />
          <CardShop />
        </Flex>
      </Box>
    </>
  );
}
