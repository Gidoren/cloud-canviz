export const ADD_ARTS = "ADD_ARTS"

export const addArts = (arts) => {
    console.log(arts)
    return {
        type: ADD_ARTS,
        arts: arts
    }
}