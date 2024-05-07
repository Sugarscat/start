const isValidUrl = (url: string): number => {
  // 使用正则表达式匹配网址的模式
  const noHttpUrlRegex: string = "^([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,6}$";
  const hasHttpRegex: string = "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]";
  const re1 = new RegExp(noHttpUrlRegex);
  const re2 = new RegExp(hasHttpRegex);
  // 返回正则表达式匹配成功的结果
  if (re1.test(url))
    return 1;
  else if (re2.test(url))
    return 2;
  else
    return 0;
}

const algoliaSearch = (text: string) => {
  
}

export {
  isValidUrl
}