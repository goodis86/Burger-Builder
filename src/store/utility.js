
// this can be a utility function that helps to get rid of redundancy in our updated state and ingredients clone
// every time we work with our reducers!!!!
export const updateObject = (oldObject, updatedProps) => {
    return {
        ...oldObject,
        ...updatedProps
    };
};