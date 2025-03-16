import { expect, test } from "vitest";
import { namesToCards } from "./namesToCards";

test("dominguez", () => {
  expect(namesToCards(dominguez).map((c) => c.mtga_id)).toEqual([
    94863, 94944, 94903, 94958, 94865, 94827, 94819, 94912, 94810, 94991, 95057,
    95039, 95006,
  ]);
});

test("stark", () => {
  expect(namesToCards(stark).map((c) => c.mtga_id)).toEqual([
    94937, 95046, 94909, 94967, 94855, 94834, 95008, 94816, 94809, 95065, 94819,
    94972, 94966, 95043,
  ]);
});

const dominguez = [
  "Skystreak Engineer",
  "Prowcatcher Specialist",
  "Ripclaw Wrangler",
  "Broken Wings",
  "Spectral Interference",
  "Ride's End",
  "Interface Ace",
  "Wreckage Wickerfolk",
  "Canyon Vaulter",
  "Boom Scholar",
  "Foul Roads",
  "Monument to Endurance",
  "Fearless Swashbuckler",
];

const stark = [
  "Kickoff Celebrations",
  "Starting Column",
  "Streaking Oilgorger",
  "Hazard of the Dunes",
  "Nimble Thopterist",
  "Swiftwing Assailant",
  "Guidelight Pathmaker",
  "Gloryheath Lynx",
  "Bulwark Ox",
  "Scoured Barrens",
  "Interface Ace",
  "Migrating Ketradon",
  "Greenbelt Guardian",
  "Rover Blades",
];
