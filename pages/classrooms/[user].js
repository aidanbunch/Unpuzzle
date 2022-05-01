import React from "react";
import axios from "axios";
import { Box, Text, Flex, VStack, Heading } from "@chakra-ui/react";
import ClassroomCard from "../../components/ClassroomCard";
import Link from "next/link";

// normal user
// {
//     "id": "5f3551369c89943f2c594629",
//     "isOpenClassroomUser": false,
//     "role": "student",
//     "email": "297896@students.cnusd.k12.ca.us",
//     "firstName": "Aidan",
//     "lastName": "Bunch",
// }

// open classroom user
// {
//     "id": "6266eeeb3ae4b442df822216",
//     "isOpenClassroomUser": true,
//     "role": "student",
//     "nickname": "aidan",
//     "classroomId": "6266ea1cc7313a42a8b2c294",
// }

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
    },
  };
}

const backgroundColors = [
  "blue.500",
  "red.500",
  "green.500",
  "orange.500",
  "purple.500",
  "teal.500",
  "brown.500",
];

export default function User({ userProfileData, classroomData, error }) {
  return (
    <Box m={100}>
      <VStack spacing={20}>
        <Heading size="2xl">
          {`Hello ${
            userProfileData.isOpenClassroomUser
              ? userProfileData.nickname
              : userProfileData.firstName
          }`}
        </Heading>

        <VStack>
          {classroomData.length > 0 &&
            classroomData.map((classroom, index) => (
              <ClassroomCard
                className={classroom.className}
                teacherName={classroom.teacherName}
                backgroundColorName={backgroundColors[index]}
                id={classroom.classId}
              />
            ))}
        </VStack>
      </VStack>
    </Box>
  );
}
