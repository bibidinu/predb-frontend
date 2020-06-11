import {
  Box,
  Flex,
  Grid,
  Icon,
  Link,
  PseudoBox,
  Text,
  useColorMode,
} from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { IoIosNuclear } from "react-icons/io";
import TimeAgo from "timeago-react";
import CategoryBadge from "./CategoryBadge";
import CopyButton from "./CopyButon";

const ReleaseRow = ({ release }) => {
  const [hovering, setHovering] = useState(false);
  const { colorMode } = useColorMode();

  const borderColor = { dark: "gray.700", light: "gray.300" };
  const hoverColor = { dark: "gray.700", light: "gray.300" };
  const hoverTitleColor = { dark: "teal.400", light: "teal.600" };
  const gray = { dark: "gray.400", light: "gray.500" };
  const shadow = {
    dark: "0 8px 10px 0 rgba(10, 31, 68, 0.4), 0 0 1px 0 rgba(10, 31, 68, 0.2)",
    light:
      "0 8px 10px 0 rgba(10, 31, 68, 0.1), 0 0 1px 0 rgba(10, 31, 68, 0.08)",
  };

  return (
    <PseudoBox
      // role="group"
      px={[1, 1, 1, 4]}
      py={2}
      position="relative"
      role="group"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      _before={{
        content: `''`,
        position: "absolute",
        // height: "1px",
        left: "30px",
        right: "30px",
        height: "100%",
        bottom: 0,
        borderColor: borderColor[colorMode],
        borderTopWidth: "1px",
        pointerEvents: "none",
      }}
      _hover={{
        bg: hoverColor[colorMode],
        borderRadius: "md",
        shadow: shadow[colorMode],
      }}
    >
      <Grid
        templateColumns={{
          base: "1.5fr 1fr 1fr 1.5fr",
          md: "0.5fr 0.5fr 2.5fr 0.2fr 0.2fr 0.3fr",
        }}
        templateAreas={{
          base: `"added files size cat" "namewrap namewrap namewrap namewrap" `,
          md: `"added cat namewrap action files size"`,
        }}
        gap="0 6px"
        alignItems="center"
      >
        <Box
          gridArea="added"
          color={{ base: gray[colorMode], md: "current" }}
          title={new Date(release.added).toLocaleString()}
        >
          <TimeAgo
            datetime={new Date(release.added)}
            opts={{ minInterval: 60 }}
          />
        </Box>

        <Box gridArea="cat" justifySelf={["end", "end", "center"]}>
          <CategoryBadge />
        </Box>

        <Box gridArea="namewrap">
          <PseudoBox wordBreak="break-word" my={[1, 1, 0]}>
            <NextLink
              href="/release/[rid]"
              as={`/release/${release.name}`}
              passHref
            >
              <Link _groupHover={{ color: hoverTitleColor[colorMode] }}>
                {release.name}
              </Link>
            </NextLink>
          </PseudoBox>

          <Flex justifyContent="space-between">
            <Box as="small" fontStyle="italic" color={gray[colorMode]}>
              {!release.traces ? (
                <Text>No site raced this</Text>
              ) : (
                release.traces
                  .map((tr) => `#${tr.rank}\u00A0${tr.site}`)
                  .join(", ")
              )}
            </Box>

            <Flex>
              {release.nukes && (
                <Box
                  title="Nuked: todo"
                  as={IoIosNuclear}
                  color="orange.400"
                  cursor="help"
                />
              )}

              <Flex as="small" ml={4} color={gray[colorMode]} align="center">
                Proof{" "}
                {release.proof ? (
                  <Icon ml={1} fontSize="9px" name="check" color="green.500" />
                ) : (
                  <Icon ml={1} fontSize="9px" name="close" color="red.500" />
                )}
              </Flex>
              <Flex as="small" ml={4} color={gray[colorMode]} align="center">
                NFO{" "}
                {release.has_nfo ? (
                  <Icon ml={1} name="check" color="green.500" />
                ) : (
                  <Icon ml={1} name="close" fontSize="9px" color="red.500" />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Box>

        <Box
          gridArea="action"
          d={{ base: "none", md: "block" }}
          justifySelf="center"
        >
          {hovering && <CopyButton value={release.name} />}
        </Box>

        <Box
          gridArea="files"
          justifySelf={["end", "end", "center"]}
          color={{ base: gray[colorMode], md: "current" }}
        >
          {release.files ? release.files + "F" : "-"}
        </Box>
        <Box
          gridArea="size"
          justifySelf="end"
          color={{ base: gray[colorMode], md: "current" }}
        >
          {release.size ? release.size + " MB" : "-"}
        </Box>
      </Grid>
    </PseudoBox>
  );
};

export default ReleaseRow;
