# Ultimate Discord Bot for Gamers

<div align="center">
    <a href="https://github.com/Valcore7/The-Ultimate-Discord-Bot-For-Gamers">
        <img src="https://img.shields.io/github/languages/top/Valcore7/The-Ultimate-Discord-Bot-For-Gamers.svg?style=for-the-badge">
    </a>
    <a href="https://github.com/ionadev/image-gen-api/issues">
        <img src="https://img.shields.io/github/issues/Valcore7/The-Ultimate-Discord-Bot-For-Gamers.svg?style=for-the-badge">
    </a>
    <a href="https://github.com/ionadev/image-gen-api/pulls">
        <img src="https://img.shields.io/github/issues-pr/Valcore7/The-Ultimate-Discord-Bot-For-Gamers.svg?style=for-the-badge">
    </a>
    <br>
</div>

Hello, welcome to UDBFG's repository. This is a WIP (work in progress) Discord bot that fulfils all the needs of a gamer. We present the ability to view player stats on games like Apex and Fortnite, and easy-to-use server moderation!

## About

UDBFG is written in JavaScript; utilizing the [Discord.js](https://github.com/discordjs/discord.js) library.
If you find any issues, feel free to open an issue or pull request. We will get back to you as soon as possible, thanks!

## Basics

- Create a channel called `logs` where all of the modlogs are sent.
- Create a channel called `reports` where all of the user reports are sent.
- You need to clone the `.env.example` file and rename it to `.env`; then alter the settings respectively.

## Notes

- The pipe (`|`) character means "OR".
- UDBFG will respond to either the prefix in the `.env` file, or by mentioning the bot.

## To Do

- [x] Release this github repo to the public
  - [ ] Add Fortnite commands
    - [ ] Shop command
      - [ ] Use canvas.js to generate an image of the item shop
        - [X] Generate the cosmetic images
          - [X] Create a basic cosmetic image
          - [X] Add the text to the cosmetic images
            - Like price and name
        - [ ] Use the cosmetic images to create itemshop
        - [ ] Send the itemshop image to discord
    - [ ] Item command (search for a certain skin, backbling, wrap, etc)
      - [ ] Use canvas.js (Highly Customizable)
    - [ ] News (going to be `<pfx>news <br | stw | bp | tn>`)
      - br = battle royale
      - stw = save the world
      - bp = battle pass
      - tn = tournament
    - [ ] Stats command
    -
- [x] Change the prefix command setup in [index.js](./index.js) to make it more simple and less code.
  - [x] change the prefix/command recongizer to be only one _block_ of code instead of two _blocks_ of code
  - [x] remove the ATPREFIX arg from _.env_ and change the code in [index.js](./index.js) to make ATPREFIX a constant that will automatically will set ATPREFIX to your bot's user id that way you won't have to copy and paste your bot's id into your _.env_ file.
- [ ] Update code to discord.js v12
  - [ ] Update code to discord.js-commando for discord.js V12
- [ ] Create a lfg command for fortnite (looking for group)
- [ ] Create a command that sets up a user's discord server for them (Can be a basic setup, setup for fortnite, setup for all games, etc)
  - [ ] Create the Apex commands (Need to do research)
  - [ ] Create D&D commands (Need to do research)
- [ ] Release the bot in different forms ie: One only for Fortnite or one only for Apex
- More things will be added to the TODO list
