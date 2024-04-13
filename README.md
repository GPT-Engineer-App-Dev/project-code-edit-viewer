# project-code-edit-viewer

Implement an internal tool for viewing project data from a CSV file, with the following features:

- A form to upload a CSV file
- Parse the CSV data and store it in component state 
- Add a dropdown to select a project ID. Populate it with the unique project IDs from the CSV data
- When a project is selected, display a list of all the edits for that project, in order of creation
- For each edit, display:
  - The code blocks (if present), with syntax highlighting 
  - The commit SHA (if status is not failed)
  - The created at timestamp 
  - The edit ID
- Allow each edit's code block to be expanded/collapsed
- Use Chakra UI components for the layout and form elements

You can use this CSV data for testing:

__path__,__id__,__created__,__updated__,code_blocks,commit_sha,created_at,created_by,error_message,error_type,id,messages,num_of_edits,number,prompt,response,revert_target_edit_id,reverted,screenshot_url,status,tags,type
projects/4bf60c84-bc8f-4691-b5e1-ea66da4e0578/edits/e5f3caa3-8218-4892-a851-8d2f26818ce8,e5f3caa3-8218-4892-a851-8d2f26818ce8,2024-04-12T23:59:22.425500Z,2024-04-12T23:59:37.941774Z,null,7b56d4c08d22b72ff7abd6dd572770e23390fdc8,2024-04-12T23:59:22.402Z,GPT Engineer,null,null,e5f3caa3-8218-4892-a851-8d2f26818ce8,null,null,null,null,null,null,false,https://example.com/screenshot1.png,completed,"{""summary"":""- Created a new `ProjectData` component to handle loading and displaying project data\n- Added a form to input project ID and load data\n- Displayed edit metadata and code blocks with expand/collapse \n- Used Chakra UI components for layout and styling\n- Updated `Index` to render `ProjectData`\n- Added some sample data for testing\n\nLet me know if you have any other questions!""}",ai_update
projects/abbdbe3b-8fc2-4fe3-9e61-23457900238a/edits/1b1bbfa4-5f7b-4d11-b1af-d541a2941ee6,1b1bbfa4-5f7b-4d11-b1af-d541a2941ee6,2024-04-12T23:53:44.620090Z,2024-04-12T23:53:48.991163Z,null,8326f96808f2a9c671ae3a6eb1518423303bbc82,2024-04-12T23:53:41.000Z,null,null,null,1b1bbfa4-5f7b-4d11-b1af-d541a2941ee6,null,null,null,Landing page for a SaaS business,null,null,false,https://example.com/screenshot2.png,completed,null,initial

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with REPLACE_WITH_TECH_STACK_SUMMARY.

REPLACE_WITH_TECH_STACK_POINTS

## Setup

```sh
git clone https://github.com/GPT-Engineer-App-Dev/project-code-edit-viewer.git
cd project-code-edit-viewer
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
