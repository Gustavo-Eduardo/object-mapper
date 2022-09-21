declare type adapterFunction = (...args: any[]) => any;
declare type MapperKey = string | string[];
declare type MapperValue = string | [string, adapterFunction] | adapterFunction;
declare type keyMapper = Map<MapperKey, MapperValue>;

export {adapterFunction, MapperKey, MapperValue, keyMapper}

function objectMapper(object: Object, keyMap: keyMapper): Object {
  const adaptedObject: Object = {};
  keyMap.forEach((value: MapperValue, key: MapperKey) => {
    if (typeof key === "string") {
      if (typeof value === "string") {
        const newKey: string = value;
        adaptedObject[newKey] = object[key];
      } else if (Array.isArray(value)) {
        const objectValue: any = object[key];
        const [newKey, adapterFunction]: [string, adapterFunction] = value;
        adaptedObject[newKey] = adapterFunction(objectValue);
      } else if (typeof value === "function") {
        const objectValue: any = object[key];
        const adapterFunction: adapterFunction = value;
        adaptedObject[key] = adapterFunction(objectValue);
      }
    } else if (Array.isArray(key)) {
      if (Array.isArray(value)) {
        const adapterFunctionArgs: any[] = key.map(
          (key: string): any => object[key]
        );
        const [newKey, adapterFunction]: [string, adapterFunction] = value;
        adaptedObject[newKey] = adapterFunction(...adapterFunctionArgs);
      }
    }
  });
  return Object.assign(adaptedObject, object);
}

export { objectMapper };
