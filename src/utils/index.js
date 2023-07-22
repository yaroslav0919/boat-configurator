import { modelParts } from "../constants";

export const findModelByID = (id) => {
    // modelParts[type].forEach((modelpart, index) => {
    //     console.log(modelpart);
    // });
    const type = id.split("-")[0];
    const modelType = modelParts[type];
    return modelType.find((model) => model.id === id);
};
