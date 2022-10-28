#! /usr/bin/env node
const states = require("../util/states");
const district = require("../util/districts");
const slot = require("../util/slots");
const program = require("commander");

program
  .command("states")
  .description("list down all the states")
  .action(states);
program
  .command("district<stateid>")
  .description("get all districts for state using state id")
  .action(district);
program
  .command("slot <districtid>")
  .description("get all slots for district id")
  .action(slot);

program.parse();
