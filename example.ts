import { objectMapper } from "./object-mapper";
import {
  adapterFunction,
  MapperKey,
  MapperValue,
  keyMapper,
} from "./object-mapper";

const exampleObject: Object = {
  simpleKey: "value",
  badNameKey: "someValue",
  aNumber: "6",
  badkeyWithOperation: "hey!",
  length: 5,
  width: 4,
};

const exampleKeyMapper: keyMapper = new Map<MapperKey, MapperValue>([
  ["badNameKey", "goodNameKey"],
  ["aNumber", Number],
  ["badkeyWithOperation", ["upperCaseText", (text) => text.toUpperCase()]],
  [
    ["length", "width"],
    ["area", (length, width) => length * width],
  ],
]);

let newObject = objectMapper(exampleObject, exampleKeyMapper);

// Expected return (order may change)

// newObject = {
//   simpleKey: "value",
//   goodNameKey: "someValue",
//   aNumber: 6,
//   upperCaseText: "HEY!",
//   area: 20,
// };
