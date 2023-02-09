"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as outlinedStar } from "@fortawesome/free-regular-svg-icons";

import {
  Button,
  Col,
  Collapse,
  Container,
  Input,
  Row,
  Spacer,
  Textarea,
  User,
  Text,
  Divider,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { api } from "../axios";

import { AddComment, Comment } from "./../types/CommentTypes";

export function Comments({
  artworkId,
  setRating,
}: {
  artworkId: string;
  setRating: any;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const { userData } = useAuth();

  async function getComments() {
    const response = await api.get(`artwork/${artworkId}/comments`);
    const comments: Comment[] = response.data;
    setComments(comments);
    setExpanded(true);
    const total = comments
      .filter((comment) => comment.rating)
      .reduce((a, b) => a + b.rating!, 0);
    const count = comments.filter((comment) => comment.rating).length;
    setRating(total / count);
  }

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addComment(values: AddComment) {
    if (values.content.length == 0) {
      return;
    }
    const response = await api.post(`artwork/${artworkId}/comment`, {
      content: values.content,
      rating: values.rating,
    });
    getComments();
  }

  function printStars(rating?: number) {
    let stars: any = [];
    if (!rating) return null;
    for (let i = 0; i < rating; i++) {
      stars.push(
        <FontAwesomeIcon
          color="yellow"
          style={{ fontSize: 12 }}
          icon={filledStar}
        />
      );
    }

    return stars;
  }

  return (
    <Collapse title="Recenzje" shadow expanded={expanded}>
      {userData && (
        <>
          <Spacer y={0.5} />
          <Container>
            <Formik initialValues={{ content: "" }} onSubmit={addComment}>
              {({ setFieldValue, values }) => (
                <Form>
                  <Textarea
                    bordered
                    borderWeight="light"
                    color="secondary"
                    fullWidth
                    size="md"
                    placeholder="Dodaj recenzję"
                    value={values.content}
                    onChange={(e) => {
                      setFieldValue("content", e.currentTarget.value);
                      setComment(e.currentTarget.value);
                    }}
                  />
                  <Spacer y={0.2} />
                  <Row align="flex-end" justify="flex-end">
                    <Row>
                      <span
                        onClick={() => {
                          setRate(1);
                          setFieldValue("rating", 1);
                        }}
                      >
                        <FontAwesomeIcon
                          color="gold"
                          style={{ fontSize: 27 }}
                          icon={rate >= 1 ? filledStar : outlinedStar}
                        />
                      </span>

                      <span
                        onClick={() => {
                          setRate(2);
                          setFieldValue("rating", 2);
                        }}
                      >
                        <FontAwesomeIcon
                          color="gold"
                          style={{ fontSize: 27 }}
                          icon={rate >= 2 ? filledStar : outlinedStar}
                        />
                      </span>
                      <span
                        onClick={() => {
                          setRate(3);
                          setFieldValue("rating", 3);
                        }}
                      >
                        <FontAwesomeIcon
                          color="gold"
                          style={{ fontSize: 27 }}
                          icon={rate >= 3 ? filledStar : outlinedStar}
                        />
                      </span>
                      <span
                        onClick={() => {
                          setRate(4);
                          setFieldValue("rating", 4);
                        }}
                      >
                        <FontAwesomeIcon
                          color="gold"
                          style={{ fontSize: 27 }}
                          icon={rate >= 4 ? filledStar : outlinedStar}
                        />
                      </span>
                      <span
                        onClick={() => {
                          setRate(5);
                          setFieldValue("rating", 5);
                        }}
                      >
                        <FontAwesomeIcon
                          color="gold"
                          style={{ fontSize: 27 }}
                          icon={rate >= 5 ? filledStar : outlinedStar}
                        />
                      </span>
                    </Row>
                    <Button bordered size="sm" type="submit">
                      Dodaj
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </Container>
          <Spacer y={0.5} />
        </>
      )}
      <Col>
        {comments.map((comment, index) => (
          <Container key={index} css={{ margin: "10px 0" }}>
            <User
              name={
                <>
                  <Text h5 span>
                    {comment.creatorName}
                    {"\t"}
                    <Text span small>
                      {new Date(comment.createdAt).toLocaleDateString()}
                      {"\t"}
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </Text>{" "}
                    {"\t"}
                    {printStars(comment.rating)}
                  </Text>
                </>
              }
              key={index}
            >
              <Text color="#aaa" css={{ whiteSpace: "pre-line" }}>
                {comment.content}
              </Text>
            </User>
            <Divider height={0.1} />
          </Container>
        ))}
      </Col>
    </Collapse>
  );
}
