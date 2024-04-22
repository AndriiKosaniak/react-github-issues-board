import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Input, useToast } from "@chakra-ui/react";

import { useIssuesStore } from "store";

export const InputLinkForm = () => {
  const { fetchIssues, discardError, isLoading, error, currentRepositoryUrl } =
    useIssuesStore();

  const toast = useToast();

  const [inputValue, setInputValue] = useState(currentRepositoryUrl || "");

  const showErrorToastCallback = useCallback(
    (errorMessage: string) => {
      toast({
        title: "Oops! An issue has occurred!",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => {
          discardError();
        },
      });
    },
    [discardError, toast]
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    fetchIssues(inputValue);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Input
            data-cy-id="repositoryUrlInput"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter repo URL"
            size="lg"
            sx={{ width: "100%" }}
          />
          <Button
            data-cy-id="loadIssuesButton"
            type="submit"
            isLoading={isLoading}
            isDisabled={!inputValue}
            colorScheme="teal"
            size="lg"
          >
            Load issues
          </Button>
        </Box>
      </form>
    </Box>
  );
};
