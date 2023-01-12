"use client";
import {
  Badge,
  Card,
  Col,
  Container,
  Grid,
  Progress,
  Row,
  Spacer,
  Text,
  Tooltip,
} from "@nextui-org/react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function Stats() {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const percentage = [
    { name: "Muzyka", value: 10 },
    { name: "Literatura", value: 3 },
    { name: "Fotografia", value: 1 },
    { name: "Inne", value: 4 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <Container>
      <Text h2> Statystyki</Text>
      <Grid.Container gap={2}>
        <Grid xs={12} md={5}>
          <Card>
            <Card.Header>
              <Text h3> Procentowy udział twoich dzieł</Text>
            </Card.Header>
            <Card.Body>
              <Row align="center">
                <ResponsiveContainer width={230} height={200}>
                  <PieChart>
                    <Pie
                      data={percentage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {percentage.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Col>
                  <Grid.Container gap={0.5}>
                    <Grid xs={12} alignItems="center">
                      <Badge
                        variant="dot"
                        css={{ backgroundColor: COLORS[0] }}
                      />
                      <Text css={{ ml: "$2" }}>
                        Muzyka ({percentage[0].value})
                      </Text>
                    </Grid>
                    <Grid xs={12} alignItems="center">
                      <Badge
                        color="primary"
                        variant="dot"
                        css={{ backgroundColor: COLORS[1] }}
                      />
                      <Text css={{ ml: "$2" }}>
                        Literatura ({percentage[1].value})
                      </Text>
                    </Grid>
                    <Grid xs={12} alignItems="center">
                      <Badge
                        color="secondary"
                        variant="dot"
                        css={{ backgroundColor: COLORS[2] }}
                      />
                      <Text css={{ ml: "$2" }}>
                        Fotografia ({percentage[2].value})
                      </Text>
                    </Grid>
                    <Grid xs={12} alignItems="center">
                      <Badge
                        color="success"
                        variant="dot"
                        css={{ backgroundColor: COLORS[3] }}
                      />
                      <Text css={{ ml: "$2" }}>
                        Inne ({percentage[3].value})
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={7}>
          <Card>
            <Card.Header>
              <Text h3>Oceny Twoich dzieł</Text>
            </Card.Header>
            <Card.Body>
              <Container>
                <Progress value={70} shadow color="success" status="error" />
                <Spacer y={2} />
                <Text size="$xl">
                  Twoje dzieła podobają się{" "}
                  <Text
                    span
                    weight="bold"
                    size="$2xl"
                    css={{
                      textGradient: "45deg, $blue600 -20%, $pink600 80%",
                    }}
                  >
                    70%
                  </Text>{" "}
                  widzów.
                </Text>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={6}>
          <Card>
            <Card.Header>
              <Text h3>Ilość wyświetleń</Text>
            </Card.Header>
          </Card>
        </Grid>
        <Grid xs={6}>
          <Card>
            <Card.Header>
              <Text h3> Procentowy udział twoich dzieł</Text>
            </Card.Header>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}
