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
  ModalCloseButton,
  useDisclosure,
  Link,
  Card,
  CardBody,
  Heading,
} from "@chakra-ui/react";

function index() {
  const modalAdd = useDisclosure()

  return (
    <>
      <Card maxW="sm" mb={"10px"} boxShadow="base">
        <CardBody>
          <Box>
            <Flex alignItems="center">
              <Switch colorScheme="brand" size="sm" mr={"5px"} />
              เปิด/ปิดเพื่อแสดง
              <Spacer />
              <Image src="/images/star1.png" h="20px" w="20px" />
            </Flex>
          </Box>
          <Box>
            <Image
              src="/images/YETI-1.jpg"
              pos="relative"
              mt={"5px"}
              borderRadius="lg"
              boxShadow="md"
            />
            <Image
              src="/images/PM143.jpg"
              pos="absolute"
              top={"25%"}
              left={"33%"}
              borderRadius={"100%"}
              width={"135px"}
              height={"135px"}
              border={"5px solid white"}
            />
          </Box>
          <Box mt={"5px"}>
            <Text fontSize="3xl" fontWeight={"bold"} textAlign="center">
              แก้วเยติ ส่งไวทั่วไทย
            </Text>
            <Flex justifyContent={"space-around"}>
              <Text fontSize="sm">จำนวนผู้เข้าชม : 5,980</Text>
              <Text fontSize="sm">วันที่สร้าง : 04/09/64</Text>
              <Text fontSize="sm">แก้ไขล่าสุด : 23/04/65</Text>
            </Flex>
          </Box>
          <Box mt={"0.75rem"}>
            <Flex justifyContent={"space-around"}>
              <Button
                bgColor={"white"}
                border={"2px solid red"}
                height={"30px"}
              >
                <Image
                  src="/images/copyshop.png"
                  width={"20px"}
                  height={"20px"}
                />
                <Text ml={"8px"} fontSize="xl" color={"#ff0000"}>
                  คัดลอกลิงค์
                </Text>
              </Button>
              <Button
                bgColor={"white"}
                border={"2px solid black"}
                height={"30px"}
              >
                <Image
                  src="/images/binshop.png"
                  width={"18px"}
                  height={"18px"}
                />
                <Text ml={"8px"} fontSize="xl">
                  ลบ
                </Text>
              </Button>
              <Button
                bgColor={"#ff0000"}
                // border={"2px solid black"}
                height={"30px"}
                onClick={modalAdd.onOpen}
              >
                <Image
                  src="/images/editshop.png"
                  width={"18px"}
                  height={"18px"}
                />
                <Text ml={"8px"} fontSize="xl" color={"white"}>
                  แก้ไข
                </Text>
              </Button>
            </Flex>
          </Box>
        </CardBody>
      </Card>

      {/* Modal แก้ไขร้านค้า */}
      <Modal onClose={modalAdd.onClose} size={'xl'} isOpen={modalAdd.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={modalAdd.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End Modal แก้ไขร้านค้า */}
    </>
  );
}

export default index;
