import unordered_set from './data_structures/unordered_set'
export const languageOptions = [
    { label: "Bash", id: "bash" },
    { label: "C", id: "c" },
    { label: "C++", id: "c++" },
    { label: "C++14", id: "c++14" },
    { label: "C++17", id: "c++17" },
    { label: "Java", id: "java" },
    { label: "Python 2", id: "py2" },
    { label: "Python 3", id: "py3" },
    { label: "Javascript", id: "nodejs" },
    { label: "Go", id: "go" },
];
export const languageSet = new unordered_set([
    "C++",
    "C",
    "Java",
    "C++17",
    "C++14",
    "Go",
    "Bash",
    "Python 2",
    "Python 3",
    "Javascript"
]);
export default { languageOptions, languageSet };