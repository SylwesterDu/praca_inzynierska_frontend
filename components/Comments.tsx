"use client";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

type Comment = {
  content: string;
};

export function Comments({ artworkId }: { artworkId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();

  async function getComments() {
    const response = await api.get(`artwork/${artworkId}/comments`);
    setComments(response.data);
    setExpanded(true);
  }

  useEffect(() => {
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addComment(values: Comment) {
    if (values.content.length == 0) {
      return;
    }
    const response = await api.post(`artwork/${artworkId}/comment`, {
      content: values.content,
    });
    getComments();
  }

  return (
    <Collapse title="Komentarze" shadow expanded={expanded}>
      {user && (
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
                    placeholder="Dodaj komentarz"
                    value={values.content}
                    onChange={(e) => {
                      setFieldValue("content", e.currentTarget.value);
                      setComment(e.currentTarget.value);
                    }}
                  />
                  <Spacer y={0.2} />
                  <Row align="flex-end" justify="flex-end">
                    {comment.length > 0 ? (
                      <Button bordered size="sm" type="submit">
                        Dodaj
                      </Button>
                    ) : (
                      <Spacer y={2} />
                    )}
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
                    </Text>
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
