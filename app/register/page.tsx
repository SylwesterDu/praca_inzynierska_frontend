"use client";
import { Card, Text, Input, Row, Spacer, Button } from "@nextui-org/react";
import { Form, Formik } from "formik";

type RegisterValues = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Page() {
  async function register(values: RegisterValues) {}

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
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={register}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Card.Body>
                <Text h2 css={{ textAlign: "center" }}>
                  Załóż konto{" "}
                </Text>
                <Spacer y={2} />

                <Input
                  bordered
                  placeholder="Wpisz adres email"
                  aria-label="email"
                  onChange={(value) =>
                    setFieldValue("email", value.target.value)
                  }
                ></Input>
                <Spacer y={1} />

                <Input
                  bordered
                  placeholder="Wpisz nazwę użytkownika"
                  aria-label="username"
                  onChange={(value) =>
                    setFieldValue("username", value.target.value)
                  }
                ></Input>
                <Spacer y={1} />

                <Input.Password
                  bordered
                  placeholder="Wpisz hasło"
                  aria-label="password"
                  onChange={(value) =>
                    setFieldValue("password", value.target.value)
                  }
                ></Input.Password>
                <Spacer y={1} />

                <Input.Password
                  bordered
                  placeholder="Powtórz hasło"
                  aria-label="confirm password"
                  onChange={(value) =>
                    setFieldValue("confirmPassword", value.target.value)
                  }
                ></Input.Password>
                <Spacer y={2} />

                <Button>Zaloguj sie</Button>
              </Card.Body>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
