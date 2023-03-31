function format(string) {
    const date = new Date(string);
    return (
        date.getFullYear() +
        "/" +
        (Number(date.getMonth()) + 1) +
        "/" +
        date.getDate()
    );
}

export { format };
