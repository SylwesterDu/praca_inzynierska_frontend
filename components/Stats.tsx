"use client";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { api } from "../axios";
import { UserStats } from "../types/UserTypes";

export function Stats() {
  const [stats, setStats] = useState<UserStats>({
    artworksCommentsCount: [
      { artType: 0, count: 0 },
      { artType: 1, count: 0 },
      { artType: 2, count: 0 },
      { artType: 3, count: 0 },
    ],
    artworksViewsCount: [
      { artType: 0, count: 0 },
      { artType: 1, count: 0 },
      { artType: 2, count: 0 },
      { artType: 3, count: 0 },
    ],
    artworksCount: [
      { artType: 0, count: 0 },
      { artType: 1, count: 0 },
      { artType: 2, count: 0 },
      { artType: 3, count: 0 },
    ],
    votes: { upvotes: 0, downvotes: 0 },
  });

  function artTypeToName(artType: number) {
    if (artType == 0) {
      return "Muzyka";
    }
    if (artType == 1) {
      return "Literatura";
    }
    if (artType == 2) {
      return "Fotografia";
    }
    return "Inne";
  }

  const ratio = useMemo(() => {
    const ratio =
      stats.votes.upvotes / (stats.votes.upvotes + stats.votes.downvotes);
    if (isNaN(ratio) || ratio == Infinity) {
      return 0;
    }
    return ratio * 100;
  }, [stats.votes]);

  // const ratio = 30;

  async function getUserStats() {
    const response = await api.get("user/stats");

    setStats(response.data);
  }

  useEffect(() => {
    getUserStats();
  }, []);

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
                <ResponsiveContainer width={230} height={180}>
                  <PieChart>
                    <Pie
                      data={stats.artworksCount}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.artworksCount.map((entry, index) => (
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
                    {stats.artworksCount.map((count, index) => (
                      <Grid key={index} xs={12} alignItems="center">
                        <Badge
                          variant="dot"
                          css={{ backgroundColor: COLORS[index] }}
                        />
                        <Text css={{ ml: "$2" }}>
                          {artTypeToName(count.artType)} (
                          {stats.artworksCount[index].count})
                        </Text>
                      </Grid>
                    ))}
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
                <Row align="center">
                  <FontAwesomeIcon
                    color="green"
                    style={{ fontSize: 27 }}
                    icon={faThumbsUp}
                  />
                  <Spacer x={1} />
                  <Progress
                    value={ratio}
                    shadow
                    color="success"
                    status="error"
                  />
                  <Spacer x={1} />

                  <FontAwesomeIcon
                    color="red"
                    style={{ fontSize: 27 }}
                    icon={faThumbsDown}
                  />
                </Row>

                <Spacer y={1} />
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
                    {ratio}%
                  </Text>{" "}
                  widzów.
                </Text>

                <Text size="$xl">
                  Otrzymaleś{" "}
                  <Text
                    span
                    size="$2xl"
                    weight="bold"
                    css={{
                      textGradient: "45deg, $blue600 -20%, $pink600 80%",
                    }}
                  >
                    {stats.votes.upvotes}
                  </Text>{" "}
                  <Text span color="success">
                    pozytywnych
                  </Text>{" "}
                  recenzji,
                </Text>
                <Text size="$xl">
                  oraz{" "}
                  <Text
                    span
                    size="$2xl"
                    weight="bold"
                    css={{
                      textGradient: "45deg, $blue600 -20%, $pink600 80%",
                    }}
                  >
                    {stats.votes.downvotes}
                  </Text>{" "}
                  <Text span color="error">
                    negatywnych.
                  </Text>{" "}
                </Text>
              </Container>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <Card.Header>
              <Text h3>Ilość wyświetleń</Text>
            </Card.Header>
            <Card.Body>
              <Row align="center">
                <ResponsiveContainer width={230} height={180}>
                  <PieChart>
                    <Pie
                      data={stats.artworksViewsCount}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.artworksViewsCount.map((entry, index) => (
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
                    {stats.artworksViewsCount.map((count, index) => (
                      <Grid key={index} xs={12} alignItems="center">
                        <Badge
                          variant="dot"
                          css={{ backgroundColor: COLORS[index] }}
                        />
                        <Text css={{ ml: "$2" }}>
                          {artTypeToName(count.artType)} (
                          {stats.artworksViewsCount[index].count})
                        </Text>
                      </Grid>
                    ))}
                  </Grid.Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} md={6}>
          <Card>
            <Card.Header>
              <Text h3> Procentowy udział komentarzy</Text>
            </Card.Header>
            <Card.Body>
              <Row align="center">
                <ResponsiveContainer width={230} height={180}>
                  <PieChart>
                    <Pie
                      data={stats.artworksCommentsCount}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {stats.artworksCommentsCount.map((entry, index) => (
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
                    {stats.artworksCommentsCount.map((count, index) => (
                      <Grid key={index} xs={12} alignItems="center">
                        <Badge
                          variant="dot"
                          css={{ backgroundColor: COLORS[index] }}
                        />
                        <Text css={{ ml: "$2" }}>
                          {artTypeToName(count.artType)} (
                          {stats.artworksCommentsCount[index].count})
                        </Text>
                      </Grid>
                    ))}
                  </Grid.Container>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Container>
  );
}
