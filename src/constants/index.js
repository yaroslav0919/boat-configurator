export const modelParts = {
    // baseModel: { nodeName: "anytec_base_mesh" },
    coushin: [
        {
            id: "coushin-1",
            formalName: "Cushin",
            nodeName: "anytec_coushins",
        },
    ],
    engine: [
        {
            id: "engine-1",
            formalName: "Yamaha F200XB",
            nodeName: "anytec_mercury_engine",
        },
        {
            id: "engine-2",
            formalName: "Mercury 250 XLAM DS",
            nodeName: "anytec_mercury_engine",
        },
    ],
    windlass: [
        {
            id: "windlass-1",
            formalName: "windlass1",
            nodeName: "anytec_windlass",
        },
    ],
    zipwake: [
        {
            id: "zipwake-1",
            formalName: "zipwake1",
            nodeName: "anytec_zipwake",
        },
    ],
};

export const initState = {
    coordinate: {
        coushin: { x: 0, y: -0.7839846611022949, z: 2.4708449840545654 },
        engine: { x: 0, y: -1.3156129121780396, z: 3.44488525390625 },

        windlass: { x: -0.9, y: -1, z: 4 },
        zipwake: { x: 0.4, y: -1.6, z: 3.44488525390625 },
    },
    tasks: {
        "coushin-1": {
            id: "coushin-1",
            content: "Coushin1",
            type: "4",
            nodeName: "anytec_coushins",
        },
        "engine-1": {
            id: "engine-1",
            content: "Yamaha F200XB",
            type: "3",
            nodeName: "anytec_yamaha_engine",
        },
        "engine-2": {
            id: "engine-2",
            content: "Mercury 250 XLAM DS",
            type: "2",
            nodeName: "anytec_mercury_engine",
        },
        "windlass-1": {
            id: "windlass-1",
            content: "Windlass1",
            type: "1",
            nodeName: "anytec_windlass",
        },
        "zipwake-1": {
            id: "zipwake-1",
            content: "Zipwake1",
            type: "1",
            nodeName: "anytec_zipwake",
        },
    },
    columns: {
        "column-1": {
            id: "column-1",
            taskIds: ["coushin-1", "engine-1", "windlass-1", "zipwake-1"],
        },
        "column-2": {
            id: "column-2",
            taskIds: ["engine-2"],
        },
    },
    columnOrder: ["column-1", "column-2"],
};
