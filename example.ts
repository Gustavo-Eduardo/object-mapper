import { objectMapper } from "./object-mapper";

const exampleObject: Object = {
  simpleKey: "value",
  badNameKey: "someValue",
  aNumber: "6",
  badkeyWithOperation: "hey!",
  length: 5,
  width: 4,
};

const exampleKeyMapper = [
  {
    input: "badNameKey",
    output: "goodNameKey",
  },
  {
    input: "aNumber",
    output: "aNumber",
    adapter: Number,
  },
  {
    input: "badkeyWithOperation",
    output: "upperCaseText",
    adapter: (text) => text.toUpperCase(),
  },
  {
    input: ["length", "width"],
    output: "area",
    adapter: (length, width) => length * width,
  },
  
];

let newObject = objectMapper(exampleObject, exampleKeyMapper);

// Expected return (order may change)

// newObject = {
//   simpleKey: "value",
//   goodNameKey: "someValue",
//   aNumber: 6,
//   upperCaseText: "HEY!",
//   area: 20,
// };
