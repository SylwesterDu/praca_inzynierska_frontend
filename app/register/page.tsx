"use client";
import { Card, Text, Input, Row, Spacer, Button } from "@nextui-org/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { api } from "../../axios";

type RegisterValues = {
  email: string;
  username: string;
  birthDate: Date;
  password: string;
  confirmPassword: string;
};

export default function Page() {
  const router = useRouter();

  async function register(values: RegisterValues) {
    const response = await api.post("auth/register", values);
    if (response.status == 200) {
      router.replace("login");
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
        <Formik
          initialValues={{
            email: "",
            username: "",
            birthDate: new Date(),
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

                <Input
                  type="date"
                  bordered
                  placeholder="Wprowadź datę urodzenia"
                  aria-label="birth date"
                  onChange={(value) =>
                    setFieldValue("birthDate", value.target.value)
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

                <Button type="submit">Załóż konto</Button>
              </Card.Body>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
