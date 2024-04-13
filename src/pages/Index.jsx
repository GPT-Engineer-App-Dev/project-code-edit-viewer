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
      console.log("Parsed CSV data:", data);
      const uniqueProjects = getUniqueProjects();
      console.log("Unique projects:", uniqueProjects);
    };

    reader.readAsText(file);
  };

  const handleProjectChange = (event) => {
    console.log("Selected project before change:", selectedProject);
    setSelectedProject(event.target.value);
    console.log("Selected project after change:", event.target.value);
  };

  const getUniqueProjects = () => {
    const projects = csvData.filter((row) => row.type === "ai_update").map((row) => row["__path__"].split("/")[1]);
    return [...new Set(projects)];
  };

  const getProjectEdits = () => {
    return csvData
      .filter((row) => row["__path__"].includes(selectedProject) && row.type === "ai_update")
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
            output: tags.output,
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
            {console.log("Select options:", getUniqueProjects())}
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

          <Box>
            {getProjectEdits().map((edit) => (
              <Box key={edit.id} borderWidth={1} borderRadius="lg" p={4} mb={4}>
                <Heading as="h3" size="md" mb={2}>
                  Edit ID: {edit.id}
                </Heading>
                {edit.output ? (
                  <Box bg="gray.100" p={4} mb={4}>
                    <Code whiteSpace="pre-wrap">{edit.output}</Code>
                  </Box>
                ) : (
                  <Text mb={4}>No output available</Text>
                )}
                {edit.status !== "failed" && (
                  <Text mb={2}>
                    <strong>Commit SHA:</strong> {edit.commit_sha}
                  </Text>
                )}
                <Text mb={2}>
                  <strong>Created At:</strong> {edit.created_at}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Index;
