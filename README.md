# sih2024
# Web-Based Ocean Education Hub

This project is a web-based platform designed to enhance ocean literacy through interactive content and resources. The hub aims to educate users about ocean ecosystems, navigation, and marine life, targeting various user groups such as children, sailors, and fishermen.

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm (Node package manager)

## Installation and execution
   ```bash
  git clone https://github.com/ishan-sp/sih2024.git
   cd Frontend
   npm install
   node index.js
```
Use any browser and connect to localhost:3004. 3004 is the port number at which the server will be responding to and rendering website requirements. If the port number is in use, you can use any other number of your choice (0 to ~ 60k). Update the same in index.js headers.
This doesnt require a git commit.

## File structure
Frontend: All the frontend files (HTML, CSS, JavaScript, and media) are kept in the frontend/public directory.

Backend: Server-related files, including routes, configurations, and middleware, are located in the root directory.

## Working on the code
Create your own branch from the main branch using 
```bash
git branch branch_name
git checkout branch_name
```
Now you are in your working branch. Any changes you make here will only be reflected in your branch. 
After you have worked on your code you can see the status of your changes by using
```bash
git status
```
```
1. Changes to be Committed
These are files that have been staged and are ready to be committed. They are listed under the heading “Changes to be committed”.

2. Changes Not Staged for Commit
These are files that have been modified but not yet staged. They are listed under the heading “Changes not staged for commit”.

3. Untracked Files
These are files in your working directory that are not being tracked by Git. They are generally newly added files.

4. Unmerged Paths
These are files with conflicts that need to be resolved. They appear during a merge conflict.
```

After getting an overview of the files and their status you can run the code below for updating your work to your branch

```bash
git add .
git commit -m "A tiny description"
git push origin branch_name
```
Note: "git add ." will add all the changes made to all files. If you want to select specific files you can do the same by 
``` bash
git add file_name
```
After this point all changed have been committed to your branch. However main is still behind your branch with respect to the commits you have made. You must now create a pull request by using the github website. 
Navigate to your branch on the github website where you will encounter a "contribute" option. You may receive popups for merging to main before this. Create a pull request and wait for another member of the team to approve it. 

## Precautions
As a best practice never make any changes to the main branch. It should be thouroughly reviewed by the team before you do so.

Do NOT run 
``` bash
git push origin main
```
or 
```bash
git pull origin main
```
There is no requirements for this for our codebase. Sticking to a few commands mentioned previously is enough to get going.

For deleting your branch (you must only do so if you are sure the code on main has been updated via a pull request/your branch is redundant)
You can run the following code
```bash
git checkout main
git branch -D branch_name
```

   
   

