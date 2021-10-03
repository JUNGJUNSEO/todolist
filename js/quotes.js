const quotes = [
    {
      quote: "배우나 생각하지 않으면 공허하고, 생각하나 배우지 않으면 위험하다.",
      author: "공자",
    },
    {
      quote: "명확히 설정된 목표가 없으면, 우리는 사소한 일상을 충실히 살다 결국 그 일상의 노예가 되고 만다.",
      author: "로버트 하인라인",
    },
    {
      quote: "Only a life lived for others is a life worthwhile.",
      author: "Albert Einstein",
    },

    {
      quote: "Never go on trips with anyone you don't love.",
      author: "Hemmingway",
    },

    {
      quote: "Travel expands the mind and fills the gap.",
      author: "Sheda Savage",
    },
  ];
const quote = document.querySelector(".header__quote span:first-child");
const author = document.querySelector(".header__quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;