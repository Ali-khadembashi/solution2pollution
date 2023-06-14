export default function validateInput(str: string) {

    const regex = /^([1-9]\d*)(,[1-9]\d*)*$/;
    return regex.test(str);
}