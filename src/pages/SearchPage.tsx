import {
  Box,
  Grid,
  Image,
  LoadingOverlay,
  MultiSelect,
  Stack,
  Tooltip,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import Species from "../types/Species";
import { Link } from "react-router-dom";

interface Filter {
  name: string;
  filter: Species;
  conflictsWith?: string[];
}

const availableFilters: Filter[] = [
  {
    name: "Shoulders",
    filter: { shoulderMountable: true },
  },
];

const genCount = 9;
new Array(genCount).fill(0).forEach((_, i) => {
  availableFilters.push({
    name: `Gen ${i + 1}`,
    filter: { labels: [`gen${i + 1}`] },
    conflictsWith: new Array(genCount - 1)
      .fill(0)
      .map((_, j) => `Gen ${j + (j >= i ? 2 : 1)}`),
  });
});

export default function SearchPage() {
  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResults] = useState<Species[] | null>(null);

  const activeFilter = useMemo<Species>(
    () =>
      availableFilters
        .filter(({ name }) => filters.includes(name))
        .reduce<Species>(
          (acc, { filter }) => ({
            ...acc,
            ...filter,
          }),
          {}
        ),
    [filters]
  );

  const availableFiltersData = useMemo(
    () =>
      availableFilters.map(({ name }) => ({
        value: name,
        label: name,
        disabled: availableFilters.some(
          ({ name: cName, conflictsWith }) =>
            filters.includes(cName) && conflictsWith?.includes(name)
        ),
      })),
    [filters]
  );

  useEffect(() => {
    let stillRunning = true;
    async function fetchResults() {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API}/api/v1/species/`,
        {
          method: "POST",
          body: JSON.stringify({ filter: activeFilter }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (stillRunning) {
        setResults(
          json.sort(
            (
              { nationalPokedexNumber: a }: Species,
              { nationalPokedexNumber: b }: Species
            ) => (a || 0) - (b || 0)
          )
        );
        setLoading(false);
      }
    }
    fetchResults();
    return () => {
      stillRunning = false;
    };
  }, [activeFilter, filters.length]);

  return (
    <>
      <LoadingOverlay visible={loading} loaderProps={{ type: "oval" }} />
      <Stack align="center" p="md">
        <MultiSelect
          label="Looking for something, friend?"
          placeholder="Let's find you what you need..."
          data={availableFiltersData}
          size="xl"
          w="500px"
          onChange={setFilters}
          value={filters}
          disabled={loading}
        />
        <Box w="100%">
          <Grid>
            {result?.map(({ name, nationalPokedexNumber, sname }) => (
              <Grid.Col span={{ base: 6, xs: 4, s: 3, md: 2, xl: 1 }}>
                <Tooltip label={name} position="bottom">
                  <Box component={Link} to={`/pokemon/${sname}`}>
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nationalPokedexNumber}.png`}
                      height={160}
                      alt={name}
                    />
                  </Box>
                </Tooltip>
              </Grid.Col>
            ))}
          </Grid>
        </Box>
      </Stack>
    </>
  );
}
