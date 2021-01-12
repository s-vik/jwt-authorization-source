export const required = (value) => {
    if(value) return undefined;
    return "this field is required";
}