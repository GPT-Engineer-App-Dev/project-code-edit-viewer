import React, { useState } from "react";
import { Box, Button, Heading, Select, Textarea, Text, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Code } from "@chakra-ui/react";

const Index = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const csvData = e.target.result;
      const lines = csvData.split("\n");
      const headers = lines[0].split(",");
      const data = lines.slice(1).map((line) => {
        const values = line.split(",");
        return headers.reduce((obj, header, i) => {
          obj[header] = values[i];
          return obj;
        }, {});
      });
      setCsvData(data);
    };

    reader.readAsText(file);
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  const getUniqueProjects = () => {
    const projects = csvData.map((row) => row["__path__"].split("/")[1]);
    return [...new Set(projects)];
  };

  const getProjectEdits = () => {
    return csvData
      .filter((row) => row["__path__"].includes(selectedProject))
      .sort((a, b) => new Date(a["__created__"]) - new Date(b["__created__"]))
      .map((edit) => {
        let tags = edit.tags;

        if (tags.startsWith('"') && tags.endsWith('"')) {
          tags = tags.slice(1, -1);
        }

        try {
          tags = JSON.parse(tags);
          return {
            ...edit,
            code_blocks: tags.output || edit.code_blocks,
          };
        } catch (err) {
          console.error(`Failed to parse tags for row with ID ${edit.id}:`, err);
          return edit;
        }
      });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        Project Data Viewer
      </Heading>

      <Box mb={4}>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </Box>

      {csvData.length > 0 && (
        <Box mb={4}>
          <Select placeholder="Select a project" value={selectedProject} onChange={handleProjectChange}>
            {getUniqueProjects().map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </Select>
        </Box>
      )}

      {selectedProject && (
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Edits for Project: {selectedProject}
          </Heading>

          <Accordion allowMultiple>
            {getProjectEdits().map((edit) => (
              <AccordionItem key={edit.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Edit ID: {edit.id}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {edit.code_blocks && (
                    <Box mb={4}>
                      <Heading as="h3" size="md" mb={2}>
                        Code Blocks
                      </Heading>
                      <Code p={2} whiteSpace="pre">
                        {edit.code_blocks}
                      </Code>
                    </Box>
                  )}
                  {edit.status !== "failed" && (
                    <Text mb={2}>
                      <strong>Commit SHA:</strong> {edit.commit_sha}
                    </Text>
                  )}
                  <Text mb={2}>
                    <strong>Created At:</strong> {edit.created_at}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      )}
    </Box>
  );
};

export default Index;
