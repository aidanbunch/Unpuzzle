import React from "react";
import axios from "axios";
import { Box, Heading, VStack, HStack, Flex, Spacer } from "@chakra-ui/react";
import AssignmentCard from "../../components/AssignmentCard";
import BackButton from "../../components/BackButton";

export async function getServerSideProps(context) {
  const classroomID = getDataFromSlug(context.params.classroom, "classroomID");
  const userToken = getDataFromSlug(context.params.classroom, "userToken");
  const className = getDataFromSlug(context.params.classroom, "className");
  const color = getDataFromSlug(context.params.classroom, "color");

  try {
    const response = await axios.get(
      `https://edpuzzle.com/api/v3/assignments/classrooms/${classroomID}/students?needle=`,
      {
        headers: {
          Cookie: `G_ENABLED_IDPS=google; token=${userToken}; G_AUTHUSER_H=2`,
          "x-edpuzzle-web-version": "7.31.320.9991544718109210",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15",
          "x-edpuzzle-referrer": `https://edpuzzle.com/classes`,
        },
      }
    );
    const titles = response.data.medias;
    const assignments = response.data.teacherAssignments;
    const assignmentsJSON = [];

    assignments.forEach((assignment) => {
      const assignmentsObj = {};
      assignmentsObj["assignmentTeacherId"] = assignment.contentId;
      assignmentsObj["assignmentId"] = assignment._id;
      titles.forEach((title) => {
        if (assignment.contentId === title._id) {
          assignmentsObj["assignmentTitle"] = title.title;
        }
      });
      assignmentsJSON.push(assignmentsObj);
    });

    // return assignmentsJSON;
    return {
      props: {
        assignmentsData: assignmentsJSON,
        className: className,
        color: color,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        assignmentsData: [],
        className: className,
        color: color,
      },
    };
  }
}

const getDataFromSlug = (param, portionReturned) => {
  const userTokenParam = param.trim();
  const splitParam = userTokenParam.split("---");

  if (portionReturned === "userToken") {
    return splitParam[0];
  } else if (portionReturned === "className") {
    return splitParam[1];
  } else if (portionReturned === "classroomID") {
    return splitParam[3];
  } else if (portionReturned === "color") {
    return splitParam[2];
  }
};

// const getUserTokenAndClassroomID = (param) => {
//   const cityParam = param.trim();
//   const splitCity = cityParam.split("---");
//   const classroomID = splitCity[splitCity.length - 1];
//   const userToken = splitCity[0];
//   return {
//     classroomID: classroomID,
//     userToken: userToken,
//   };
// };

export default function Classroom({ assignmentsData, className, color }) {
  console.log(assignmentsData);
  return (
    <Box m={100}>
      <VStack spacing={20}>
        <Flex w="100%">
          <BackButton />
          <Spacer />

          <HStack align mx={10}>
            <Heading color={`${color}`} size="xl">
              {className}
            </Heading>
            <Heading size="xl"> assignments</Heading>
          </HStack>

          <Spacer />
        </Flex>

        {/* <AssignmentCard assignmentTitle={assignment} color={color} /> */}

        <VStack spacing={20}>
          {assignmentsData.length > 0 &&
            assignmentsData.map((assignment, index) => (
              <AssignmentCard
                key={index}
                color={color}
                assignmentTitle={assignment.assignmentTitle}
              />
            ))}
        </VStack>
      </VStack>
    </Box>
  );
}
