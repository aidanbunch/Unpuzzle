import React from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react";

export async function getServerSideProps(context) {
  const userToken = context.params.user;

  // user data api
  try {
    const response = await axios.get(
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
    const userClassrooms = response.data;
    const userClassroomsJSON = [];

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
      userClassroomsJSON.push(userClassesObj);
    });

    // finished
    console.log(JSON.stringify(userClassroomsJSON));

    return {
      props: {
        classroomData: userClassroomsJSON,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        classroomData: { error: "Not a valid EdPuzzle User Token" },
      },
    };
  }
}

export default function User({ classroomData }) {
  return (
    <div>
      {classroomData.length > 0 &&
        classroomData.map((classroom, index) => (
          <div key={index}>
            <Text>{classroom.className}</Text>
            <span>{classroom.teacherName}</span>
          </div>
        ))}
    </div>
  );
}
