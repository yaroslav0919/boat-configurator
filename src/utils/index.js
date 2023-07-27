import { modelParts } from "../constants";

export const findModelByID = (id) => {
    const type = id.split("-")[0];
    const modelType = modelParts[type];
    return modelType.find((model) => model.id === id);
};

export const getFirstRemoveArray = (array) => {
    const temp = array;
    temp.splice(0, 1);
    return temp;
};
