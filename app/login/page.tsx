"use client";
import {
  Card,
  Text,
  Input,
  Row,
  Spacer,
  Button,
  Link,
} from "@nextui-org/react";
import { Form, Formik, FormikValues } from "formik";
import { useRouter } from "next/navigation";
import { useAuth } from "../../AuthContext";
import { api } from "../../axios";

type LoginValues = {
  email: string;
  password: string;
};

export default function Page() {
  const router = useRouter();

  const { user, login, logout } = useAuth();

  async function tryLogin(values: LoginValues) {
    const response = await api.post("auth/login", {
      email: values.email,
      password: values.password,
    });
    if (response.status == 200) {
      localStorage.jwt = response.data.jwt;
      router.replace("/");
      login();
    }
  }

  return (
    <div
      style={{
        width: "100%",
        minHeight: "80vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Card css={{ width: "min(90%, 600px)" }}>
        <Formik initialValues={{ email: "", password: "" }} onSubmit={tryLogin}>
          {({ setFieldValue, values }) => (
            <Form>
              <Card.Body>
                <Text h2 css={{ textAlign: "center" }}>
                  Zaloguj się{" "}
                </Text>
                <Spacer y={2} />

                <Input
                  bordered
                  placeholder="Wpisz adres email"
                  name="email"
                  onChange={(value) =>
                    setFieldValue("email", value.target.value)
                  }
                />
                <Spacer y={1} />

                <Input.Password
                  bordered
                  placeholder="Wpisz hasło"
                  name="password"
                  onChange={(value) =>
                    setFieldValue("password", value.target.value)
                  }
                />
                <Spacer y={2} />

                <Button type="submit">Zaloguj sie</Button>
              </Card.Body>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
