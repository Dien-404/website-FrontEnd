const reader = new FileReader();

// react 读取文件内容
const fileReader = (e) => {
    const file = e.target.files[0];
    let temp = [];
    reader.readAsText(file);
    reader.onload = () => {
        reader.result.split("\n").forEach((line) => {
            if (line !== "") {
                temp.push(line);
            }
        });
    };
    return temp;
};

export { fileReader };
