import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  HStack,
  Center,
  Input,
  Button,
  Spacer,
  Avatar,
  Select,
  IconButton,
  Flex,
  Stack,
  InputGroup,
  InputLeftElement,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Switch,
  VStack,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import {
  AddIcon,
  EditIcon,
  DeleteIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import Axios from "axios";
import { Table } from "@nextui-org/react";

const colunmThTable = [
  {
    label: "รูปภาพ",
  },
  {
    label: "ชื่อ - นามสกุล",
  },
  {
    label: "E-mail",
  },
  {
    label: "สถานะ",
  },
  {
    label: "สิทธิ์การเข้าถึง",
  },
  {
    label: "วันที่สร้าง",
  },
  {
    label: "เพิ่มเติม",
  },
];

export default function AdminManagement() {
  const modalAdd = useDisclosure();
  const modalCopy = useDisclosure();
  const modalSuccess = useDisclosure();
  const modalDelete = useDisclosure();
  const modalDeleteSuccess = useDisclosure();
  const [inputValueURL, setInputValueURL] = useState("");
  const [userIdAdmin, setUserIdAdmin] = useState("");
  const [userNameAdmin, setUserNameAdmin] = useState("");
  const [getAllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    Axios.get("https://shopee-api.deksilp.com/api/getAllUsers").then(function (
      response
    ) {
      setAllUsers(response.data.users);
    });
  }, []);

  const handleAddAdmin = () => {
    modalAdd.onClose();
    modalCopy.onOpen();
  };

  const copyUrlAdmin = () => {
    navigator.clipboard.writeText("http://admin.picpang.com/login");
    setInputValueURL("คัดลอกสำเร็จ!");
  };

  const copyAllAdmin = () => {
    const accountAdmin =
      "ลิงค์เข้าใช้งาน : http://admin.picpang.com/login\nUsername : aaaa\nPassword : 12345";
    navigator.clipboard.writeText(accountAdmin);
    modalCopy.onClose();
    modalSuccess.onOpen();
  };

  //pagination
  const [itemsPerPage, setItemPerpages] = useState(5);
  const handleSelectChange = (event) => {
    setItemPerpages(event.target.value);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setinputValue] = useState(1);
  const handleInputChange = (event) => {
    if (
      event.target.value !== "" &&
      event.target.value >= 1 &&
      event.target.value <= totalPages
    ) {
      setCurrentPage(parseInt(event.target.value));
      setinputValue(parseInt(event.target.value));
    } else if (event.target.value === "") {
      setinputValue("");
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setinputValue(page);
  };
  let item = parseInt(itemsPerPage);
  const totalPages = Math.ceil(getAllUsers.length / item);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
      setinputValue(1);
    }
  }, [currentPage, totalPages]);

  const handleModalDeleteAdmin = (userID, userName) => {
    setUserIdAdmin(userID);
    setUserNameAdmin(userName);
    modalDelete.onOpen();
  };

  const handleConfirmDeleteAdmin = () => {
    modalDelete.onClose();
    modalDeleteSuccess.onOpen();
  }

  return (
    <>
      <Box p={[5, 10]}>
        <Box>
          <Center>
            <HStack>
              <Image
                width={42}
                height={42}
                src={"/images/menu/จัดการแอดมิน.png"}
                alt="admin"
              />
              <Text as="b" fontSize="4xl" color="#f84c01" pt={3}>
                {" "}
                จัดการแอดมิน
              </Text>
            </HStack>
          </Center>
        </Box>

        <Box mt={"10"}>
          <HStack>
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none" ml={"5px"}>
                  <Image width={20} height={20} src={"/images/search.png"} />
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
            <Spacer />
            <Box>
              <InputGroup>
                <InputLeftElement pointerEvents="none" ml={"5px"}>
                  <Image width={20} height={20} src={"/images/calendar.png"} />
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
            <Button
              onClick={modalAdd.onOpen}
              leftIcon={<AddIcon />}
              background="#f84c01"
              color="white"
            >
              เพิ่มแอดมิน
            </Button>
          </HStack>
        </Box>

        <Box mt={3}>
          <Table
            striped
            sticked
            aria-label="Example table with static content"
            css={{
              height: "auto",
              minWidth: "100%",
              border: "0px",
              boxShadow: "none",
            }}
            css={{ padding: "0px !important" }}
          >
            <Table.Header bg="#ff0000">
              {colunmThTable.map((item, index) => {
                return (
                  <Table.Column
                    style={{ backgroundColor: "#ff0000", color: "white" }}
                    key={index}
                    css={{
                      textAlign: "center",
                      padding: "0px !important",
                      height: "55px",
                    }}
                  >
                    <Text fontSize="21px">{item.label}</Text>
                  </Table.Column>
                );
              })}
            </Table.Header>
            <Table.Body>
              {getAllUsers.map((item, index) => {
                const dateCreate = new Date(item.user_created_at);
                const formattedDateCreate = dateCreate.toLocaleDateString();
                return (
                  <Table.Row
                    key={index}
                    css={
                      index % 2 !== 0
                        ? { fontSize: "21px", background: "$gray100" }
                        : { fontSize: "21px" }
                    }
                  >
                    <Table.Cell css={{ textAlign: "center" }}>
                      <Avatar
                        size="md"
                        name="adebayo"
                        src="https://bit.ly/dan-abramov"
                      />
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      {item.user_name}
                    </Table.Cell>
                    <Table.Cell>{item.email}</Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      {item.role_name}
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      ทุกเมนู
                    </Table.Cell>
                    <Table.Cell css={{ textAlign: "center" }}>
                      {formattedDateCreate}
                    </Table.Cell>
                    <Table.Cell>
                      <Flex justifyContent={"center"}>
                        <HStack>
                          <IconButton
                            borderRadius="3xl"
                            colorScheme="blue"
                            aria-label="Edit"
                            icon={<EditIcon />}
                          />
                          <IconButton
                            borderRadius="3xl"
                            colorScheme="red"
                            aria-label="Delete"
                            icon={<DeleteIcon />}
                            onClick={() => handleModalDeleteAdmin(item.userID,item.user_name)}
                          />
                        </HStack>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Box>
        <Box>
          <Flex m="10px">
            <Wrap alignSelf="center" fontSize="21px">
              <WrapItem>
                <Text>แสดงผล : </Text>
              </WrapItem>
              <WrapItem>
                <Select size="xs" onChange={handleSelectChange}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </Select>
              </WrapItem>
              <WrapItem>
                <Text>จำนวนแอดมิน : </Text>
              </WrapItem>
              <WrapItem>
                <Text>{getAllUsers.length}</Text>
              </WrapItem>
            </Wrap>
            <Spacer />
            <HStack spacing="2" alignSelf="center" fontSize="21px">
              <Button
                disabled={currentPage === 1 || currentPage < 1}
                onClick={() =>
                  handlePageChange(
                    currentPage === 1 ? currentPage : currentPage - 1
                  )
                }
                background="white"
                _hover={{}}
              >
                <Image
                  width={10}
                  height={15}
                  src={"/images/arrow/left-arrow.png"}
                />
              </Button>

              <Text>หน้า</Text>
              <Input
                htmlSize={1}
                placeholder={inputValue}
                size="xs"
                onChange={handleInputChange}
                value={inputValue}
              />
              <Text whitespace="nowrap">จาก</Text>
              <Text whitespace="nowrap">{totalPages}</Text>
              <Button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  handlePageChange(
                    currentPage === totalPages ? currentPage : currentPage + 1
                  )
                }
                background="white"
                _hover={{}}
              >
                <Image
                  width={10}
                  height={15}
                  src={"/images/arrow/right-arrow.png"}
                />
              </Button>
            </HStack>
          </Flex>
        </Box>

        {/* Start Modal Add New Admin */}
        <Modal
          isOpen={modalAdd.isOpen}
          onClose={modalAdd.onClose}
          closeOnOverlayClick={false}
          size="custom"
        >
          <ModalOverlay />
          <ModalContent width={"500px"} height={"410px"} mt={"160px"}>
            <ModalHeader>
              <Box>
                <Center>
                  <HStack>
                    <Image
                      width={28}
                      height={28}
                      src={"/images/menu/จัดการแอดมิน.png"}
                      alt="admin"
                    />
                    <Text fontSize="3xl">เพิ่มแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
            </ModalHeader>
            <ModalCloseButton
              backgroundColor={"#ff0000"}
              color={"white"}
              borderRadius={"50px"}
              height={"20px"}
              width={"20px"}
              fontSize={"8px"}
              fontWeight={"bold"}
            />

            <ModalBody>
              <FormControl>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Username : </FormLabel>
                  </Box>
                  <Box>
                    <Input placeholder="username@gmail.com" />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={4}>
                <HStack justify="center">
                  <Box>
                    <FormLabel>Password : </FormLabel>
                  </Box>
                  <Box>
                    <Input
                      type={"password"}
                      placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    />
                  </Box>
                </HStack>
              </FormControl>

              <FormControl mt={5} pl={16} pr={5}>
                <Text as="b">สิทธิ์การเข้าถึง</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={3} mt={4}>
                  <GridItem>
                    <HStack>
                      <Switch id="switch-dashboard" colorScheme={"green"} />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/dashboard.png"}
                        alt="dashboard"
                      />
                      <Text>Dashboard</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id="switch-report" colorScheme={"green"} />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/report.png"}
                        alt="report"
                      />
                      <Text>รายงาน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id="switch-shop" colorScheme={"green"} />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/ร้านค้าของฉัน.png"}
                        alt="shop"
                      />
                      <Text>ร้านค้าของฉัน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch
                        id="switch-admin-management"
                        colorScheme={"green"}
                      />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/จัดการแอดมิน.png"}
                        alt="admin"
                      />
                      <Text>จัดการแอดมิน</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id="switch-store" colorScheme={"green"} />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/คลังสินค้า.png"}
                        alt="stock"
                      />
                      <Text>คลังสินค้า</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack>
                      <Switch id="switch-setting" colorScheme={"green"} />
                      <Image
                        width={24}
                        height={24}
                        src={"/images/menu/ตั้งค่า.png"}
                        alt="setting"
                      />
                      <Text>ตั้งค่า</Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </FormControl>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button
                onClick={handleAddAdmin}
                background="#f84c01"
                height={"25px"}
                fontSize={"22px"}
                padding={"1rem 1.5rem"}
                color="white"
                mr={3}
              >
                เพิ่มแอดมิน
              </Button>
              {/* <Button onClick={modalAdd.onClose}>ยกเลิก</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Add New Admin */}

        {/* Start Modal Copy Link */}
        <Modal
          isOpen={modalCopy.isOpen}
          onClose={modalCopy.onClose}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent mt={"150px"}>
            <ModalHeader>
              <Box>
                <Center>
                  <HStack>
                    <Image
                      width={28}
                      height={28}
                      src={"/images/menu/จัดการแอดมิน.png"}
                    />
                    <Text fontSize="3xl">เพิ่มแอดมิน</Text>
                  </HStack>
                </Center>
              </Box>
            </ModalHeader>
            <ModalCloseButton
              backgroundColor={"#ff0000"}
              color={"white"}
              borderRadius={"50px"}
              height={"20px"}
              width={"20px"}
              fontSize={"8px"}
              fontWeight={"bold"}
            />

            <ModalBody>
              <VStack>
                <FormControl id="copy-link">
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>ลิ้งเข้าใช้งาน : </FormLabel>
                    </WrapItem>
                    <WrapItem>
                      <InputGroup>
                        <Input
                          htmlSize={22}
                          width="auto"
                          placeholder="http://admin.picpang.com/login"
                          value={inputValueURL}
                        />
                        <InputRightElement width="2.5rem">
                          {/* <Button h="1.75rem" size="sm">
                            Copy
                          </Button> */}
                          <Tooltip label="คัดลอกลิงค์" placement="top">
                            <Image
                              width={20}
                              height={20}
                              src={"/images/copyurladmin.png"}
                              onClick={copyUrlAdmin}
                            />
                          </Tooltip>
                        </InputRightElement>
                      </InputGroup>
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-username">
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>Username : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input
                        htmlSize={25}
                        width="auto"
                        placeholder="username@gmail.com"
                      />
                    </WrapItem>
                  </Wrap>
                </FormControl>

                <FormControl id="copy-password">
                  <Wrap align="center" justify="center">
                    <WrapItem>
                      <FormLabel m={0}>Password : </FormLabel>
                    </WrapItem>

                    <WrapItem>
                      <Input
                        htmlSize={25}
                        width="auto"
                        type={"password"}
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                      />
                    </WrapItem>
                  </Wrap>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter mt={1} justifyContent={"center"}>
              <Button
                onClick={copyAllAdmin}
                background="#f84c01"
                color="white"
                ml={5}
                height={"30px"}
                fontSize={"20px"}
                padding={"0rem 1.5rem"}
              >
                คัดลอก
              </Button>
              {/* <Button onClick={modalCopy.onClose}>ยกเลิก</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* End Modal Copy Link */}

        <Modal
          isOpen={modalSuccess.isOpen}
          onClose={modalSuccess.onClose}
          size={"lg"}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent pt={10} mt={"150px"}>
            <ModalHeader>
              <Center>
                <Image
                  width={110}
                  height={110}
                  src={"/images/check.png"}
                  alt="เพิ่มแอดมินเรียบร้อย"
                />
              </Center>
            </ModalHeader>
            <ModalCloseButton
              backgroundColor={"#ff0000"}
              color={"white"}
              borderRadius={"50px"}
              height={"20px"}
              width={"20px"}
              fontSize={"8px"}
              fontWeight={"bold"}
            />
            <ModalBody textAlign={"center"}>
              <Text as="b" fontSize="4xl">
                เพิ่มแอดมินเรียบร้อยแล้ว
              </Text>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                size={"lg"}
                background="#f84c01"
                color="white"
                height={"38px"}
                fontSize={"30px"}
                padding={"1.25rem 2.5rem 1rem 2.5rem"}
                onClick={modalSuccess.onClose}
              >
                ยืนยัน
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* ลบข้อมูลแอดมิน */}
        <Modal
          isOpen={modalDelete.isOpen}
          onClose={modalDelete.onClose}
          size={"lg"}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent pt={10} mt={"150px"}>
            <ModalHeader>
              <Center>
                <Image
                  width={110}
                  height={110}
                  src={"/images/binred.png"}
                  alt="คุณต้องการลบแอดมินใช่หรือไม่"
                />
              </Center>
            </ModalHeader>
            <ModalCloseButton
              backgroundColor={"#ff0000"}
              color={"white"}
              borderRadius={"50px"}
              height={"20px"}
              width={"20px"}
              fontSize={"8px"}
              fontWeight={"bold"}
            />
            <ModalBody textAlign={"center"}>
              <Text as="b" fontSize="4xl">
                คุณต้องการลบ {userNameAdmin} ใช่หรือไม่
              </Text>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                size={"lg"}
                background="#f84c01"
                color="white"
                height={"38px"}
                fontSize={"30px"}
                padding={"1.25rem 2.5rem 1rem 2.5rem"}
                mr={2}
                onClick={handleConfirmDeleteAdmin}
              >
                ยืนยัน
              </Button>
              <Button
                size={"lg"}
                background="white"
                color="black"
                height={"38px"}
                fontSize={"30px"}
                padding={"1.25rem 2.5rem 1rem 2.5rem"}
                border={"3px solid gray"}
                onClick={modalDelete.onClose}
              >
                ยกเลิก
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* ยืนยันลบแอดมิน */}
        <Modal
          isOpen={modalDeleteSuccess.isOpen}
          onClose={modalDeleteSuccess.onClose}
          size={"lg"}
          closeOnOverlayClick={false}
        >
          <ModalOverlay />
          <ModalContent pt={10} mt={"150px"}>
            <ModalHeader>
              <Center>
                <Image
                  width={110}
                  height={110}
                  src={"/images/check.png"}
                  alt="ลบแอดมินเรียบร้อย"
                />
              </Center>
            </ModalHeader>
            <ModalCloseButton
              backgroundColor={"#ff0000"}
              color={"white"}
              borderRadius={"50px"}
              height={"20px"}
              width={"20px"}
              fontSize={"8px"}
              fontWeight={"bold"}
            />
            <ModalBody textAlign={"center"}>
              <Text as="b" fontSize="4xl">
                ลบแอดมินเรียบร้อยแล้ว
              </Text>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                size={"lg"}
                background="#f84c01"
                color="white"
                height={"38px"}
                fontSize={"30px"}
                padding={"1.25rem 2.5rem 1rem 2.5rem"}
                onClick={modalDeleteSuccess.onClose}
              >
                ยืนยัน
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
