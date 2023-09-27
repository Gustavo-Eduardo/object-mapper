

type Mapper = {
    input: string | string[],
    output: string,
    adapter?: Function,
}[]

function objectMapper(inputObject: Object, mapper: Mapper): Object {
    const adaptedObject = {}
    for (let adapt of mapper) {
        if (typeof adapt.input === "string") {
            const inputValue = inputObject[adapt.input]
            const outputValue = adapt.adapter ? adapt.adapter(inputValue) : inputValue
            adaptedObject[adapt.output] = outputValue
        } else if (Array.isArray(adapt.input)) {
            if (!adapt.adapter) continue
            const inputValues = adapt.input.map(inputKey => inputObject[inputKey])
            const outputValue = adapt.adapter(...inputValues)
            adaptedObject[adapt.output] = outputValue
        }
    }
    return adaptedObject
}

