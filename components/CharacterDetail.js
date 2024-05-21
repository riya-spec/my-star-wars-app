import { Box, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CharacterDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `https://swapi.dev/api/people/${id}/` : null,
    fetcher
  );

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Character Detail
      </Heading>
      {error && <Text>Error fetching data</Text>}
      {data && (
        <Box>
          <Text>Name: {data.name}</Text>
          <Text>Height: {data.height}</Text>
          <Text>Gender: {data.gender}</Text>
          <Heading as="h2" mt={4} mb={2}>
            Movies
          </Heading>
          <List>
            {data.films.map((film, index) => (
              <ListItem key={index}>{film}</ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default CharacterDetail;
