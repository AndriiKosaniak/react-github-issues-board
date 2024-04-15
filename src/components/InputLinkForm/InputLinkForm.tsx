import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";

import { useIssuesStore } from "store";

export const InputLinkForm = () => {
  const { fetchIssues, discardError, isLoading, error } = useIssuesStore();
  const toast = useToast();

  const [inputValue, setInputValue] = useState("");
  const [errorShown, setErrorShown] = useState(false);

  const showErrorToastCallback = useCallback(
    (errorMessage: string) => {
      if (!errorShown) {
        toast({
          id: "",
          title: "Oops! An issue has occurred!",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
          onCloseComplete: () => {
            discardError();
            setErrorShown(false);
          },
        });
        setErrorShown(true);
      }
    },
    [discardError, errorShown, toast]
  );

  useEffect(() => {
    if (error) {
      showErrorToastCallback(error);
    }
  }, [error, showErrorToastCallback]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    discardError();
    setInputValue(e.target.value);
  };

  const handleSubmit = async () => {
    await fetchIssues(inputValue);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Input
          id="repositoryUrlInput"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter repo URL"
          size="lg"
          sx={{ width: "100%" }}
        />
        <Button
          id="loadIssuesButton"
          isLoading={isLoading}
          isDisabled={!inputValue}
          onClick={handleSubmit}
          colorScheme="teal"
          size="lg"
        >
          Load issues
        </Button>
      </Box>
    </Box>
  );
};
