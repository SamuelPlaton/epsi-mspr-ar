## EPSI MSPR AR

### Project Members
* BORDA Lorenzo
* GEORGET Julien
* GRIMAULT Romain
* PLATON Samuel

### Introduction

This in a React Native App that can scan a drawing
and render it's coloured 3D model affiliated.

### Code Style

We are using Eslint and Prettier to Code Style Check with popular rules (AirBnb).
We are using Husky for pre-commit hooks by launching Eslint.
You scan skip Husky pre-commit by adding --no-verify to your commit (Not recommended).

### Continuous Integration

Github Actions is used as a Continuous Integration solution.  
It's role is to : 
- Install dependencies
- Check for code style

### Launch the app

Install dependencies : ``yarn install``  
Lint fix : ``yarn run lint:fix``  
Run App : ``yarn run start``

