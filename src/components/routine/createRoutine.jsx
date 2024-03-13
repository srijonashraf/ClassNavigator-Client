import React, { useEffect, useState } from "react";
import ContentStore from "../../stores/ContentStore";
import { Form, Input, Button, Select, Row, Col, TimePicker } from "antd";
import { useParams } from "react-router-dom";
import { SaveRoutineByClassId } from "../../api/apiRequest";
import { errorToast, successToast } from "../../helper/ToasterHelper";

const { Option } = Select;

const CreateRoutine = () => {
  const { FetchRoutineByClassId, FetchRoutineByClassIdRequest } =
    ContentStore();
  const { classId } = useParams();

  const days = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
  ];

  const [formValues, setFormValues] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchRoutine = async () => {
      if (selectedDay !== null) {
        try {
          const routineForSelectedDay = FetchRoutineByClassId.routine.find(
            (routine) => routine.day === selectedDay
          );
          if (routineForSelectedDay) {
            setFormValues(routineForSelectedDay.classes);
          } else {
            setFormValues([
              {
                courseName: "",
                courseCode: "",
                teacher: "",
                room: "",
                time: "",
              },
            ]);
          }
        } catch (err) {
          console.error("Error fetching routine:", err);
          errorToast("Failed to fetch routine.");
        }
      } else {
        setFormValues([
          {
            courseName: "",
            courseCode: "",
            teacher: "",
            room: "",
            time: "",
          },
        ]);
      }
    };

    fetchRoutine();
  }, [classId, selectedDay]);

  const handleClassChange = (classIndex, field, value) => {
    const updatedFormValues = [...formValues];
    updatedFormValues[classIndex] = {
      ...updatedFormValues[classIndex],
      [field]: value,
    };
    setFormValues(updatedFormValues);
  };
  
  

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!selectedDay) {
      errorToast("Please select a day.");
      return;
    }

    if (
      !formValues.some(
        (cls) =>
          cls.courseName ||
          cls.courseCode ||
          cls.teacher ||
          cls.room ||
          cls.time
      )
    ) {
      errorToast("Please add at least one class.");
      return;
    }

    try {
      const response = await SaveRoutineByClassId(
        classId,
        formValues,
        selectedDay
      );
      if (!response) {
        errorToast("Failed to Update Routine.");
        return;
      }
      successToast("Routine Updated!");
      await FetchRoutineByClassIdRequest(classId);
    } catch (err) {
      errorToast("Something went wrong.");
    }
  };

  const addCourse = () => {
    setFormValues([
      ...formValues,
      {
        courseName: "",
        courseCode: "",
        teacher: "",
        room: "",
        time: "",
      },
    ]);
  };

  return (
    <div className="container mt-5">
      <Form layout="vertical">
        <Form.Item label="Select Day">
          <Select
            value={selectedDay}
            onChange={(value) => setSelectedDay(value)}
          >
            {days.map((day) => (
              <Option key={day} value={day}>
                {day}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {formValues.map((cls, classIndex) => (
          <div key={classIndex}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Course Name">
                  <Input
                    value={cls.courseName || ""}
                    onChange={(e) =>
                      handleClassChange(
                        classIndex,
                        "courseName",
                        e.target.value
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Course Code">
                  <Input
                    value={cls.courseCode || ""}
                    onChange={(e) =>
                      handleClassChange(
                        classIndex,
                        "courseCode",
                        e.target.value
                      )
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Faculty Name">
                  <Input
                    value={cls.teacher || ""}
                    onChange={(e) =>
                      handleClassChange(classIndex, "teacher", e.target.value)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Room">
                  <Input
                    value={cls.room || ""}
                    onChange={(e) =>
                      handleClassChange(classIndex, "room", e.target.value)
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Time">
                  <TimePicker.RangePicker
                    use12Hours
                    format="h:mm A"
                    onChange={(value) =>
                      handleClassChange(classIndex, "time", value)
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
        ))}
        <Form.Item>
          <Button onClick={addCourse} type="dashed" block>
            + Add Course
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleFormSubmission} block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRoutine;
