import React from "react";
import axios from "axios";
import { Box, VStack, Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import ClassroomCard from "../../components/ClassroomCard";
import Link from "next/link";
import BackButton from "../../components/BackButton";
import InstantAlertDialog from "../../components/InstantAlertDialog";
import Head from "next/head";
import { returnIndex } from "../../utils/return-index";

const backgroundColors = [

    "blue.500",
    "red.500",
    "green.500",
    "orange.500",
    "purple.500",
    "teal.500",
    "brown.500",
  ];

export async function getServerSideProps(context) {
  const userToken = context.params.user;

  // user profile JSON

  const userProfileRequest = axios.get(`https://edpuzzle.com/api/v3/users/me`, {
    headers: {
      Cookie: `G_ENABLED_IDPS=google; token=${userToken}; G_AUTHUSER_H=2`,
      "x-edpuzzle-web-version": "7.31.320.9991544718109210",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
    },
  });

  const userClassroomsRequest = axios.get(
    `https://edpuzzle.com/api/v3/classrooms/active`,
    {
      headers: {
        Cookie: `G_ENABLED_IDPS=google; token=${userToken}; G_AUTHUSER_H=2`,
        "x-edpuzzle-web-version": "7.31.320.9991544718109210",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
        // "x-edpuzzle-referrer": `https://edpuzzle.com/assignments/${assignmentId}/watch`,
      },
    }
  );

  try {
    const [profileResponse, classroomsResponse] = await Promise.all([
      userProfileRequest,
      userClassroomsRequest,
    ]);

    const userClassrooms = classroomsResponse.data;

    const profileJSON = {};
    const classroomJSON = [];

    /* create profile json */

    profileJSON["id"] = profileResponse.data._id;
    profileJSON["role"] = profileResponse.data.role;
    // indicate in frontend if token is for a teacher, tell them to enter a student

    if (profileResponse.data.role === "student") {
      if (profileResponse.data.isOpenClassroomUser) {
        profileJSON["isOpenClassroomUser"] = true;
        profileJSON["nickname"] = profileResponse.data.nickname;
        profileJSON["classroomId"] = profileResponse.data.classroomId;
      } else {
        profileJSON["isOpenClassroomUser"] = false;
        var email = "";
        if (profileResponse.data.email === "") {
          if (profileResponse.data.google.email === "") {
            email = profileResponse.data.username;
          } else {
            email = profileResponse.data.google.email;
          }
        } else {
          email = profileResponse.data.email;
        }

        profileJSON["email"] = email;
        profileJSON["firstName"] = profileResponse.data.firstName;
        profileJSON["lastName"] = profileResponse.data.lastName;
      }
    }

    /* create classroom json */

    userClassrooms.forEach((userClass) => {
      const userClassesObj = {};
      userClassesObj["className"] = userClass.name;
      userClassesObj["classId"] = userClass._id;
      var teachers = "";
      userClass.teachers.forEach((teacher) => {
        if (teachers === "") {
          teachers = teachers.concat(teacher.name);
          userClassesObj["teacherName"] = teachers;
        } else {
          teachers = teachers.concat(", " + teacher.name);
          userClassesObj["teacherName"] = teachers;
        }
      });
      classroomJSON.push(userClassesObj);
    });

    return {
      props: {
        userProfileData: profileJSON,
        classroomData: classroomJSON,
        userToken: userToken,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        userProfileData: {},
        error: {},
        classroomData: [],
        userToken: "",
      },
    };
  }
}

export default function User({
  userProfileData,
  classroomData,
  userToken,
  error,
}) {


  if (error) {
    return (
      <InstantAlertDialog
        color={"blue"}
        header={"Invalid token"}
        body={"The token you entered was invalid."}
        route={"/edpuzzle"}
      />
    );
  } else if (userProfileData.role === "teacher") {
    return (
      <InstantAlertDialog
        color={"blue"}
        header={"Teacher token"}
        body={"Please enter a student token."}
        route={"/edpuzzle"}
      />
    );
  } else {
    return (
      <>
        <Head>
          <title>Classrooms</title>
        </Head>
        <Box m={10}>
          <VStack spacing={20}>
            <Flex w="100%">
              <BackButton />
              <Spacer />

              <Heading size="2xl">
                {`Hello, ${userProfileData.isOpenClassroomUser
                    ? userProfileData.nickname
                    : userProfileData.firstName
                  }`}
              </Heading>

              <Spacer />
            </Flex>

              <VStack>
                {classroomData.length > 0 &&
                  classroomData.map((classroom, index) => (
                    <ClassroomCard
                      key={index}
                      className={classroom.className}
                      teacherName={classroom.teacherName}
                      backgroundColorName={backgroundColors[returnIndex(index + 1, backgroundColors.length)]}
                      id={classroom.classId}
                      userToken={userToken}
                    />
                  ))}
              </VStack>
          </VStack>
        </Box>
      </>
    );
  }
}
