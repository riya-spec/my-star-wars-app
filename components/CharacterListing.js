import { useState } from "react";
import { Box, Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useSWRInfinite } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const CharacterListing = () => {
  const [favorites, setFavorites] = useState([]);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `https://swapi.dev/api/people/?page=${index + 1}`,
    fetcher
  );

  const characters = data ? [].concat(...data.map((d) => d.results)) : [];

  const handleFavorite = (character) => {
    setFavorites((prevFavorites) => [...prevFavorites, character]);
    // Store favorites in localStorage
    localStorage.setItem(
      "favorites",
      JSON.stringify([...favorites, character])
    );
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Star Wars Characters
      </Heading>
      {error && <Text>Error fetching data</Text>}
      {characters.map((character) => (
        <Flex
          key={character.url}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Text>{character.name}</Text>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => handleFavorite(character)}
          >
            Favorite
          </Button>
        </Flex>
      ))}
      <Center mt={4}>
        <Button
          onClick={() => setSize(size + 1)}
          isLoading={!data && !error}
          disabled={!data || !data[size - 1].next}
        >
          Load More
        </Button>
      </Center>
    </Box>
  );
};

export default CharacterListing;
