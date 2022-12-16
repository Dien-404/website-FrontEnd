function format(string) {
    const date = new Date(string);
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
}

export { format };
